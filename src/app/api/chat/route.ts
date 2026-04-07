// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SYSTEM_PROMPT, ALL_PRODUCTS, SIMPLE_RESPONSES, getSimpleResponse, matchKeyword } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import type { Product, SimpleResponse } from "@/lib/constants";

// Giới hạn lịch sử gửi lên AI để tránh token overflow
const MAX_HISTORY_MESSAGES = 10;

// Model miễn phí
const FREE_MODEL = "openrouter/free";

// ─── Helper: Gọi AI (dùng chung cho cả extract keywords và generate answer) ──
async function callAI(
  systemPrompt: string,
  messages: Array<{ role: string; content: string }>,
  maxTokens: number = 512,
  temperature: number = 0.7
) {
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
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      max_tokens: maxTokens,
      temperature,
    }),
  });

  if (!res.ok) return null;

  const data = await res.json() as {
    choices?: Array<{ message?: { content?: string } }>;
    usage?: { total_tokens?: number };
  };

  return {
    content: data.choices?.[0]?.message?.content || "",
    tokensUsed: data.usage?.total_tokens ?? 0,
  };
}

// ─── Helper: AI extract keywords từ câu hỏi (nhẹ, nhanh, ~50 tokens) ────────
const KEYWORD_EXTRACTION_PROMPT = `Bạn là hệ thống phân tích ngữ cảnh câu hỏi về chim Chào Mào.
Nhiệm vụ: Trích xuất 3-5 từ khóa chính BẰNG TIẾNG VIỆT từ câu hỏi của người dùng.
Chỉ trả về danh sách từ khóa cách nhau bằng dấu phẩy, KHÔNG giải thích thêm.
Nếu câu hỏi là lời chào (xin chào, hello, hi...) → trả về: chào
Nếu câu hỏi hỏi "bạn là ai" → trả về: bạn là ai

Ví dụ:
- "chim bổi nuôi 2 tháng nhát quá" → thuần bổi, bổi nhát, chim bổi, tung lồng
- "lồng gì cho chim bỗi" → lồng tròn, lồng tre, thuần bổi, chim bổi
- "con chim sổng lửa mất lửa" → sổng lửa, mất lửa, không hót, lười hót
- "sao nó cứ vẩy cám hoài" → vẩy cám, hẩy cám, cắn cám, phá cám
- "em nó hay ngoái đầu" → ngoái ngửa, lộn cầu, ngoái cổ
- "cám nào tốt cho thi đấu" → cám đấu, cám thi, căng lửa, kích lửa`;

async function extractKeywords(userMessage: string): Promise<string[]> {
  try {
    const result = await callAI(
      KEYWORD_EXTRACTION_PROMPT,
      [{ role: "user", content: userMessage }],
      60,  // max_tokens rất nhỏ → nhanh
      0.1  // temperature thấp → ổn định
    );
    if (!result || !result.content) return [];
    return result.content
      .split(',')
      .map((k: string) => k.trim().toLowerCase())
      .filter(Boolean);
  } catch {
    return [];
  }
}

// ─── Helper: Tìm template phù hợp nhất bằng AI-extracted keywords ───────────
interface TemplateMatch {
  answer: string;
  productIds: string[];
  score: number;
}

function searchTemplatesByKeywords(
  aiKeywords: string[],
  dbTemplates: Array<{ keywords: string; answer: string; product_ids?: string }>,
  staticTemplates: SimpleResponse[]
): TemplateMatch | null {
  let bestMatch: TemplateMatch | null = null;

  // Tìm trong DB templates
  for (const tmpl of dbTemplates) {
    if (!tmpl.keywords) continue;
    const tmplKws = tmpl.keywords.split(',').map((k: string) => k.trim().toLowerCase());
    // Đếm số keywords AI extract khớp với template keywords (fuzzy: chứa nhau)
    const score = aiKeywords.filter((aiKw) =>
      tmplKws.some((tk) => tk.includes(aiKw) || aiKw.includes(tk))
    ).length;
    if (score >= 2 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = {
        answer: tmpl.answer,
        productIds: tmpl.product_ids
          ? tmpl.product_ids.split(',').map((id: string) => id.trim())
          : [],
        score,
      };
    }
  }

  // Tìm trong static templates
  for (const resp of staticTemplates) {
    const score = aiKeywords.filter((aiKw) =>
      resp.keywords.some((rk) => rk.includes(aiKw) || aiKw.includes(rk))
    ).length;
    if (score >= 2 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = {
        answer: resp.answer,
        productIds: resp.productIds,
        score,
      };
    }
  }

  return bestMatch;
}

