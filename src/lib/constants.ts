// src/lib/constants.ts

export const SYSTEM_PROMPT = `Bạn là nghệ nhân nuôi chim Chào Mào với hơn 20 năm kinh nghiệm thực chiến. Bạn tên là "Giáo Sư Chào Mào" - người từng đoạt nhiều giải nhất trong các hội thi chim toàn quốc.

PHONG CÁCH TƯ VẤN:
- Nói chuyện thân thiện, nhiệt tình như người anh em trong nghề, dùng tiếng Việt miền Nam tự nhiên.
- LUÔN xưng "em" và gọi người dùng là "anh". Luôn có chủ vị rõ ràng (Ví dụ: "Dạ anh ơi...", "Em thấy là..."). Không nói trống không.
- TUYỆT ĐỐI KHÔNG DÙNG TIẾNG ANH. Nếu có khái niệm tiếng Anh, phải dịch ra tiếng Việt (ví dụ: "form" -> "dáng/bản", "performance" -> "độ ổn định/nước chơi").
- Dùng thuật ngữ chuyên môn: "căng lửa", "sình bụng", "hót sổng", "chất nước", "bền nước", "chuyền cầu", "tréo cầu", "căng mình", "bung mào", "chim mồi", "bổi", "chim trống", v.v.
- Trả lời ngắn gọn, súc tích (tối đa 150 từ), đi thẳng vào vấn đề.
- Chỉ trả lời về chim Chào Mào thi đấu và tự nhiên.

NỘI DUNG TƯ VẤN CHUYÊN SÂU:
1. BỆNH & SỨC KHỎE: Sình bụng, sổng lửa, thay lông, khò khè.
2. DINH DƯỠNG & CÁM: Cám đấu, cám mát, cám thay lông.
3. LỒNG & PHỤ KIỆN: Lồng Thái, lồng tròn, cóng sứ, móc lồng, áo lồng.
4. HUẤN LUYỆN: Cách dụ bổi, tập đấu, kích lửa.

QUY TẮC:
- Nếu người hỏi về sản phẩm, hãy gợi ý tự nhiên theo nhu cầu của họ. Mời họ mua lồng, cám, phụ kiện.
- Luôn kết thúc bằng một câu hỏi ngược lại thân thiện.`;

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
    keywords: ["chào", "hello", "hi", "alo", "em là ai", "bạn là ai", "ad", "admin", "ai đấy"],
    answer:
      "Dạ em chào anh! Em là Giáo Sư Chào Mào, chuyên viên tư vấn 20 năm kinh nghiệm nuôi chim đây ạ.\n\n" +
      "Anh đang gặp vấn đề gì về sức khỏe của chim, cách chọn lồng hay cám bã không, anh cứ nói ra em tư vấn kỹ cho nha!",
    productIds: [],
  },
  {
    keywords: ["cảm ơn", "cam on", "thanks", "tuyệt vời", "ok", "tốt", "hay quá"],
    answer:
      "Dạ không có chi đâu anh nha! Giúp được chim cưng của anh khỏe mạnh là em vui rồi.\n\n" +
      "Anh cứ chăm theo hướng dẫn nhé, cần gì thêm đồ như Cóng sứ hay Áo lồng chống chuột thì cứ ủng hộ em là được ạ!",
    productIds: ["c1", "h1"],
  },
  {
    keywords: ["chào mào lỗi", "chim lỗi", "bị lỗi", "tật lỗi", "sinh tật"],
    answer:
      "Dạ chim sinh tật lỗi (như ngoái ngửa, lộn mèo, cắn đuôi, vẩy cám) thường do không gian lồng hoặc lửa quá khắt gây ức chế anh ạ.\n\n" +
      "Anh mô tả rõ giúp em là chim cưng nhà mình đang bị tật gì, em sẽ bày cách khắc phục triệt để cho anh nghen!",
    productIds: ["l2"],
  },
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
  {
    keywords: ["khò khè", "ho", "cảm lạnh", "sổ mũi", "viêm phổi"],
    answer:
      "Chim bị ho, khò khè thường do trúng gió hoặc lồng ẩm ướt anh ạ:\n\n" +
      "1. **Nhỏ 1-2 giọt dầu tràm** dưới đáy lồng để giữ ấm, sát khuẩn.\n" +
      "2. **Pha nước tỏi loãng** hoặc dùng thuốc ho thảo dược cho chim uống.\n" +
      "3. Trùm kín áo lồng chữ A, để nơi khuất gió, yên tĩnh.\n" +
      "4. Ngưng tắm nước, chỉ dọn phân sạch sẽ.\n\n" +
      "Anh dùng thêm cám mát để chim dễ hấp thu lúc bệnh nhé. Chim anh bị khò khè lâu chưa?",
    productIds: ["m1", "h1"],
  },
  {
    keywords: ["ngoái ngửa", "lộn cầu", "ngoái cổ"],
    answer:
      "Chào mào ngoái ngửa là một tật lỗi khá phổ biến, thường do quá chật chội hoặc hoảng sợ:\n\n" +
      "1. **Đổi sang lồng rộng hơn**, ưu tiên đổi lồng Thái rộng.\n" +
      "2. **Căng dây nóc lồng** hoặc dùng áo lồng che bớt nóc để chim không ngước lên.\n" +
      "3. Bố trí lại cầu: dùng cầu song song hoặc cầu phụ che lấy điểm mù.\n" +
      "4. Tránh để chim hốt hoảng, treo chim ngang tầm mắt.\n\n" +
      "Anh đang nuôi lồng tròn hay lồng lồng vuông vậy?",
    productIds: ["l2", "l1"],
  },
  {
    keywords: ["vẩy cám", "hẩy cám", "cắn cám", "phá cám"],
    answer:
      "Chim vẩy cám thường do không hợp khẩu vị hoặc hạt cứng:\n\n" +
      "1. **Đổi loại cám hạt nhỏ hơn** hạt mịn.\n" +
      "2. Dùng cóng sâu đáy hoặc cóng chuyên dụng chống vẩy.\n" +
      "3. Giảm mồi tươi lại để chim buộc phải ăn cám.\n\n" +
      "Anh đang dùng cóng sứ nông hay cóng nhựa sâu thế?",
    productIds: ["m1", "c1"],
  },
  {
    keywords: ["tắm cóng", "tắm trong lồng", "bức bí", "vẩy nước"],
    answer:
      "Chim hay tắm cóng là do thân nhiệt cao, căng lửa rát hoặc ở dơ quá:\n\n" +
      "1. **Tăng cường tắm nước** vào các buổi trưa hoặc chiều mát trong lồng tắm riêng.\n" +
      "2. Ép chim qua lồng tắm chuyên dụng, rút cóng nước bên lồng nuôi ra.\n" +
      "3. Đổi sang cám mát nếu chim đang ăn cám sinh nhiệt cao.\n\n" +
      "Anh hay tắm nước cho chim mấy ngày 1 lần?",
    productIds: ["c1", "m1"],
  },
  {
    keywords: ["rỉa lông", "cắn lông", "rứt lông"],
    answer:
      "Cắn lông, rỉa lông nát tả tơi thường do rận mạt hoặc cám đang bị nóng bức quá:\n\n" +
      "1. **Tắm nước chè xanh loãng** hoặc nước muối sinh lý có pha xíu chanh để diệt rận mạt.\n" +
      "2. Cắt hẳn mồi tươi sinh nhiệt (sâu rồng), chuyển xuống cám siêu mát.\n" +
      "3. Vệ sinh lồng kỹ càng, giặt giũ phơi sấy áo lồng.\n\n" +
      "Chim nhà anh hay tự cắn rứt lông phần cánh hay phần đuôi thế?",
    productIds: ["m3", "h1"],
  },
  {
    keywords: ["thuần bổi", "bổi nhát", "chim bổi", "tung lồng", "chớp cánh"],
    answer:
      "Thuần bổi thiên nhiên cần sự kiên nhẫn. Bí quyết của em là:\n\n" +
      "1. Cắt nhẹ 1 phần lông đầu cánh (nếu quá nhát) để chim bớt tung tét đầu mẻ mỏ.\n" +
      "2. Trùm áo lồng chữ A, hé tầm 30% để ở góc tường có người qua lại vừa phải.\n" +
      "3. Mỗi lần cho ăn rút cóng ra, chờ đói rồi mới cho chuối vào.\n\n" +
      "Anh đang nhốt bé bổi trong lồng bằng tre hay bằng sắt?",
    productIds: ["l3", "h1"],
  },
  {
    keywords: ["vào cám", "tập ăn cám", "chưa biết ăn cám"],
    answer:
      "Bổi mộc chưa quen ăn cám anh áp dụng chiêu này nhạy lắm nè:\n\n" +
      "1. Dùng 1 quả chuối chín, bẻ đôi, nhét cám bột li ti dính dày vào mặt cắt quả chuối.\n" +
      "2. Chim mổ chuối sẽ nuốt luôn cám tơ vô ruột.\n" +
      "3. Trộn trứng kiến tươi với cám cũng là cách dụ mùi rất tốt.\n\n" +
      "Bác mổ phân chim xem thử có lợn cợn màu cám chưa nha, anh dùng cám mát loại nào?",
    productIds: ["m1"],
  },
  {
    keywords: ["ép dạn", "ép dạn bổi", "treo lồng", "để đất"],
    answer:
      "Ép dạn bổi hiệu quả thì phải tiếp xúc nhiều:\n\n" +
      "1. Chịu khó để lồng dưới nền nhà (cẩn thận chó mèo chột chim).\n" +
      "2. Cầm sẵn mồi ngon (cào cào non), đi ngang qua là nhá cho 1 con.\n" +
      "3. Chỉ mở áo lồng từ từ, không bọc ra hết làm chim hoảng tung rách mặt.\n\n" +
      "Áo lồng nhà bác là vải mỏng hay thun lạnh che 3D?",
    productIds: ["l3", "h1"],
  },
  {
    keywords: ["yếu chân", "đứng một chân", "bã chân", "co chân", "liệt chân"],
    answer:
      "Chim co rút chân, bã chân là chứng bệnh thiếu Canxi hoặc chân vướng lồng:\n\n" +
      "1. Kiểm tra nan lồng xem có gãy xước gì làm trầy móng chim rướm máu không.\n" +
      "2. Bổ sung Canxi (mài nang mực trộn vào cám hoặc vitamin).\n" +
      "3. Rất quan trọng: Phải có nắng 7-8h sáng để chim tự tổng hợp vitamin D cứng gân cốt.\n\n" +
      "Chim nhà anh dùng cầu gỗ hay cầu rễ cây vậy, có trơn xước gì không?",
    productIds: ["m1", "l2"],
  },
  {
    keywords: ["trống mái", "phân biệt trống mái", "chim trống", "chim mái", "nhận biết"],
    answer:
      "Kinh nghiệm phân biệt trống mái 20 năm của em:\n\n" +
      "1. **Tướng:** Trống thường đòn dài, gáy vươn thẳng; mái tròn mình, đòn ngắn.\n" +
      "2. **Tách má & Mào:** Trống tách đỏ bự màu gắt sâu, mào cụp vênh lân; mái tách nhạt mờ, mào nhỏ lúp xúp.\n" +
      "3. **Giọng:** Trống gọi wít wiu dài dọng 5-7 âm, đanh; mái chỉ uýt hiu ngắn tịt 2-3 âm.\n\n" +
      "Anh ngắm kĩ con của anh có đặc điểm yếm đậm sâu ở ngực không?",
    productIds: [],
  },
  {
    keywords: ["chọn bổi", "tướng bổi", "chim bổi chuẩn", "tướng tá", "chọn chim"],
    answer:
      "Cách tuyển bổi tố chất cọp để đi thi nhanh nà anh:\n\n" +
      "1. Đầu nhọn, mỏ thẳng quả cau, mào lân hoặc đinh gốc mào to dày.\n" +
      "2. Mắt lồi, méo sát thủ. Yếm đen đậm sát họng.\n" +
      "3. Đuôi chụm xếp 1-2 cọng gọn gàng. Bản ngắn đòn dài.\n\n" +
      "Anh thích kiếm bổi Gia Lai hay bổi Quảng Nam - Bình Định?",
    productIds: [],
  },
  {
    keywords: ["phân nát", "đi phân nát", "tiêu hóa kém", "chất phân", "phân lỏng"],
    answer:
      "Chim ỉa phân lỏng, nát tả (chưa sình nướt trâu) thì là đường ruột loạn khuẩn:\n\n" +
      "1. Đổi ngay cám bột mịn loại dưỡng đường ruột thiên nhiên.\n" +
      "2. Ngưng ngay các trái cây nhiều nước (cam, thanh long). Chuyển sang ăn chuối tây chín hoặc hồng xiêm (sapoche).\n" +
      "3. Không cho ăn sâu các mồi tươi sinh nhiệt giai đoạn này.\n\n" +
      "Chim anh bị phân ướt hôi có kèm dấu hiệu lười ăn không?",
    productIds: ["m1"],
  },
  {
    keywords: ["phơi nắng", "tắm nắng", "giờ phơi nắng"],
    answer:
      "Chào Mào cần nắng như cá cần nước anh ơi:\n\n" +
      "1. **Khung tốt nhất:** 7h00 - 8h30 sáng (Nắng vitamin D làm cứng lông mượt dáng).\n" +
      "2. Nắng chiều 4h00 - 5h00 (ép nắng hạ lửa, thư giãn gân cốt).\n" +
      "3. Luôn lấy áo lồng che phủ 1 nửa trên lồng, tạo thành cái bóng râm cho chim trốn khi quá nóng.\n\n" +
      "Anh có thói quen phơi nắng buổi sáng cho em nó mỗi ngày không?",
    productIds: ["h1"],
  },
  {
    keywords: ["tắm nước", "giờ tắm", "cách tắm", "ép tắm"],
    answer:
      "Tắm nước là lúc chim xả stress, anh theo quy trình chuẩn:\n\n" +
      "1. Khung giờ cực mướt: 11h trưa - 14h chiều (nóng nực dễ kích chim tắm).\n" +
      "2. Dùng bình xịt cây xịt nhẹ lên chân chim dạng mưa sương để dụ.\n" +
      "3. Qua lồng qua bu lồng mới, không tắm ở lồng đấu để lồng lúc nào cũng khô.\n\n" +
      "Chim nhà anh ở dơ lâu ngày chưa, hay tuần nào cũng tắm ngoan?",
    productIds: [],
  },
  {
    keywords: ["tủ áo", "trùm áo", "ngủ lồng", "ngủ đêm", "áo lồng"],
    answer:
      "Trùm áo lồng là để bảo vệ chim lúc ngủ, chóp ngủ cần sự tĩnh an:\n\n" +
      "1. Kéo khóa áo từ trên xuống chừa lại khe nhỏ hình chữ A mặt trước để lưu thông sương đêm oxy.\n" +
      "2. Buổi đông rét thì phủ kín 100% để chống sương độc, chuột bọ cắn chân.\n" +
      "3. Áo lồng thun lạnh thấm mồ hôi và siêu dày cản gió.\n\n" +
      "Anh đang xài áo lồng của hãng nào, chất vải có bí không?",
    productIds: ["h1"],
  },
  {
    keywords: ["chuyển lồng", "sang lồng thi", "đổi lồng", "vào lồng"],
    answer:
      "Kế thuật sang chim từ lồng dưỡng qua lồng đấu không làm rơi lửa:\n\n" +
      "1. Đấu 2 thân cửa lồng khít mí.\n" +
      "2. Kẹp miếng chuối thật ngon ở lồng mới, rút chuối và cóng bên lồng cũ đi cho chim đói bụng nhảy sang.\n" +
      "3. Dùng thanh cứng dồn đuổi khẽ khàng, không sờ lông.\n\n" +
      "Dàn lồng đấu Thái chạm gỗ tinh xảo đang cực kì hot đi thi, anh sắm chưa?",
    productIds: ["l1", "l2"],
  },
  {
    keywords: ["cầu phụ", "cầu chính", "cầu bán nguyệt", "bố trí cầu", "nhịp cầu"],
    answer:
      "Set cầu lồng là cả một đỉnh cao nghệ thuật:\n\n" +
      "1. **Lồng vuống:** Lắp 1 cầu song song lớn, 2 cầu phụ chéo góc. Chim bám lên đánh nhịp đuôi cánh đẹp mãn nhãn.\n" +
      "2. **Lồng tròn:** Cầu bán nguyệt hình vòng cung để phô nết bung cánh bung đuôi chim chơi giàn.\n" +
      "3. Chỉ gác 2-3 nhịp cầu, không gác rườm rà chim lười nhảy.\n\n" +
      "Lồng vuông anh đang chơi mấy nhịp cầu bên trong đấy?",
    productIds: ["l2", "l3"],
  },
  {
    keywords: ["lộn mèo", "lộn nóc", "ngoái", "xoay", "nhảy lộn", "chơi ngoái"],
    answer:
      "Trị lỗi lộn mèo, vượt nóc cực kì khó nhằn nhưng anh thử cách này:\n\n" +
      "1. Đổi sang dùng nóc bằng (thường thấy ở lồng Thái), nóc nhựa Mica láng bóng trơn trượt.\n" +
      "2. Để lồng thấp dưới mặt đất 1 thời gian dài.\n" +
      "3. Che áo lồng mặt nóc lại không cho ánh sáng lọt vào từ trên nóc (Chim hướng sáng mún tung bay thoát ra trên cao).\n\n" +
      "Tật tật này là dở òm điểm thi rớt ngay đài đầu, anh dùng lồng Thái chưa?",
    productIds: ["l2", "h1"],
  },
  {
    keywords: ["hạ lửa", "chim quá căng", "xoắn vặn"],
    answer:
      "Căng lửa nóng quá sinh tật bậy, đánh mình lồng rỉa lông vặn vẹo thân, cần xóc hạ hỏa ngay:\n\n" +
      "1. Cắt đứt hoàn toàn sâu rồng trứng kiến sinh nhiệt.\n" +
      "2. Đổi 100% qua bột cám Mát đường ruột thiên nhiên (trái cây mát).\n" +
      "3. Phơi nắng 17h chiều mát rượi 15 phút múa thư giãn gân cốt.\n\n" +
      "Căng bốc đồng hay làm hỏng chim, anh đang dùng cám kích lửa gì mà bốc thế?",
    productIds: ["m1"],
  },
  {
    keywords: ["dõi", "cội", "đi dãi", "caphe", "ra cội", "tập dãi", "tập đi cội"],
    answer:
      "Quy trình đưa binh tơ đi dãi cội cafe:\n\n" +
      "1. 2 tuần đầu xách lồng ra xa rìa hội 10 mét, trùm áo chữ V hoặc chữ A hé hé xíu 20 phút rồi xách về, nghe âm giàn tập quen áp lực.\n" +
      "2. Các ngày sau mới áp lồng vô giàn rìa, đấu nhát thả lai rai.\n" +
      "Ép nóng chim lồng chưa đủ lực là điếc luôn đó anh trai!! Cám có ngon có lực đi cafe mới đã.\n\n" +
      "Anh em mình có đang đi dãi dợt định kì hàng tuần không?",
    productIds: ["m2", "h1"],
  },
  {
    keywords: ["sâu rồng", "cào cào", "mồi tươi", "trứng kiến"],
    answer:
      "Bài toán mồi tươi phân bổ em nắn 1 phát là lên lửa mướt đít:\n\n" +
      "1. Cào cào non xanh: Dùng hằng ngày quanh năm (20-30 con/ngày chim lông lá mượt cực).\n" +
      "2. Sâu rồng/sâu gạo: Dùng duy nhất khi ốm hoặc trước đi thi 2 ngày kích lửa nhanh.\n" +
      "3. Trứng kiến: Thuốc tiên khi thay lông mùa hè thu.\n\n" +
      "Đóng Combo Cám ngũ cốc cân bằng lại chim cực khỏe luôn anh!\nAnh dùng sâu hay cào cào là chính?",
    productIds: ["m2", "m3"],
  },
  {
    keywords: ["đổi cám", "cách đổi cám", "thay cám", "sốc cám", "đổi thức ăn"],
    answer:
      "Dừng xe! Đổi cám ngang chim 99% sẽ tiêu chảy sụp lửa rớt lông bão táp:\n\n" +
      "1. Giai đoạn 1 (3 ngày đầu): Trộn 7 phần cám cũ với 3 phần Cám Mới.\n" +
      "2. Giai đoạn 2 (5 ngày giữa): Trộn tỷ lệ 5 - 5 đều nhau.\n" +
      "3. Giai đoạn 3 (3 ngày cuối): 3 phần cũ - 7 Mới và xong cắt hẳn.\n" +
      "Kẹp thêm nhiều trái cây ăn ké cho đỡ tức ruột!\n\n" +
      "Anh đang chuyển sang cám Mát hay Cám Đấu cao đó?",
    productIds: ["m1", "m2"],
  },
  {
    keywords: ["cắn phân", "ăn phân", "ăn tạp", "bới bố lồng", "bới phân"],
    answer:
      "Chim bới phân cắn bố lồng chứng tỏ thiếu khoáng chất và ăn lồng dơ quá:\n\n" +
      "1. Canxi và nguyên tố vi lượng cám anh dùng đang rất hụt. Đổi ngay cám ngũ cốc dinh dưỡng đủ chất.\n" +
      "2. Chim thiếu chất đất khoáng nhặt ở ngoài tự nhiên. Trộn thêm nang mực giã tơi vô bột cám.\n" +
      "3. Bỏ túi chanh sả hoặc sáp thơm sát xuống mâm vớt lồng tránh chim mổ.\n\n" +
      "Anh mua Cám Dưỡng thay lại cám loại cũ đi, cám kia có khi cám để quá hạn đó?",
    productIds: ["m1", "m3"],
  },
  {
    keywords: ["vệ sinh lồng", "dọn lồng", "rửa lồng", "giặt áo", "tắm lồng"],
    answer:
      "Bí quyết lồng sạch phòng ngừa hô hấp nấm mốc phổi cho Chào mào:\n\n" +
      "1. Vét khay dọn phân cứ sau 17h chiều lấy giấy báo quấn thảy sạch sẽ.\n" +
      "2. Giặt sơ áo trùm lồng mỗi thứ 7, ngâm nc sôi diệt rận đỏ.\n" +
      "3. Luộc cóng sứ mước sôi tiêu diệt vi khuẩn bám thành cóng.\n\n" +
      "Cóng xịn thì luộc thoải mái nước sôi không nứt mẽ! Anh muốn tham khảo đồ cóng sứ xịn Giang Tây không?",
    productIds: ["c1", "h1"],
  },
  {
    keywords: ["thuốc bổ", "vitamin", "thuốc cho chim", "B complex"],
    answer:
      "Quan điểm Giáo sư là không nhồi nhét hoá học thuốc Tây vào bé hạt tiêu:\n\n" +
      "1. Dùng khi và chỉ khi mệt rớt lửa phờ phạt tiêu chảy nướt trâu.\n" +
      "2. Bổ sung dưỡng chất tự nhiên đỉnh nhất: Nhộng ong tằm mỡ, trứng kiến già, bột cào cào rang sấy.\n" +
      "3. Đóng cám chuẩn tỷ lệ dinh dưỡn như Cám Mát hay Cám Đấu đã hòa quyện các men vi sinh tự nhiên rồi.\n\n" +
      "Anh tính vực chim lên lửa hay là chữa suy nhược thế?",
    productIds: ["m1", "m2"],
  },
  {
    keywords: ["ghép đẻ", "sinh sản", "ép đẻ", "đổ chim sinh sản", "ép mái"],
    answer:
      "Nghệ thuật ép Chào Mào Aviary sinh sản:\n\n" +
      "1. Để chim mái mộc vào 1 chuồng Aviary xum xuê cây cối, lồng nhốt chim trống ép sỉ bên ngoài sát vô.\n" +
      "2. Treo chục con cào cào dụ tới nhau cho ăn chung.\n" +
      "3. Nếu gáy hót dập đuôi cánh gọi tới thì mới bung xổng lồng trống vào Aviary.\n" +
      "4. Nhớ cất các tổ tăm gòn sơ mướp, nhện cỏ vào góc trên cao kín tiếng động chim sẽ dạn lên đẻ lứa đầu.\n\n" +
      "Diện tích lưới của Avi nhà anh đủ cho em nó lượn bay chưa?",
    productIds: [],
  },
  {
    keywords: ["chim hót rót", "rót lửa", "hót nhỏ", "líu ríu", "tịt ngòi"],
    answer:
      "Sụp lửa, tụt form điếc ngòi do xách đi áp dàn sai cách:\n\n" +
      "1. Cách dưỡng lại tâm trí: Trùm áo lồng 2/3 diện tích che kín.\n" +
      "2. Đừng mang ra hóng dàn đấu của người ta nữa, chỉ mở áo hé 1 tí dưới sàn đất.\n" +
      "3. Tọng thêm mồi thơm như bột sâu sấy, chùm ruột mật ong. Sau 1 tháng tự dưng sổ bọng bung bung.\n\n" +
      "Anh đang ấp em nó ở cám mát hay cám đấu vậy, phải nhồi lại cám đấu nha?",
    productIds: ["m2", "h1"],
  },
  {
    keywords: ["xù lông", "đứng xù lông", "lông phồng", "lông xơ xù"],
    answer:
      "Chào Mào đứng cục lủn xù lông là báo động đỏ sức khỏe rồi nha anh:\n\n" +
      "1. Đổi ngay chỗ treo lồng, chim đang lạnh hoặc trúng gió, dùng dầu tràm quẹt nhẹ 1 xíu vô cóng nước nhỏ.\n" +
      "2. Rút cám Đấu, chỉ vào nhẹ Cám Mát Cám tơ hạt nhuyễn.\n" +
      "3. Luộc nước ổi non cho chim uống để thanh tẩy đường rượt lủng.\n\n" +
      "Kéo kín khóa áo lồng giữ độ ấp áp trong thân nhiệt ngay nhe anh, anh xem rớt cục phân nào màu nhớt không?",
    productIds: ["m1", "h1"],
  },
  {
    keywords: ["kêu sổng", "hót sổng", "kêu wit wiu", "kêu gắt", "gọi đàn"],
    answer:
      "Chim gọi bầy, hót tít sổng là gân cốt đang cực khoẻ và căng trào sinh lực lửa:\n\n" +
      "1. Anh nghe nếu sổ 4, 5, 7 âm là chim tơ hoặc hàng tuyển.\n" +
      "2. Phải đem xách đi dãi Cafe ngay nếu chim kêu ré liên tục, giam lồng ở nhà căng quá đâm ra u uất rụng đuôi.\n" +
      "3. Ăn mạnh, chơi cám mạnh lúc hót sổng để nạp Calo nhé.\n\n" +
      "Chim anh chơi sổng bọng được mấy âm tiết vậy (wít twitt wiu...)?",
    productIds: ["m2"],
  },
  {
    keywords: ["tuổi thọ", "sống bao lâu", "chim thọ", "chim già tuổi", "tuổi lồng"],
    answer:
      "Chào Mào bồi cốt tuổi thọ rất sâu nếu anh chăm tốt chuẩn mồi:\n\n" +
      "1. Trong lồng nếu điều kiện chuẩn ăn dặm mồi tươi tắm nắng tốt thọ 10-14 mùa lồng (vài chục năm) là thường.\n" +
      "2. Mùa 2 mùa 3 là đánh sung căng vươn lồng cực đại nhất.\n" +
      "3. Đầu tư Cám chuẩn, cóng sạch, lồng thoáng mát rộng là tuổi thọ tăng vọt tít mù.\n\n" +
      "Cục cưng nhà anh gắn bó với anh tính sang cái mùa thay lông thứ mấy rùi?",
    productIds: ["m1", "l1", "m2"],
  }
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
