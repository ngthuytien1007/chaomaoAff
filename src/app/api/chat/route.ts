// src/app/api/chat/route.ts
import { NextResponse } from "next/server";
import { SYSTEM_PROMPT, getRelatedProducts } from "@/lib/constants";
import fs from "fs";
import path from "path";

const MODEL = "google/gemini-2.5-flash";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const lastUserMessage = (messages[messages.length - 1]?.content as string) || "";

    // 1. Lấy thông tin người dùng (IP, User-Agent)
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "Không xác định";
    const userAgent = req.headers.get("user-agent") || "Không xác định";
    
    // 2. Trích xuất số điện thoại từ câu hỏi (nếu khách có để lại)
    const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    const phonesFound = lastUserMessage.match(phoneRegex) || [];

    // 3. Chuẩn bị dữ liệu lưu trữ
    const visitorData = {
      thoi_gian: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
      ip,
      thiet_bi: userAgent,
      sdt_phat_hien: phonesFound.length > 0 ? phonesFound : "Không có",
      cau_hoi: lastUserMessage
    };

    // 4. In ra console (dành cho log server/Vercel)
    console.log("=== THÔNG TIN KHÁCH HÀNG ===");
    console.log(visitorData);
    console.log("============================");

    // 5. Lưu vào file visitors.log ở thư mục gốc (áp dụng tốt nhất khi chạy ở VPS/Local)
    try {
      const logPath = path.join(process.cwd(), "visitors.log");
      fs.appendFileSync(logPath, JSON.stringify(visitorData) + "\n", "utf8");
    } catch (fsError) {
      console.error("Không thể ghi file log:", fsError);
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Chào Mào AI",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({})) as { error?: { message?: string } };
      console.error(`Gemini 2.5 Flash error:`, err?.error?.message);
      return NextResponse.json({
        answer: "Xin lỗi anh, AI đang bận. Anh thử lại sau nhé! 🙏",
        suggestedProducts: [],
      });
    }

    const data = await res.json() as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const aiAnswer =
      data.choices?.[0]?.message?.content ||
      "Xin lỗi anh, em chưa hiểu rõ. Anh hỏi lại được không ạ?";

    const suggestedProducts = getRelatedProducts(lastUserMessage);

    return NextResponse.json({ answer: aiAnswer, suggestedProducts });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      answer: "Xin lỗi anh, em bị lỗi kết nối. Anh thử lại sau nhé! 🙏",
      suggestedProducts: [],
    });
  }
}
