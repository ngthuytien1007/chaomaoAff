// src/lib/constants.ts

export const SYSTEM_PROMPT = `Bạn là nghệ nhân nuôi chim Chào Mào với hơn 20 năm kinh nghiệm thực chiến. Bạn tên là "Giáo Sư Chào Mào" - người từng đoạt nhiều giải nhất trong các hội thi chim toàn quốc.

PHONG CÁCH TƯ VẤN:
- Nói chuyện thân thiện, nhiệt tình như người anh trong nghề, dùng tiếng Việt miền Nam tự nhiên.
- Dùng thuật ngữ chuyên môn: "căng lửa", "sình bụng", "hót sổng", "chất nước", "bền nước", "chuyền cầu", "tréo cầu", "căng mình", "bung mào", "chim mồi", "bổi", "chim trống", v.v.
- Trả lời ngắn gọn, súc tích (tối đa 150 từ), đi thẳng vào vấn đề.
- Chỉ trả lời về chim Chào Mào thi đấu và tự nhiên, không trả lời các chủ đề không liên quan.

NỘI DUNG TƯ VẤN CHUYÊN SÂU:
1. BỆNH & SỨC KHỎE: Sình bụng (dùng cám mát, lá trầu không, giảm mồi tươi), sổng lửa (tắm nắng, đổi môi trường), thay lông (bổ sung trứng kiến, sâu quy), khò khè (nhỏ thuốc nhỏ mắt, giữ ấm).
2. DINH DƯỠNG & CÁM: Cám đấu (năng lượng cao, nhiều trứng), cám mát (dưỡng bệnh), cám thay lông (nhiều côn trùng), tỉ lệ mồi tươi/khô theo mùa.
3. LỒNG & PHỤ KIỆN: Lồng Thái (hình vuông, rộng rãi), lồng tròn truyền thống, cóng sứ, móc lồng, áo lồng, vị trí treo lồng.
4. HUẤN LUYỆN: Cách dụ chim bổi quen lồng, kỹ thuật "đấu rào", bí quyết kích lửa trước thi, cách dùng chim mồi.
5. MUA BÁN: Cách nhận biết chim tốt (giọng dài, bụng thon, mào đẹp), giá thị trường, nguồn nuôi uy tín.

QUY TẮC:
- Nếu người hỏi về sản phẩm, hãy gợi ý tự nhiên theo nhu cầu của họ.
- Luôn kết thúc bằng một câu hỏi ngược lại để duy trì cuộc trò chuyện (ví dụ: "Chim anh đang dùng cám gì vậy?", "Anh nuôi được bao lâu rồi?").`;

export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  image: string;
  affiliate_url: string;
  tags: string[];
  category: string[];
}

export const ALL_PRODUCTS: Product[] = [
  {
    id: "m1",
    name: "Cám Chào Mào Hiển Bảo Khánh Loại 1 – Cám Mát Dưỡng Bệnh",
    price: "55.000đ",
    originalPrice: "70.000đ",
    rating: 4.9,
    image: "/images/M1.jpg",
    affiliate_url: "https://zalo.me/0795777607",
    tags: ["Bán chạy", "Dưỡng bệnh"],
    category: ["cám", "thức ăn", "sình bụng", "bệnh", "dinh dưỡng", "mát"],
  },
  {
    id: "m2",
    name: "Combo 5 Gói Cám Hiển Bảo Khánh – Cám Đấu Năng Lượng Cao",
    price: "290.000đ",
    originalPrice: "350.000đ",
    rating: 5.0,
    image: "/images/M2.jpg",
    affiliate_url: "https://zalo.me/0795777607",
    tags: ["Combo", "Tiết kiệm"],
    category: ["cám", "thức ăn", "dinh dưỡng", "đấu", "thi", "căng lửa"],
  },
  {
    id: "m3",
    name: "Cám Thay Lông Đặc Biệt – Công Thức Côn Trùng Tự Nhiên",
    price: "75.000đ",
    originalPrice: "90.000đ",
    rating: 4.8,
    image: "/images/M3.jpg",
    affiliate_url: "https://zalo.me/0795777607",
    tags: ["Thay lông", "Tự nhiên"],
    category: ["cám", "thay lông", "lông", "bệnh", "dinh dưỡng"],
  },
  {
    id: "l1",
    name: "Lồng Thái Đấu Chạm Tay Đẳng Cấp – Gỗ Trắc Nguyên Khối",
    price: "1.500.000đ",
    originalPrice: "1.800.000đ",
    rating: 5.0,
    image: "/images/L2.jpg",
    affiliate_url: "https://zalo.me/0795777607",
    tags: ["Cao cấp", "Bán chạy"],
    category: ["lồng", "lồng đấu", "lồng thái", "phụ kiện"],
  },
  {
    id: "l2",
    name: "Lồng Đấu Chạm Tay 360 Gỗ Mun – Form Vuông Chuẩn Thi",
    price: "1.250.000đ",
    originalPrice: "1.500.000đ",
    rating: 4.9,
    image: "/images/L1.jpg",
    affiliate_url: "https://zalo.me/0795777607",
    tags: ["Độc lạ", "Cao cấp"],
    category: ["lồng", "lồng đấu", "lồng thái", "phụ kiện"],
  },
  {
    id: "l3",
    name: "Lồng Tròn Tre Vàng Thủ Công Truyền Thống – Hàng Làng Nghề",
    price: "380.000đ",
    originalPrice: "450.000đ",
    rating: 4.7,
    image: "/images/L3.jpg",
    affiliate_url: "https://zalo.me/0795777607",
    tags: ["Truyền thống", "Thủ công"],
    category: ["lồng", "phụ kiện"],
  },
  {
    id: "c1",
    name: "Cóng Sứ Giang Tây Vẽ Tay Thủ Công – Họa Tiết Chim Cảnh",
    price: "240.000đ",
    originalPrice: "300.000đ",
    rating: 4.9,
    image: "/images/Moc1.jpg",
    affiliate_url: "https://zalo.me/0795777607",
    tags: ["Mỹ nghệ", "Độc lạ"],
    category: ["cóng", "phụ kiện", "lồng", "đồ nghề"],
  },
  {
    id: "h1",
    name: "Áo Lồng Vải Thun Lạnh 3D Họa Tiết Chào Mào – Chống Stress",
    price: "85.000đ",
    originalPrice: "110.000đ",
    rating: 4.8,
    image: "/images/HD1.jpg",
    affiliate_url: "https://zalo.me/0795777607",
    tags: ["Phụ kiện", "Giá tốt"],
    category: ["áo lồng", "phụ kiện", "stress", "vận chuyển"],
  },
];

export const FEATURED_PRODUCTS = ALL_PRODUCTS.filter((p) =>
  ["m2", "l1", "c1", "h1"].includes(p.id)
);

export function getRelatedProducts(query: string): Product[] {
  const q = query.toLowerCase();
  const scored = ALL_PRODUCTS.map((p) => {
    const score = p.category.filter((cat) => q.includes(cat)).length;
    return { ...p, score };
  });
  return scored
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export const QUICK_QUESTIONS = [
  "Chim bị sình bụng thì dùng cám gì?",
  "Lồng Thái nào đang hot nhất hiện nay?",
  "Chim bị sổng lửa phải làm sao?",
  "Cách kích lửa trước khi đi thi?",
];
