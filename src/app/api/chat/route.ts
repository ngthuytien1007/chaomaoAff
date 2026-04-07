// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SYSTEM_PROMPT, ALL_PRODUCTS, getSimpleResponse } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/constants";

// Giới hạn lịch sử gửi lên AI để tránh token overflow
const MAX_HISTORY_MESSAGES = 10;

// Model miễn phí cho câu hỏi phức tạp (không có template)
const FREE_MODEL = "openrouter/free";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Yêu cầu không hợp lệ anh ơi!" }, { status: 400 });
    }

    const lastUserMessage = (messages[messages.length - 1]?.content as string) || "";

    // Đọc session_id từ cookie (middleware đã set sẵn) thay vì header từ frontend
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('sportaiv_sid')?.value ||
                      req.headers.get('x-sportaiv-sid') ||
                      null;

    // Chỉ giữ N messages gần nhất để tránh vượt token limit
    const trimmedMessages = messages.slice(-MAX_HISTORY_MESSAGES);

    // ── Bước 0: Load sản phẩm từ DB (để gợi ý sản phẩm mới nhất) ─────────
    let dbProducts: Product[] = [];
    try {
      const { data: dbProdRows } = await supabase
        .from('products')
        .select('id, name, price, original_price, rating, image, affiliate_url, tags, category')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (dbProdRows) {
        dbProducts = dbProdRows.map((row: any) => ({
          id: row.id,
          name: row.name,
          price: row.price,
          originalPrice: row.original_price ?? undefined,
          rating: row.rating ?? 5.0,
          image: row.image ?? '',
          affiliate_url: row.affiliate_url ?? '',
          tags: Array.isArray(row.tags) ? row.tags : [],
          category: Array.isArray(row.category) ? row.category : [],
        }));
      }
    } catch {
      // Fallback to static products
    }
    // Merge: DB products first (newest), then static (no duplicates)
    const dbIds = new Set(dbProducts.map((p) => p.id));
    const allAvailableProducts: Product[] = [
      ...dbProducts,
      ...ALL_PRODUCTS.filter((p) => !dbIds.has(p.id)),
    ];

    // ── Bước 1: Kiểm tra câu hỏi đơn giản (có template sẵn) ──────────────
    let answerFromTemplate: string | null = null;
    let templateProductIds: string[] = [];

    // 1.A Thử kéo dữ liệu từ bảng chat_templates trên Supabase trước
    try {
      const { data: dbTemplates, error: dbError } = await supabase
        .from('chat_templates')
        .select('keywords, answer, product_ids');
        
      if (!dbError && dbTemplates && dbTemplates.length > 0) {
        const checkMsg = lastUserMessage.toLowerCase();
        for (const tmpl of dbTemplates) {
          if (!tmpl.keywords) continue;
          
          const kws = tmpl.keywords.split(',').map((k: string) => k.trim().toLowerCase()).filter(Boolean);
          
          // Bảo vệ từ "chào mào" không bị match nhầm với "chào"
          const safeMsg = checkMsg.replace(/chào mào/g, 'cm_bird');
          
          if (kws.some((k: string) => {
            if (k === 'chào') return safeMsg.includes('chào');
            // FIX: regex escape đúng - dùng literal regex, không escape kép
            if (k === 'ai' || k === 'a.i') return /\bai\b/i.test(safeMsg);
            return checkMsg.includes(k);
          })) {
            answerFromTemplate = tmpl.answer;
            if (tmpl.product_ids) {
               templateProductIds = tmpl.product_ids.split(',').map((id: string) => id.trim());
            }
            break; 
          }
        }
      }
    } catch (e) {
      console.error("❌ Lỗi kéo template từ DB, sẽ fallback về constants:", e);
    }

    // 1.B Nếu không tìm được trong Database (hoặc bảng lỗi), Backup quét file tĩnh
    if (!answerFromTemplate) {
      const simpleResp = getSimpleResponse(lastUserMessage);
      if (simpleResp) {
        answerFromTemplate = simpleResp.answer;
        templateProductIds = simpleResp.productIds;
      }
    }

    if (answerFromTemplate) {
      // Trả lời từ template, KHÔNG gọi AI → miễn phí 100%
      // Tìm trong cả DB products lẫn static products
      const suggestedProducts = allAvailableProducts.filter((p) =>
        templateProductIds.includes(p.id)
      );

      // Lưu lịch sử chat dạng template
      if (sessionId) {
        const now = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).replace(' ', 'T') + '+07:00';
        try {
          const { error } = await supabase.from('chat_history').insert([{
            session_id:    sessionId,
            user_question: lastUserMessage,
            ai_response:   answerFromTemplate,
            tokens_used:   0,
            created_at:    now,
          }]);
          if (error) throw error;
        } catch (err) {
          console.error("❌ Lỗi lưu chat_history (template):", err);
        }
      }

      return NextResponse.json({ answer: answerFromTemplate, suggestedProducts });
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
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmedMessages],
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

    // Gợi ý sản phẩm từ pool đầy đủ (DB + static)
    const q = lastUserMessage.toLowerCase();
    const scored = allAvailableProducts.map((p) => {
      const score = p.category.filter((cat) => q.includes(cat)).length;
      return { ...p, score };
    });
    const suggestedProducts = scored
      .filter((p) => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    return NextResponse.json({ answer: aiAnswer, suggestedProducts });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      answer: "Xin lỗi anh, em bị lỗi kết nối. Anh thử lại sau nhé! 🙏",
      suggestedProducts: [],
    });
  }
}

