import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import VisitorTracker from "@/components/VisitorTracker";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chào Mào AI – Chuyên Gia Tư Vấn Chim Cảnh Số 1 Việt Nam",
  description:
    "Tư vấn nuôi chim Chào Mào bởi AI thông minh 20 năm kinh nghiệm. Hỏi đáp triệu chứng bệnh, chế độ dinh dưỡng, lồng đấu, phụ kiện và sản phẩm affiliate chất lượng cao.",
  keywords: [
    "chào mào",
    "chim chào mào",
    "nuôi chim cảnh",
    "cám chào mào",
    "lồng chim",
    "tư vấn chim",
    "AI chim cảnh",
    "chào mào thi đấu",
  ],
  authors: [{ name: "Chào Mào AI Team" }],
  openGraph: {
    title: "Chào Mào AI – Chuyên Gia Tư Vấn Chim Cảnh",
    description: "Hỏi đáp miễn phí với AI nghệ nhân chào mào 20 năm kinh nghiệm",
    type: "website",
    locale: "vi_VN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2D5A27",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="antialiased" suppressHydrationWarning>
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}
