"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MessageCircle, Star, Zap, X, CheckCircle2 } from "lucide-react";
import type { Product } from "@/lib/constants";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  // Gửi tracking fire-and-forget — không block navigation
  const handleAffiliateClick = () => {
    fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: product.name,
        productLink: product.affiliate_url,
      }),
    }).catch(() => { /* silent fail */ });
  };

  return (
    <>
      {/* CƠ BẢN HOẶC COMPACT CARD */}
      {compact ? (
        <div className="product-card-compact group">
          <div className="product-card-compact-badge">
            <Zap size={8} />
            AI Gợi Ý
          </div>
          <div 
            className="product-card-compact-img cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="180px"
            />
          </div>
          <div className="product-card-compact-body">
            <h4 
              className="product-card-compact-name cursor-pointer hover:text-primary" 
              title={product.name}
              onClick={() => setIsModalOpen(true)}
            >
              {product.name}
            </h4>
            <p className="product-card-compact-price">{product.price}</p>
            <Link
              href={product.affiliate_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleAffiliateClick}
              className="product-card-compact-btn flex items-center justify-center gap-1 bg-[#0068FF] hover:bg-[#0055D4] text-white"
            >
              <MessageCircle size={10} />
              Mua Zalo
            </Link>
          </div>
        </div>
      ) : (
        <div className="product-card group flex flex-col h-full">
          {/* Image */}
          <div 
            className="product-card-img relative overflow-hidden bg-gray-50 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="product-card-recommend-badge">
              <Zap size={10} />
              AI Khuyên Dùng
            </span>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out"
              sizes="(max-width: 768px) 50vw, 25vw"
              loading="lazy"
            />
          </div>

          {/* Body */}
          <div className="product-card-body flex flex-col flex-1">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {product.tags.map((tag) => (
                <span key={tag} className="product-tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* Name */}
            <h3
              className="product-card-name group-hover:text-primary transition-colors cursor-pointer"
              title={product.name}
              onClick={() => setIsModalOpen(true)}
            >
              {product.name}
            </h3>

            {/* Stars */}
            <div className="flex items-center gap-1 mb-3 bg-gray-50 rounded-lg px-2 py-1 w-fit">
              {stars.map((i) => (
                <Star
                  key={i}
                  size={10}
                  className={
                    i <= Math.floor(product.rating)
                      ? "fill-accent text-accent"
                      : "text-gray-200 fill-gray-200"
                  }
                />
              ))}
              <span className="text-[10px] text-gray-400 ml-1 font-medium">
                ({product.rating})
              </span>
            </div>

            {/* Price */}
            <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-100 mb-3">
              <span className="text-primary font-bold text-base">{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>

            {/* CTA */}
            <Link
              href={product.affiliate_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleAffiliateClick}
              className="product-card-cta flex items-center justify-center gap-2 bg-[#0068FF] hover:bg-[#0055D4] text-white"
            >
              <MessageCircle size={16} />
              Liên hệ Zalo
              <ExternalLink size={14} className="opacity-70 ml-1" />
            </Link>
          </div>
        </div>
      )}

      {/* POPUP MODAL CHI TIẾT SẢN PHẨM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 md:bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 relative bg-gray-50 h-64 md:h-auto min-h-[300px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Info Section */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-3">
                {product.tags.map((tag) => (
                  <span key={tag} className="bg-accent/10 text-accent-dark px-2.5 py-1 rounded-md text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {stars.map((i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i <= Math.floor(product.rating)
                          ? "fill-accent text-accent"
                          : "text-gray-200 fill-gray-200"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  {product.rating} / 5.0
                </span>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-bold text-primary">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-base text-gray-400 line-through mb-1">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <div className="mt-2 text-sm text-green-600 font-medium flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    Tiết kiệm tốt nhất khi mua ngay
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-8 flex-1">
                <h4 className="font-semibold text-gray-900 text-sm">Điểm nổi bật:</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0"></div>Sản phẩm chính hãng chất lượng cao.</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0"></div>Được AI chuyên gia khuyên dùng.</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0"></div>Tư vấn hỗ trợ trọn đời qua Zalo.</li>
                </ul>
              </div>

              <Link
                href={product.affiliate_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleAffiliateClick}
                className="w-full py-4 px-6 bg-[#0068FF] hover:bg-[#0055D4] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg shadow-blue-500/25"
              >
                <MessageCircle size={24} />
                Nhắn tin mua qua Zalo
              </Link>
              <p className="text-center text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
                Hotline hỗ trợ: <strong className="text-gray-600">0795777607</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
