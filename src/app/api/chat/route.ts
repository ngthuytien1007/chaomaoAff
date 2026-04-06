// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT, ALL_PRODUCTS, getRelatedProducts, getSimpleResponse } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

// Model miễn phí cho câu hỏi phức tạp (không có template)
const FREE_MODEL = "google/gemini-2.0-flash-exp:free";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const lastUserMessage = (messages[messages.length - 1]?.content as string) || "";
    const sessionId = req.headers.get('x-sportaiv-sid');

    // ── Bước 1: Kiểm tra câu hỏi đơn giản (có template sẵn) ──────────────
    const simpleResp = getSimpleResponse(lastUserMessage);

    if (simpleResp) {
      // Trả lời từ template, KHÔNG gọi AI → miễn phí 100%
      const suggestedProducts = ALL_PRODUCTS.filter((p) =>
        simpleResp.productIds.includes(p.id)
      );

      // Vẫn lưu lịch sử chat
      if (sessionId) {
        const now = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).replace(' ', 'T') + '+07:00';
        try {
          const { error } = await supabase.from('chat_history').insert([{
            session_id:    sessionId,
            user_question: lastUserMessage,
            ai_response:   simpleResp.answer,
            tokens_used:   0,
            created_at:    now,
          }]);
          if (error) throw error;
        } catch (err) {
          console.error("❌ Lỗi lưu chat_history (template):", err);
        }
      }

      return NextResponse.json({ answer: simpleResp.answer, suggestedProducts });
    }

    // ── Bước 2: Câu hỏi phức tạp → gọi model miễn phí ───────────────────
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Chào Mào AI",
      },
      body: JSON.stringify({
        model: FREE_MODEL,
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

    // Lưu lịch sử chat
    if (sessionId) {
      const now = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).replace(' ', 'T') + '+07:00';
      try {
        const { error } = await supabase.from('chat_history').insert([{
          session_id:    sessionId,
          user_question: lastUserMessage,
          ai_response:   aiAnswer,
          tokens_used:   tokensUsed,
          created_at:    now,
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

