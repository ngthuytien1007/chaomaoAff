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

// ─── Template responses (no AI call needed) ───────────────────────────────────

export interface SimpleResponse {
  keywords: string[];
  answer: string;
  productIds: string[];
}

export const SIMPLE_RESPONSES: SimpleResponse[] = [
  {
    keywords: ["sình bụng", "bụng phình", "ỉa chảy", "tiêu chảy"],
    answer:
      "Chim bị sình bụng thì anh làm vầy nè:\n\n" +
      "1. **Ngưng mồi tươi ngay** (dế, sâu, trứng kiến)\n" +
      "2. **Đổi sang cám mát** – giúp làm dịu hệ tiêu hóa nhanh\n" +
      "3. Cho ăn 1-2 lá trầu không tươi mỗi ngày\n" +
      "4. Tắm nắng nhẹ buổi sáng 15-20 phút\n\n" +
      "Thường 3-5 ngày là ổn lại. Anh thử cho uống nước sắc lá ổi non cũng rất hiệu quả nha!\n\n" +
      "Chim anh bị mấy ngày rồi anh?",
    productIds: ["m1"],
  },
  {
    keywords: ["sổng lửa", "mất lửa", "không hót", "lười hót", "im lặng", "không chịu hót"],
    answer:
      "Chim sổng lửa có nhiều nguyên nhân lắm anh ơi:\n\n" +
      "1. **Đổi vị trí treo lồng** – chỗ mới kích thích chim tốt hơn\n" +
      "2. **Tắm nắng sáng sớm** 20-30 phút, tránh nắng gắt\n" +
      "3. **Cho nghe băng tiếng chào mào** khỏe để kích chiến\n" +
      "4. **Tăng mồi tươi** lên: dế nhỏ, trứng kiến tươi\n" +
      "5. Kiểm tra xem chim có đang thay lông không nha\n\n" +
      "Anh cho chim nghe chiến bao lâu rồi mà chưa thấy lên lửa?",
    productIds: ["m2"],
  },
  {
    keywords: ["thay lông", "rụng lông", "lông mới", "lông xơ"],
    answer:
      "Mùa thay lông chim cần chăm đặc biệt anh nè:\n\n" +
      "1. **Dùng cám thay lông** – giàu côn trùng tự nhiên, lông mọc đẹp và bóng\n" +
      "2. Tăng trứng kiến + sâu quy 3-4 lần/tuần\n" +
      "3. **Tắm thường xuyên hơn** để lông mới sạch và mượt\n" +
      "4. Hạn chế cho đấu – tập trung năng lượng mọc lông\n" +
      "5. Bổ sung vitamin tổng hợp vào nước uống\n\n" +
      "Mùa thay lông thường kéo dài 1-2 tháng. Anh đang nuôi chim loại gì vậy?",
    productIds: ["m3"],
  },
  {
    keywords: ["cám đấu", "cám thi", "căng lửa", "kích lửa", "trước thi", "trước giải"],
    answer:
      "Chuẩn bị chim trước thi thì anh cần:\n\n" +
      "1. **Dùng cám đấu năng lượng cao** – tăng protein, kích lửa mạnh\n" +
      "2. Trước thi 3 ngày: tăng dế tươi, giảm tắm\n" +
      "3. **Buổi sáng thi**: cho nghe băng chiến 30 phút từ xa\n" +
      "4. Tránh cho chim nhìn thấy đối thủ quá sớm\n" +
      "5. Áo lồng kín cho đến khi vào sân\n\n" +
      "Combo 5 gói cám đấu tiết kiệm hơn mua lẻ nhiều anh ơi! Anh chuẩn bị thi hội nào vậy?",
    productIds: ["m2"],
  },
  {
    keywords: ["lồng thái", "lồng đấu", "lồng vuông", "mua lồng"],
    answer:
      "Lồng Thái đang được anh em ưa chuộng nhất vì:\n\n" +
      "✅ **Form vuông chuẩn thi** – giám khảo dễ chấm điểm\n" +
      "✅ Chim di chuyển linh hoạt hơn lồng tròn\n" +
      "✅ Gỗ trắc/gỗ mun bền, đẹp, sang trọng\n\n" +
      "Hiện có 2 loại hot:\n" +
      "- **Gỗ Trắc Nguyên Khối** – cao cấp nhất, chạm tay tinh xảo\n" +
      "- **Gỗ Mun Form Vuông** – giá tốt hơn, vẫn chuẩn thi\n\n" +
      "Anh đang nuôi chim bổi hay chim chiến để em tư vấn lồng phù hợp?",
    productIds: ["l1", "l2"],
  },
  {
    keywords: ["lồng tròn", "lồng tre", "lồng truyền thống"],
    answer:
      "Lồng tròn tre vàng thủ công là lựa chọn tuyệt vời cho:\n\n" +
      "✅ Chim đang dưỡng hoặc chim mới về nhà\n" +
      "✅ Trưng bày, trang trí\n" +
      "✅ Nuôi dưỡng chim bổi quen người\n\n" +
      "Lồng tre làng nghề thủ công, nan đều, sơn bóng đẹp, giá rất phải chăng anh ơi. " +
      "Anh muốn tìm lồng để nuôi dưỡng hay để thi đấu?",
    productIds: ["l3"],
  },
  {
    keywords: ["cóng sứ", "cóng", "chén nước", "chén cám", "đồ đựng"],
    answer:
      "Cóng sứ Giang Tây vẽ tay là đồ chơi được anh em nghệ nhân chuộng nhất:\n\n" +
      "✅ Sứ cao cấp, không thấm nước, dễ vệ sinh\n" +
      "✅ Họa tiết chim cảnh vẽ tay tinh xảo – đẹp như tác phẩm nghệ thuật\n" +
      "✅ Không ảnh hưởng mùi thức ăn như cóng nhựa\n\n" +
      "Dùng cóng sứ chim ăn ngon miệng và sạch hơn nhiều anh ơi! Anh đang dùng cóng nhựa hay cóng sứ?",
    productIds: ["c1"],
  },
  {
    keywords: ["áo lồng", "bọc lồng", "che lồng", "stress", "vận chuyển"],
    answer:
      "Áo lồng vải thun lạnh 3D rất cần thiết anh ơi:\n\n" +
      "✅ **Chống stress** khi vận chuyển đến hội thi\n" +
      "✅ Giữ ấm cho chim vào mùa lạnh\n" +
      "✅ Họa tiết Chào Mào 3D đẹp, độc lạ\n" +
      "✅ Vải thun lạnh thoáng khí, không bí\n\n" +
      "Bí quyết: luôn che áo lồng khi di chuyển, mở từ từ khi đến nơi để chim thích nghi. " +
      "Anh hay đi thi xa không?",
    productIds: ["h1"],
  },
];

export function getSimpleResponse(query: string): SimpleResponse | null {
  const q = query.toLowerCase();
  for (const resp of SIMPLE_RESPONSES) {
    if (resp.keywords.some((kw) => q.includes(kw))) {
      return resp;
    }
  }
  return null;
}

export const QUICK_QUESTIONS = [
  "Chim bị sình bụng thì dùng cám gì?",
  "Lồng Thái nào đang hot nhất hiện nay?",
  "Chim bị sổng lửa phải làm sao?",
  "Cách kích lửa trước khi đi thi?",
];