// ─── Helper: Lưu lịch sử chat vào Supabase ─────────────────────────────────
async function saveChatHistory(
  sessionId: string,
  userQuestion: string,
  aiResponse: string,
  tokensUsed: number
) {
  const now = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).replace(' ', 'T') + '+07:00';
  try {
    const { error } = await supabase.from('chat_history').insert([{
      session_id: sessionId,
      user_question: userQuestion,
      ai_response: aiResponse,
      tokens_used: tokensUsed,
      created_at: now,
    }]);
    if (error) throw error;
  } catch (err) {
    console.error("❌ Lỗi lưu chat_history:", err);
  }
}

// ─── Helper: Kiểm tra tiếng Việt có dấu ─────────────────────────────────────
const ALLOWED_ABBREVIATIONS = new Set([
  // Viết tắt thông dụng cho phép
  'ko', 'k', 'dc', 'đc', 'j', 'z', 'g', 'ntn', 'bt', 'tl', 'vs', 'vd',
  'ok', 'hi', 'alo', 'sp', 'ad', 'mn', 'ae', 'ck', 'tk', 'vip',
  'cm', 'fb', 'ib', 'pm', 'rep', 'shop', 'acc', 'oki', 'tks', 'thanks',
]);

const VIETNAMESE_DIACRITICS_REGEX = /[àáảãạăắằẳẵặâấầẩẫậđèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ]/i;

const NO_DIACRITICS_RESPONSE =
  "Dạ anh ơi, em đọc chữ không dấu hơi khó hiểu đúng ý anh lắm 😅\n\n" +
  "Anh gõ tiếng Việt **có dấu** giúp em nhé, em sẽ tư vấn chính xác hơn cho anh!\n\n" +
  "Ví dụ: \"chim bị sình bụng\" thay vì \"chim bi sinh bung\"\n\n" +
  "*(Mấy từ viết tắt như ko, dc, j, ntn... thì em hiểu được anh nhé!)*";

