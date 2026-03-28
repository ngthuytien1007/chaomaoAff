"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ShoppingCart, Star, Zap } from "lucide-react";
import type { Product } from "@/lib/constants";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  if (compact) {
    return (
      <div className="product-card-compact group">
        <div className="product-card-compact-badge">
          <Zap size={8} />
          AI Gợi Ý
        </div>
        <div className="product-card-compact-img">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="180px"
          />
        </div>
        <div className="product-card-compact-body">
          <h4 className="product-card-compact-name" title={product.name}>
            {product.name}
          </h4>
          <p className="product-card-compact-price">{product.price}</p>
          <Link
            href={product.affiliate_url}
            target="_blank"
            rel="noopener noreferrer"
            className="product-card-compact-btn"
          >
            Mua Shopee
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card group flex flex-col">
      {/* Image */}
      <div className="product-card-img relative overflow-hidden bg-gray-50">
        <span className="product-card-recommend-badge">
          <Zap size={10} />
          AI Recommend
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
          className="product-card-name group-hover:text-primary transition-colors"
          title={product.name}
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
          className="product-card-cta flex items-center justify-center gap-2"
        >
          <ShoppingCart size={14} />
          Mua ngay Shopee
          <ExternalLink size={12} className="opacity-70" />
        </Link>
      </div>
    </div>
  );
}
