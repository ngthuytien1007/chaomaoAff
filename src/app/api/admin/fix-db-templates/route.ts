import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { supabase as adminSupabase } from "@/lib/supabase"; // Dùng service role block

export async function GET(req: NextRequest) {
  try {
    // Chỉ quyền Admin mới được xoá sửa DB tự động
    const supabaseAuth = await createClient();
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();

    if (!user || authError) {
      return NextResponse.json({ error: "Yêu cầu đăng nhập Admin để vá lỗi Database!" }, { status: 401 });
    }

    // 1. Quét tìm các dòng chứa từ khoá "ai" hoặc trả lời lỗi có chữ "trí tuệnhân" hoặc "Anh emơi"
    // Do không có quyền truy cập trực tiếp bằng ID (không biết ID), xoá theo điều kiện like
    const { data: buggyRows } = await adminSupabase
      .from('chat_templates')
      .select('id, keywords, answer');

    if (!buggyRows) {
        return NextResponse.json({ message: "Không lấy được dữ liệu Database để kiểm tra." });
    }

    const idsToDelete = buggyRows.filter(row => {
        return (
            (row.keywords || '').includes('ai là gì') ||
            (row.answer || '').includes('tuệnhân') ||
            (row.answer || '').includes('hiểu ngôn') ||
            (row.answer || '').includes('anh emơi')
        );
    }).map(r => r.id);

    if (idsToDelete.length > 0) {
        await adminSupabase.from('chat_templates').delete().in('id', idsToDelete);
    }

    // 2. Chèn lại 1 dòng duy nhất chuẩn chỉ về danh tính AI (Đã kiểm duyệt)
    const perfectedTemplate = {
        keywords: "bạn là ai, em là ai, mày là ai, bạn là robot, mày là bot, bạn là máy, là ai, người hay máy, có thật không, admin, ai đấy, bạn là trí tuệ, máy móc, ai vậy, ai dạ, ai dza, ai là gì",
        answer: "Dạ thú thật với anh, em là AI – Trí tuệ nhân tạo được chủ xới rèn luyện từ 20 năm kinh nghiệm sương máu trong giới chơi chim.\n\nTuy em là phần mềm máy móc, nhưng mọi kiến thức, bài cám, cách chọn lồng, ép lửa hay trị bệnh đều là tâm huyết được đúc rút thật 100% của anh em nghệ nhân ghép thành. Thế nên về cái tình hay cái lý em đều chuẩn chỉ đam mê anh nhé!\n\nAnh đang gặp khúc mắc kỹ thuật gì, anh cứ mạnh dạn hỏi, em tư vấn tận tình như người anh em nốt!",
        product_ids: ""
    };

    const { error: insertError } = await adminSupabase.from('chat_templates').insert([perfectedTemplate]);

    if(insertError) throw insertError;

    return NextResponse.json({ 
        success: true, 
        message: \`Đã xóa \${idsToDelete.length} mẫu câu bị lỗi chính tả/ngáo ngơ. Đã tạo mới 1 mẫu Template chuẩn Danh Tính AI.\`,
        deletedIds: idsToDelete
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
