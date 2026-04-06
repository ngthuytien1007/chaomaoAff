import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Use generic client for insert ops
import { createClient } from "@/utils/supabase/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    // 1. Kiểm tra rào chắn bảo mật bằng Xác Thực Thực Thụ (Supabase Auth)
    const supabaseAuth = await createClient()
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser()

    if (!user || authError) {
      return NextResponse.json({ error: "Chưa đăng nhập! Anh không có quyền truy cập." }, { status: 401 });
    }

    const formData = await req.formData();

    // 2. Trích xuất dữ liệu cơ bản
    const id = formData.get("id") as string || `p_${Date.now()}`;
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const originalPrice = formData.get("originalPrice") as string;
    const rating = parseFloat(formData.get("rating") as string || "5.0");
    const affiliateUrl = formData.get("affiliateUrl") as string;
    
    // Xử lý chuỗi JSON array do Frontend gửi lên
    const tags = JSON.parse((formData.get("tags") as string) || "[]");
    const category = JSON.parse((formData.get("category") as string) || "[]");
    
    const file = formData.get("image") as File;

    if (!name || !price || !file) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc (Tên, Giá, Ảnh)" }, { status: 400 });
    }

    // 3. Xử lý lưu ảnh lên Supabase Storage
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${id}_${crypto.randomBytes(4).toString('hex')}.${fileExt}`;
    
    const buffer = Buffer.from(await file.arrayBuffer());
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError || !uploadData) {
      const msg = uploadError?.message || 'uploadData rỗng';
      console.error("Lỗi đăng ảnh:", msg);
      return NextResponse.json({ error: "Đăng ảnh bị lỗi: " + msg }, { status: 500 });
    }

    // Lấy link ảnh vĩnh viễn (Public URL)
    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    // 4. Lưu thông tin vào Database, bao gồm user_id
    const { data: inserted, error: dbError } = await supabase.from('products').insert([{
      id: id,
      name: name,
      price: price,
      original_price: originalPrice || null,
      rating: rating,
      image: imageUrl,
      affiliate_url: affiliateUrl,
      tags: tags,
      category: category,
      is_active: true,
      user_id: user.id,
    }]).select(); // select returns inserted row(s)

    if (dbError) {
      console.error("Lỗi lưu Database:", dbError);
      // Trả chi tiết lỗi về client để debug
      return NextResponse.json({
        error: "Lưu dữ liệu database thất bại",
        detail: dbError.message,
        hint: dbError.hint || null,
        code: dbError.code || null,
      }, { status: 500 });
    }

    // inserted will be an array with the new product record
    const newProduct = (inserted as any)[0];

    return NextResponse.json({ success: true, product: newProduct });

  } catch (error: any) {
    console.error("Lỗi Server Admin API:", error);
    return NextResponse.json({ error: "Sập hệ thống API: " + error.message }, { status: 500 });
  }
}

// GET: Lấy danh sách sản phẩm của admin hiện tại
export async function GET(req: NextRequest) {
  try {
    const supabaseAuth = await createClient();
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();

    if (!user || authError) {
      return NextResponse.json({ error: "Chưa đăng nhập!" }, { status: 401 });
    }

    const { data: products, error: dbError } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (dbError) {
      console.error("Lỗi lấy sản phẩm admin:", dbError);
      return NextResponse.json({ error: "Không thể lấy danh sách sản phẩm" }, { status: 500 });
    }

    return NextResponse.json({ products });
  } catch (error: any) {
    console.error("GET admin products error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
