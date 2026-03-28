import Link from "next/link";
import { Feather, Store, BookOpen, Bot } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ALL_PRODUCTS } from "@/lib/constants";

export const metadata = {
  title: "Cửa Hàng Đồ Nghề – Chào Mào AI",
  description: "Tuyển chọn các loại lồng chim, cám chim và phụ kiện chất lượng cao khuyên dùng bởi Chào Mào AI.",
};

export default function StorePage() {
  return (
    <div className="page-wrapper bg-gray-50 min-h-screen">
      {/* ===== HEADER ===== */}
      <header className="site-header" role="banner">
        <div className="container-max header-inner">
          <Link href="/" className="logo-link" aria-label="Trang chủ Chào Mào AI">
            <Feather className="text-accent" size={28} />
            <span className="logo-text">
              Chào Mào <span className="text-accent">AI</span>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Menu chính">
            <Link href="/#hero" className="nav-link">Trang Chủ</Link>
            <Link href="/#chat-section" className="nav-link">Chuyên Gia AI</Link>
            <Link href="/#gallery-section" className="nav-link">Thư Viện Ảnh</Link>
            <Link href="/san-pham" className="nav-link text-primary font-bold after:scale-x-100">Sản Phẩm</Link>
          </nav>

          <Link href="/#chat-section" className="btn-primary">
            Hỏi AI Ngay
          </Link>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="pt-24 pb-16">
        <div className="container-max">
          <div className="section-header pt-8 mb-8 border-b border-gray-200 pb-6">
            <div>
              <div className="section-label">
                <Store size={14} />
                Cửa Hàng Đồ Nghề
              </div>
              <h1 className="section-title">
                Tất Cả <span className="text-primary">Sản Phẩm</span>
              </h1>
              <p className="text-gray-500 mt-2 max-w-2xl">
                Lựa chọn những trang bị, thức ăn và phụ kiện đẳng cấp nhất để chiến binh của bạn luôn sung mãn. Liên hệ trực tiếp qua Zalo để nhận tư vấn mua hàng 24/7.
              </p>
            </div>
          </div>

          <div className="products-grid mt-8">
            {ALL_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="site-footer mt-12 border-t border-gray-200 bg-white" role="contentinfo">
        <div className="container-max footer-inner py-12 flex flex-col items-center text-center">
          <div className="footer-logo mb-4">
            <Feather size={32} className="text-accent" />
          </div>
          <p className="footer-title text-xl font-bold text-gray-900 mb-2">Chào Mào AI</p>
          <p className="footer-desc text-gray-500 mb-6">
            Nền tảng tư vấn chim cảnh thông minh hàng đầu Việt Nam.
            <br />
            Được phát triển bởi{" "}
            <Link
              href="https://sportaiv.com"
              target="_blank"
              className="text-accent hover:underline font-medium"
            >
              SPORTAIV.COM
            </Link>
          </p>
          <p className="footer-copy text-sm text-gray-400">
            © 2026 Chào Mào AI. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </footer>

      {/* ===== MOBILE BOTTOM NAV ===== */}
      <nav className="mobile-bottom-nav" aria-label="Menu di động">
        <Link href="/#chat-section" className="mobile-nav-item">
          <Bot size={22} />
          <span>Tư vấn AI</span>
        </Link>
        <Link href="/san-pham" className="mobile-nav-item mobile-nav-center-item active">
          <div className="mobile-nav-center-icon" aria-hidden="true">
            <Store size={22} />
          </div>
          <span>Cửa hàng</span>
        </Link>
        <Link href="/#gallery-section" className="mobile-nav-item">
          <BookOpen size={22} />
          <span>Thư viện</span>
        </Link>
      </nav>
    </div>
  );
}
