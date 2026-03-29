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

    // Gọi AI
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
      console.error(`AI error:`, err?.error?.message);
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

    const tokensUsed = data.usage?.total_tokens ?? null;

    // LƯU vào chat_history — session_id phải là UUID hợp lệ (đã được tạo bởi proxy)
    if (sessionId) {
      try {
        const { error } = await supabase.from('chat_history').insert([{
          session_id:    sessionId,
          user_question: lastUserMessage,
          ai_response:   aiAnswer,
          tokens_used:   tokensUsed,
        }]);
        if (error) throw error;
      } catch (err) {
        console.error("❌ Lỗi lưu chat_history:", err);
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
