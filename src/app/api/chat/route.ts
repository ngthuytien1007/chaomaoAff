// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT, getRelatedProducts } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const MODEL = "google/gemini-2.5-flash";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const lastUserMessage = (messages[messages.length - 1]?.content as string) || "";
    const sessionId = req.headers.get('x-sportaiv-sid');

    // 1. Lấy thông tin địa lý từ Vercel Headers (Cực chuẩn)
    const city = req.headers.get('x-vercel-ip-city') || 'Unknown';
    const country = req.headers.get('x-vercel-ip-country') || 'Unknown';
    const region = req.headers.get('x-vercel-ip-country-region') || 'Unknown';
    const latitude = req.headers.get('x-vercel-ip-latitude') || 'Unknown';
    const longitude = req.headers.get('x-vercel-ip-longitude') || 'Unknown';
    const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || "Unknown";

    // 2. Lấy User-Agent
    const userAgent = req.headers.get('user-agent') || '';
    
    const visitorData = {
      ip,
      location: `${city}, ${region}, ${country} (${latitude}, ${longitude})`,
      device: userAgent, // Có thể bổ sung từ client data nếu cần
      userAgent
    };

    // Thay cho đoạn fs.appendFileSync cũ:
    try {
      const { error } = await supabase
        .from('visitors')
        .insert([
          { 
            session_id: sessionId || visitorData.ip, // Lưu luôn IP nếu ko có session
            ip: visitorData.ip, 
            location: visitorData.location, 
            device: visitorData.device,
            user_agent: visitorData.userAgent,
            content: messages[messages.length - 1]?.content || "" // Lưu câu hỏi cuối cùng của khách
          }
        ]);

      if (error) throw error;
      console.log("✅ Đã lưu thông tin khách vào Supabase");
    } catch (error) {
      console.error("❌ Lỗi lưu Supabase:", error);
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
      usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number };
    };

    const aiAnswer =
      data.choices?.[0]?.message?.content ||
      "Xin lỗi anh, em chưa hiểu rõ. Anh hỏi lại được không ạ?";

    // LƯU DATA: Dùng Insert vào bảng chat_history
    if (sessionId) {
      try {
        await supabase.from('chat_history').insert([{
          session_id: sessionId,
          user_question: lastUserMessage,
          ai_response: aiAnswer,
          tokens_used: data.usage?.total_tokens || 100 // Lấy từ response nếu có, không thì dự phòng 100
        }]);
      } catch (err) {
        console.error("Lỗi lưu chat_history:", err);
      }
    }

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