function isVietnameseWithoutDiacritics(text: string): boolean {
  const words = text.trim().split(/\s+/);
  // Chỉ kiểm tra nếu câu đủ dài (có ngữ cảnh)
  if (words.length < 4) return false;

  // Loại bỏ các từ viết tắt hợp lệ, chỉ đếm các từ "thật"
  const realWords = words.filter((w) => !ALLOWED_ABBREVIATIONS.has(w.toLowerCase()));
  if (realWords.length < 3) return false;

  // Nếu không có bất kỳ dấu tiếng Việt nào → coi là viết không dấu
  return !VIETNAMESE_DIACRITICS_REGEX.test(text);
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN HANDLER
// ══════════════════════════════════════════════════════════════════════════════
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Yêu cầu không hợp lệ anh ơi!" }, { status: 400 });
    }

    const lastUserMessage = (messages[messages.length - 1]?.content as string) || "";

    // ── Kiểm tra tiếng Việt có dấu ──────────────────────────────────────
    if (isVietnameseWithoutDiacritics(lastUserMessage)) {
      return NextResponse.json({
        answer: NO_DIACRITICS_RESPONSE,
        suggestedProducts: [],
      });
    }

    // Đọc session_id từ cookie (middleware đã set sẵn)
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('sportaiv_sid')?.value ||
                      req.headers.get('x-sportaiv-sid') ||
                      null;

    // Chỉ giữ N messages gần nhất để tránh vượt token limit
    const trimmedMessages = messages.slice(-MAX_HISTORY_MESSAGES);

    // ── Bước 0: Load sản phẩm từ DB ──────────────────────────────────────
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
    const dbIds = new Set(dbProducts.map((p) => p.id));
    const allAvailableProducts: Product[] = [
      ...dbProducts,
      ...ALL_PRODUCTS.filter((p) => !dbIds.has(p.id)),
    ];

    // ── Load DB templates 1 lần (dùng cho cả Tier 1 và Tier 2) ──────────
    let dbTemplates: Array<{ keywords: string; answer: string; product_ids?: string }> = [];
    try {
      const { data, error } = await supabase
        .from('chat_templates')
        .select('keywords, answer, product_ids');
      if (!error && data) {
        dbTemplates = data;
      }
    } catch (e) {
      console.error("❌ Lỗi kéo template từ DB:", e);
    }

    // ══════════════════════════════════════════════════════════════════════
    // TIER 1: Quick keyword match (miễn phí, instant)
    // Dành cho các câu rõ ràng: chào, cảm ơn, bạn là ai...
    // ══════════════════════════════════════════════════════════════════════
    let answerFromTemplate: string | null = null;
    let templateProductIds: string[] = [];

    // 1.A: Quét DB templates
    for (const tmpl of dbTemplates) {
      if (!tmpl.keywords) continue;
      const kws = tmpl.keywords.split(',').map((k: string) => k.trim().toLowerCase()).filter(Boolean);
      const checkMsg = lastUserMessage.toLowerCase();
      if (kws.some((k: string) => matchKeyword(checkMsg, k))) {
        answerFromTemplate = tmpl.answer;
        if (tmpl.product_ids) {
          templateProductIds = tmpl.product_ids.split(',').map((id: string) => id.trim());
        }
        break;
      }
    }

    // 1.B: Quét static templates
    if (!answerFromTemplate) {
      const simpleResp = getSimpleResponse(lastUserMessage);
      if (simpleResp) {
        answerFromTemplate = simpleResp.answer;
        templateProductIds = simpleResp.productIds;
      }
    }

    // Nếu Tier 1 match → trả ngay (0 API call)
    if (answerFromTemplate) {
      const suggestedProducts = allAvailableProducts.filter((p) =>
        templateProductIds.includes(p.id)
      );
      if (sessionId) {
        await saveChatHistory(sessionId, lastUserMessage, answerFromTemplate, 0);
      }
      return NextResponse.json({ answer: answerFromTemplate, suggestedProducts });
    }

    // ══════════════════════════════════════════════════════════════════════
    // TIER 2: AI hiểu ngữ cảnh → extract keywords → tìm template
    // Ví dụ: "lồng gì cho chim bỗi 2 tháng nhác"
    //   → AI extract: ["thuần bổi", "bổi nhát", "chim bổi", "lồng"]
    //   → Match template "thuần bổi" → trả template thay vì gọi AI sinh
    // ══════════════════════════════════════════════════════════════════════
    const aiKeywords = await extractKeywords(lastUserMessage);
    console.log("🔍 AI extracted keywords:", aiKeywords);

    if (aiKeywords.length > 0) {
      const templateMatch = searchTemplatesByKeywords(
        aiKeywords,
        dbTemplates,
        SIMPLE_RESPONSES
      );

      if (templateMatch) {
        console.log(`✅ Template matched (score=${templateMatch.score}):`, templateMatch.answer.substring(0, 50) + "...");
        const suggestedProducts = allAvailableProducts.filter((p) =>
          templateMatch.productIds.includes(p.id)
        );
        if (sessionId) {
          await saveChatHistory(sessionId, lastUserMessage, templateMatch.answer, 0);
        }
        return NextResponse.json({ answer: templateMatch.answer, suggestedProducts });
      }
    }

    // ══════════════════════════════════════════════════════════════════════
    // TIER 3: Không tìm được template → AI sinh câu trả lời đầy đủ
    // ══════════════════════════════════════════════════════════════════════
    console.log("🤖 No template match → AI generating full answer...");

    const aiResult = await callAI(
      SYSTEM_PROMPT,
      trimmedMessages,
      512,
      0.7
    );

    if (!aiResult) {
      return NextResponse.json({
        answer: "Xin lỗi anh, AI đang bận. Anh thử lại sau nhé! 🙏",
        suggestedProducts: [],
      });
    }

    const aiAnswer = aiResult.content || "Xin lỗi anh, em chưa hiểu rõ. Anh hỏi lại được không ạ?";
    const tokensUsed = aiResult.tokensUsed;

    // Lưu lịch sử
    if (sessionId) {
      await saveChatHistory(sessionId, lastUserMessage, aiAnswer, tokensUsed);
    }

    // Gợi ý sản phẩm dựa trên AI keywords (chính xác hơn keyword thô)
    const searchKeywords = aiKeywords.length > 0 ? aiKeywords : [lastUserMessage.toLowerCase()];
    const scored = allAvailableProducts.map((p) => {
      const score = p.category.filter((cat) =>
        searchKeywords.some((kw) => kw.includes(cat) || cat.includes(kw))
      ).length;
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
