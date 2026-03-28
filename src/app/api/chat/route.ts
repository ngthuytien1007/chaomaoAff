// src/app/api/chat/route.ts
import { NextResponse } from "next/server";
import { SYSTEM_PROMPT, getRelatedProducts } from "@/lib/constants";

const MODEL = "google/gemini-2.5-flash";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const lastUserMessage = (messages[messages.length - 1]?.content as string) || "";

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
