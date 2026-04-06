import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

// Lấy mã Passcode từ biến môi trường, hoặc dùng mặc định
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "ThongNguyen999";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const passcode = formData.get("passcode") as string;

    // 1. Kiểm tra rào chắn bảo mật
    if (passcode !== ADMIN_PASSCODE) {
      return NextResponse.json({ error: "Thưa anh, sai mã bí mật rồi ạ!" }, { status: 401 });
    }

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

    if (uploadError) {
      console.error("Lỗi đăng ảnh:", uploadError);
      return NextResponse.json({ error: "Đăng ảnh bị lỗi: " + uploadError.message }, { status: 500 });
    }

    // Lấy link ảnh vĩnh viễn (Public URL)
    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    // 4. Lưu thông tin vào Database
    const { error: dbError } = await supabase.from('products').insert([{
      id: id,
      name: name,
      price: price,
      original_price: originalPrice || null,
      rating: rating,
      image_url: imageUrl,
      affiliate_url: affiliateUrl,
      tags: tags,
      category: category,
      is_active: true
    }]);

    if (dbError) {
      console.error("Lỗi lưu Database:", dbError);
      return NextResponse.json({ error: "Lưu dữ liệu database thất bại" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Đăng sản phẩm thành công!", imageUrl });

  } catch (error: any) {
    console.error("Lỗi Server Admin API:", error);
    return NextResponse.json({ error: "Sập hệ thống API: " + error.message }, { status: 500 });
  }
}
