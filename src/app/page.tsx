import Image from "next/image";
import Link from "next/link";
import {
  Feather,
  MessageCircle,
  Store,
  BookOpen,
  Bot,
  Mic2,
  Trophy,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { ChatBox } from "@/components/ChatBox";
import { ProductCard } from "@/components/ProductCard";
import { FEATURED_PRODUCTS } from "@/lib/constants";

const GALLERY_IMAGES = [
  { src: "/images/CM2.png", alt: "Chào Mào rừng đẹp" },
  { src: "/images/CM3.jpg", alt: "Chào Mào căng lửa" },
  { src: "/images/CM4.jpg", alt: "Chào Mào hót" },
  { src: "/images/CM5.jpg", alt: "Chào Mào chiến binh" },
  { src: "/images/CM6.jpg", alt: "Chào Mào mào đẹp" },
  { src: "/images/CM7.jpg", alt: "Chào Mào trên cành" },
];

const STATS = [
  { value: "20+", label: "Năm kinh nghiệm", icon: Trophy },
  { value: "10K+", label: "Câu hỏi đã tư vấn", icon: MessageCircle },
  { value: "99%", label: "Hài lòng", icon: ShieldCheck },
  { value: "Free", label: "Hoàn toàn miễn phí", icon: Mic2 },
];

export default function Home() {
  return (
    <div className="page-wrapper">
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
            <Link href="#hero" className="nav-link">Trang Chủ</Link>
            <Link href="#chat-section" className="nav-link">Chuyên Gia AI</Link>
            <Link href="#gallery-section" className="nav-link">Thư Viện Ảnh</Link>
            <Link href="#products-section" className="nav-link">Sản Phẩm</Link>
          </nav>

          <Link href="#chat-section" className="btn-primary">
            Hỏi AI Ngay
          </Link>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section id="hero" className="hero-section" aria-label="Giới thiệu">
        {/* Background */}
        <div className="hero-bg-img">
          <Image
            src="/images/CM2.png"
            alt="Chim Chào Mào trong thiên nhiên"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero-overlay" />

        {/* Decorations */}
        <div className="hero-deco hero-deco-1" />
        <div className="hero-deco hero-deco-2" />

        <div className="container-max hero-content">
          <span className="hero-badge">
            <Bot size={14} className="text-accent" />
            Hỗ trợ bởi Trí Tuệ Nhân Tạo
          </span>

          <h1 className="hero-title">
            <span className="hero-title-light">Đỉnh cao chăm sóc</span>
            <br />
            <span className="hero-title-accent hero-typing" id="hero-typing">
              Chiến Binh Của Bạn
            </span>
          </h1>

          <p className="hero-desc">
            Hỏi đáp triệu chứng, thiết lập chế độ dinh dưỡng, <br />
            và tìm kiếm linh kiện lồng chuẩn mực với <br />
            siêu AI Chào Mào.
          </p>

          <Link href="#chat-section" className="btn-accent-hero" aria-label="Bắt đầu trò chuyện với chuyên gia AI">
            <MessageCircle size={20} />
            Trò Chuyện Cùng Chuyên Gia
          </Link>

          <Link href="#chat-section" className="hero-scroll-hint" aria-label="Cuộn xuống">
            <ChevronDown size={20} className="animate-bounce" />
          </Link>
        </div>

        {/* Curved divider */}
        <svg
          className="hero-divider"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,60 L1440,60 L1440,0 C1100,50 340,50 0,0 L0,60 Z" />
        </svg>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="stats-section" aria-label="Thống kê">
        <div className="container-max stats-grid">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="stat-item">
              <Icon size={22} className="text-accent mb-2" />
              <span className="stat-value">{value}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CHAT SECTION ===== */}
      <section id="chat-section" className="chat-section" aria-label="Chat với AI">
        <div className="container-chat">
          <div className="section-label">
            <Bot size={14} />
            AI Chuyên Gia
          </div>
          <h2 className="section-title">
            Hỏi <span className="text-primary">Bác Tư</span> Bất Cứ Điều Gì
          </h2>
          <p className="section-desc">
            Nghệ nhân AI 20 năm kinh nghiệm. Tư vấn miễn phí 24/7 về bệnh,
            dinh dưỡng, lồng & kỹ thuật thi đấu.
          </p>

          <ChatBox />
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section id="gallery-section" className="gallery-section" aria-label="Thư viện ảnh chào mào">
        <div className="container-max">
          <div className="section-header">
            <div>
              <div className="section-label">
                <Feather size={14} />
                Thư Viện Ảnh
              </div>
              <h2 className="section-title">
                Vẻ Đẹp <span className="text-primary">Chào Mào</span> Việt
              </h2>
            </div>
          </div>

          <div className="gallery-grid">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className={`gallery-item ${i === 0 ? "gallery-item-featured" : ""}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover gallery-img"
                  sizes={i === 0 ? "50vw" : "25vw"}
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <p className="gallery-caption">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section id="products-section" className="products-section" aria-label="Sản phẩm khuyên dùng">
        <div className="container-max">
          <div className="section-header">
            <div>
              <div className="section-label">
                <Store size={14} />
                Ưu Đãi Độc Quyền
              </div>
              <h2 className="section-title">
                Sản Phẩm <span className="text-primary">Khuyên Dùng</span>
              </h2>
            </div>
            <Link href="#" className="view-all-link group">
              Xem toàn bộ cửa hàng
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="products-grid">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="site-footer" role="contentinfo">
        <div className="container-max footer-inner">
          <div className="footer-logo">
            <Feather size={32} className="text-accent" />
          </div>
          <p className="footer-title">Chào Mào AI</p>
          <p className="footer-desc">
            Nền tảng tư vấn chim cảnh thông minh hàng đầu Việt Nam.
            <br />
            Được phát triển bởi{" "}
            <Link
              href="https://sportaiv.com"
              target="_blank"
              className="text-accent hover:underline"
            >
              SPORTAIV.COM
            </Link>
          </p>
          <p className="footer-copy">
            © 2026 Chào Mào AI. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </footer>

      {/* ===== MOBILE BOTTOM NAV ===== */}
      <nav className="mobile-bottom-nav" aria-label="Menu di động">
        <Link href="#chat-section" className="mobile-nav-item active">
          <Bot size={22} />
          <span>Tư vấn AI</span>
        </Link>
        <Link href="#products-section" className="mobile-nav-item mobile-nav-center-item">
          <div className="mobile-nav-center-icon" aria-hidden="true">
            <Store size={22} />
          </div>
          <span>Cửa hàng</span>
        </Link>
        <Link href="#gallery-section" className="mobile-nav-item">
          <BookOpen size={22} />
          <span>Thư viện</span>
        </Link>
      </nav>
    </div>
  );
}
