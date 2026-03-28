"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, RotateCcw, Camera, Bot, User, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { QUICK_QUESTIONS } from "@/lib/constants";
import type { Product } from "@/lib/constants";

interface Message {
  role: "user" | "assistant";
  content: string;
  suggestedProducts?: Product[];
}

const LS_KEY = "chaomao_ai_v2_history";
const WELCOME_MSG =
  "Dạ chào anh! 👋 Em là **Bác Tư Chào Mào** – 20 năm trong nghề, đã đi qua không biết bao nhiêu hội thi toàn quốc. Anh cần tư vấn thay lông, trị sình bụng, chọn cám thi đấu, hay tìm lồng đẹp thì cứ hỏi em nhé ạ! 🐦";

function formatMessage(content: string) {
  return content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
}

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, []);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Message[];
        setMessages(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const saveToStorage = (msgs: Message[]) => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(msgs));
    } catch {
      // ignore
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(LS_KEY);
    inputRef.current?.focus();
  };

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMsg: Message = { role: "user", content: text };
      const updatedHistory = [...messages, userMsg];

      setMessages(updatedHistory);
      setInput("");
      setIsLoading(true);
      scrollToBottom();

      saveToStorage(updatedHistory);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedHistory.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        const data = await res.json();

        const aiMsg: Message = {
          role: "assistant",
          content: data.answer || "Xin lỗi anh, em gặp lỗi rồi. Anh thử hỏi lại nhé!",
          suggestedProducts: data.suggestedProducts || [],
        };

        const finalHistory = [...updatedHistory, aiMsg];
        setMessages(finalHistory);
        saveToStorage(finalHistory);
      } catch {
        const errMsg: Message = {
          role: "assistant",
          content:
            "Xin lỗi anh, em đang bị lỗi kết nối. Anh thử lại sau nhé! 🙏",
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, scrollToBottom]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const displayMessages = messages.length === 0 ? null : messages;

  return (
    <div className="chat-wrapper">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="chat-avatar">
              <Image
                src="/images/CM1.jpg"
                alt="Bác Tư Chào Mào"
                fill
                className="object-cover rounded-full"
                sizes="48px"
              />
            </div>
            <span className="chat-online-dot" />
          </div>
          <div>
            <h3 className="chat-expert-name">Bác Tư Chào Mào</h3>
            <p className="chat-expert-status">
              <span className="chat-online-pulse" />
              Đang trực tuyến • 20 năm kinh nghiệm
            </p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="chat-clear-btn"
          title="Xoá lịch sử"
          aria-label="Xoá lịch sử hội thoại"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Chat Messages */}
      <div ref={chatBoxRef} className="chat-body" id="chat-box">
        {/* Welcome message */}
        <div className="flex gap-3 max-w-[90%]">
          <div className="msg-avatar-ai">
            <Bot size={16} />
          </div>
          <div className="msg-bubble-ai">
            <p
              className="msg-text"
              dangerouslySetInnerHTML={{ __html: formatMessage(WELCOME_MSG) }}
            />
            {/* Quick questions */}
            <div className="quick-questions">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="quick-q-btn"
                  disabled={isLoading}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Conversation history */}
        {displayMessages?.map((msg, i) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={i}
              className={`flex gap-3 ${isUser ? "flex-row-reverse ml-auto max-w-[85%]" : "max-w-[92%]"}`}
            >
              {/* Avatar */}
              <div className={isUser ? "msg-avatar-user" : "msg-avatar-ai"}>
                {isUser ? <User size={14} /> : <Bot size={14} />}
              </div>

              {/* Content */}
              <div className="min-w-0">
                <div className={isUser ? "msg-bubble-user" : "msg-bubble-ai"}>
                  <p
                    className="msg-text"
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(msg.content),
                    }}
                  />
                </div>

                {/* Inline product cards */}
                {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                  <div className="chat-products-scroll">
                    {msg.suggestedProducts.map((p) => (
                      <ProductCard key={p.id} product={p} compact />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-[85%]">
            <div className="msg-avatar-ai">
              <Bot size={14} />
            </div>
            <div className="msg-bubble-ai typing-indicator-bubble">
              <span className="typing-label">Bác Tư đang nhập</span>
              <div className="dot-typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="chat-footer">
        <form onSubmit={handleSubmit} className="chat-form">
          <button
            type="button"
            className="chat-attach-btn"
            title="Đính kèm ảnh (Sắp ra mắt)"
            aria-label="Đính kèm ảnh"
          >
            <Camera size={18} />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ví dụ: Chim bị sình bụng thì ăn cám gì ạ?"
            className="chat-input"
            autoComplete="off"
            id="chat-input"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="chat-send-btn"
            aria-label="Gửi tin nhắn"
          >
            {isLoading ? (
              <Sparkles size={16} className="animate-spin" />
            ) : (
              <Send size={16} className="ml-0.5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
