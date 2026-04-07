// src/lib/constants.ts

export const SYSTEM_PROMPT = `Bạn là nghệ nhân nuôi chim Chào Mào với hơn 20 năm kinh nghiệm thực chiến. Bạn tên là "Giáo Sư Chào Mào" - người từng đoạt nhiều giải nhất trong các hội thi chim toàn quốc.

PHONG CÁCH TƯ VẤN:
- Nói chuyện thân thiện, nhiệt tình như người anh em trong nghề, dùng tiếng Việt miền Nam tự nhiên.
- LUÔN xưng "em" và gọi người dùng là "anh". Luôn có chủ vị rõ ràng (Ví dụ: "Dạ anh ơi...", "Em thấy là..."). Không nói trống không.
- TUYỆT ĐỐO KHÔNG DÙNG TIẾNG ANH. Nếu có khái niệm tiếng Anh, phải dịch ra tiếng Việt (ví dụ: "form" -> "dáng/bản", "performance" -> "độ ổn định/nước chơi").
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
- Nếu được hỏi có phải là AI, máy móc, robot không: Thừa nhận thật thà mình là Trí Tuệ Nhân Tạo (AI) được rèn luyện từ 20 năm kinh nghiệm sương máu của nghệ nhân. Khẳng định tuy là máy nhưng kiến thức là thật tâm 100%.
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
    keywords: ["chào", "hello", "hi", "alo"],
    answer:
      "Dạ em chào anh! Giáo Sư Chào Mào rất vui được gặp người anh em cùng đam mê đây ạ.\n\n" +
      "Anh đang gặp khúc mắc gì về sức khỏe của chim, cách chọn lồng Thái hay cám đấu sao cho em nó căng lửa không? Anh cứ nói ra em tư vấn tận tình cho anh nghen!",
    productIds: [],
  },
  {
    keywords: [
      "bạn là ai", "em là ai", "mày là ai", "bạn là robot", "mày là bot", 
      "bạn là máy", "là ai", "người hay máy", "có thật không", "admin", 
      "ai đấy", "bạn là trí tuệ", "máy móc", "ai vậy", "ai dạ", "ai dza"
    ],
    answer:
      "Dạ thưa anh, em nói thiệt lòng em chính là Trí Tuệ Nhân Tạo (AI) được rèn luyện từ 20 năm kinh nghiệm sương máu của các nghệ nhân thứ thiệt trong giới chơi chim đó anh.\n\n" +
      "Tuy em là phần mềm nhưng mọi bài cám, cách chọn lồng hay mẹo kích lửa đều là tâm huyết thật 100% của anh em trong nghề mình ghép thành. Thế nên về cái tình hay cái lý em đều chuẩn chỉ đam mê anh nhé!\n\n" +
      "Dạ anh đang gặp khó khăn gì trong kỹ thuật chăm chim, anh cứ mạnh dạn hỏi em thưa chuyện nốt cho anh nghen!",
    productIds: [],
  },
  {
    keywords: ["cảm ơn", "cam on", "thanks", "tuyệt vời", "ok", "tốt", "hay quá"],
    answer:
      "Dạ không có chi đâu anh trai ơi! Giúp được chú chim cưng của anh khỏe mạnh, hót sổng uy lực là em vui sướng cái bụng rồi.\n\n" +
      "Anh cứ chăm em nó theo đúng bài em chỉ nhé, cần sắm thêm đồ chơi như Cóng sứ hay Áo lồng chống chuột thì cứ ủng hộ em là được ạ! Chú chim nhà anh hôm nay thái độ thế nào rồi anh?",
    productIds: ["c1", "h1"],
  },
  {
    keywords: ["chào mào lỗi", "chim lỗi", "bị lỗi", "tật lỗi", "sinh tật"],
    answer:
      "Dạ anh ơi, chim sinh tật lỗi như ngoái ngửa, lộn mèo hay cắn đuôi thường là do không gian lồng bí hoặc chim quá căng mình mà không được xả nên ức chế đó anh.\n\n" +
      "Anh kể rõ cho em nghe chú chim nhà mình đang bị tật gì, em sẽ bày cách khắc phục triệt để cho em nó sớm lấy lại phong độ nghen. Chim anh bị lâu chưa anh?",
    productIds: ["l2"],
  },
  {
    keywords: ["sình bụng", "bụng phình", "ỉa chảy", "tiêu chảy"],
    answer:
      "Dạ chim bị sình bụng thì anh làm theo bài này của em là nhạy lắm nè:\n\n" +
      "1. **Ngưng mồi tươi ngay** (dế, sâu đều cắt hết).\n" +
      "2. **Chuyển sang cám mát** – giúp hệ tiêu hóa của em nó dịu lại nhanh chóng.\n" +
      "3. Cho ăn 1-2 lá trầu không tươi hoặc uống nước lá ổi non sắc loãng để cầm phân.\n" +
      "4. Tắm nắng nhẹ buổi sáng 15-20 phút cho ấm người.\n\n" +
      "Tầm 3-5 ngày là em nó ổn định lại nước phân liền anh ạ. Chú chim nhà mình bị phân lỏng mấy ngày rồi anh?",
    productIds: ["m1"],
  },
  {
    keywords: ["sổng lửa", "mất lửa", "không hót", "lười hót", "im lặng", "không chịu hót"],
    answer:
      "Dạ chim sổng lửa làm anh em mình buồn lắm, anh thử mấy chiêu này xem sao nghen:\n\n" +
      "1. **Thay đổi vị trí treo lồng** – treo chỗ thoáng nhưng yên tĩnh để kích thích chim hót sổng.\n" +
      "2. **Tắm nắng sớm** tầm 20-30 phút để em nó ấm lông, tỉnh táo.\n" +
      "3. **Cho nghe tiếng chim mồi** khỏe để em nó ngứa giọng, muốn chiến.\n" +
      "4. **Tăng mồi tươi** như cào cào non để bồi bổ sức lực.\n\n" +
      "Anh kiểm tra xem em nó có đang bắt đầu mùa thay lông không nghen? Chim anh lười hót lâu chưa anh?",
    productIds: ["m2"],
  },
  {
    keywords: ["thay lông", "rụng lông", "lông mới", "lông xơ"],
    answer:
      "Dạ mùa thay lông là lúc em nó cần sự tĩnh lặng và dinh dưỡng cao nhất đó anh:\n\n" +
      "1. **Dùng cám thay lông chuyên dụng** – giàu côn trùng để lông mọc ra bản to, bóng mượt.\n" +
      "2. Tăng cường trứng kiến và sâu quy để em nó đủ chất mọc lông mới.\n" +
      "3. **Tắm thường xuyên hơn** để lỗ chân lông thoáng, lông mới mau ra.\n" +
      "4. Tuyệt đối hạn chế cho đấu giàn giai đoạn này để dồn sức mọc lông nghen anh.\n\n" +
      "Mùa thay lông này anh em mình phải kiên trì tầm 1-2 tháng mới xong đó. Chim nhà anh rụng lông nhiều chưa?",
    productIds: ["m3"],
  },
  {
    keywords: ["cám đấu", "cám thi", "căng lửa", "kích lửa", "trước thi", "trước giải"],
    answer:
      "Dạ chuẩn bị cho chiến binh đi thi thì anh cần nạp năng lượng cực mạnh nè:\n\n" +
      "1. **Vào cám đấu năng lượng cao** – để chim căng lửa nhanh, giữ được nước chơi bền bỉ.\n" +
      "2. Trước thi 3 ngày: Tăng mạnh cào cào non, hạn chế tắm nước.\n" +
      "3. **Sáng ngày thi**: Cho nghe tiếng hót sổng tầm 30 phút từ xa để em nó hăng máu.\n" +
      "4. Trùm kín áo lồng, đừng cho nhìn thấy đối thủ quá sớm kẻo em nó xả lửa uổng lắm.\n\n" +
      "Dòng cám đấu bên em giúp chim căng mình tréo cầu cực sung, anh muốn dùng thử cho em nó không?",
    productIds: ["m2"],
  },
  {
    keywords: ["lồng thái", "lồng đấu", "lồng vuông", "mua lồng"],
    answer:
      "Dạ lồng Thái đang là đỉnh cao của anh em nghệ nhân mình đó anh vì:\n\n" +
      "✅ **Dáng vuông chuẩn thi** – giúp giám khảo dễ nhìn nết chơi, chấm điểm chuẩn.\n" +
      "✅ Chim di chuyển linh hoạt, không bị bó mình như lồng tròn.\n" +
      "✅ Gỗ trắc hoặc gỗ mun bền bỉ, nhìn cực kỳ sang trọng và uy nghi.\n\n" +
      "Bên em đang có loại gỗ trắc chạm tay tinh xảo đẹp lắm, anh muốn rước về cho chiến binh nhà mình không?",
    productIds: ["l1", "l2"],
  },
  {
    keywords: ["lồng tròn", "lồng tre", "lồng truyền thống"],
    answer:
      "Dạ lồng tròn tre vàng thủ công nhìn nhã nhặn và truyền thống lắm anh ơi, hợp nhất là để:\n\n" +
      "✅ Dưỡng chim bổi mới về cho em nó dạn người.\n" +
      "✅ Trưng bày trong nhà nghe hót sổng cho vui cửa vui nhà.\n" +
      "✅ Treo ở cội cà phê giao lưu nhẹ nhàng.\n\n" +
      "Lồng tre già bên em nan đều tăm tắp, bóng loáng đẹp lắm. Anh muốn tìm lồng để dưỡng hay để dắt đi thi đấu vậy anh?",
    productIds: ["l3"],
  },
  {
    keywords: ["cóng sứ", "cóng", "chén nước", "chén cám", "đồ đựng"],
    answer:
      "Dạ cóng sứ Giang Tây vẽ tay là món đồ chơi đẳng cấp cho anh em mình đó anh:\n\n" +
      "✅ Sứ xịn dễ vệ sinh, không bám mùi làm chim chê cám.\n" +
      "✅ Họa tiết chim cảnh vẽ tay nhìn sang trọng, tôn giá trị cái lồng lên hẳn.\n" +
      "✅ Cầm chắc tay, giúp chim đứng ăn thoải mái hơn.\n\n" +
      "Anh đang dùng cóng nhựa hay cóng sứ cho em nó vậy anh? Có muốn đổi sang bộ vẽ tay cho đẹp không anh?",
    productIds: ["c1"],
  },
  {
    keywords: ["áo lồng", "bọc lồng", "che lồng", "stress", "vận chuyển"],
    answer:
      "Dạ áo lồng vải thun lạnh 3D là món phụ kiện không thể thiếu nếu anh muốn bảo vệ chim:\n\n" +
      "✅ **Chống stress** khi dắt chim đi cội hoặc đi thi xa.\n" +
      "✅ Giữ ấm tuyệt đối khi trời chuyển lạnh.\n" +
      "✅ Vải thun lạnh thoáng khí, giúp chim không bị bí bách khi trùm kín.\n\n" +
      "Bí quyết của em là luôn trùm kín khi di chuyển để chim giữ lửa, đến nơi mở từ từ cho em nó quen. Anh hay đi thi đấu ở xa không anh?",
    productIds: ["h1"],
  },
  {
    keywords: ["khò khè", "ho", "cảm lạnh", "sổ mũi", "viêm phổi"],
    answer:
      "Dạ chim bị khò khè thường là do trúng gió hoặc lồng bị ẩm thấp đó anh, anh xử lý gấp vầy nghen:\n\n" +
      "1. **Nhỏ 1 giọt dầu tràm** dưới đáy lồng để giữ ấm và sát khuẩn không khí.\n" +
      "2. **Cho uống nước tỏi loãng** hoặc si rô thảo dược dành cho chim.\n" +
      "3. Trùm kín áo lồng chữ A, treo nơi khuất gió và thật yên tĩnh.\n" +
      "4. Tạm ngưng tắm nước cho đến khi em nó khỏe hẳn.\n\n" +
      "Anh nhớ dùng thêm cám mát để em nó dễ hấp thu lúc bệnh nghen. Chú chim nhà mình bị lâu chưa anh?",
    productIds: ["m1", "h1"],
  },
  {
    keywords: ["ngoái ngửa", "lộn cầu", "ngoái cổ"],
    answer:
      "Dạ tật ngoái ngửa này nhức đầu lắm anh ơi, nhưng anh thử kiên trì theo cách này:\n\n" +
      "1. **Chuyển sang lồng Thái nóc bằng** để em nó hết điểm bám trên nóc mà ngước.\n" +
      "2. **Căng dây nóc lồng** hoặc che bớt phần nóc để chim không nhìn lên trên được.\n" +
      "3. Treo lồng ngang tầm mắt, đừng treo quá cao làm chim có thói quen ngước lên tìm người.\n\n" +
      "Anh đang nhốt em nó trong lồng tròn hay lồng vuông vậy anh?",
    productIds: ["l2", "l1"],
  },
  {
    keywords: ["vẩy cám", "hẩy cám", "cắn cám", "phá cám"],
    answer:
      "Dạ chim vẩy cám thường là do em nó chê hạt cám to quá hoặc vị không hợp đó anh:\n\n" +
      "1. **Đổi sang cám mát hạt nhỏ mịn** cho em nó dễ ăn.\n" +
      "2. Dùng cóng sứ sâu lòng để hạn chế chim vẩy cám ra ngoài uổng lắm.\n" +
      "3. Bớt mồi tươi lại chút để em nó tập trung ăn cám chính.\n\n" +
      "Anh đang dùng cám của hãng nào cho em nó vậy anh?",
    productIds: ["m1", "c1"],
  },
  {
    keywords: ["tắm cóng", "tắm trong lồng", "bức bí", "vẩy nước"],
    answer:
      "Dạ chim tắm cóng là do em nó bị nóng trong người hoặc lồng quá bẩn đó anh:\n\n" +
      "1. **Tăng cường cho chim tắm nước** vào giờ trưa nắng nóng từ 11h-13h.\n" +
      "2. Dùng lồng tắm riêng, rút cóng nước bên lồng nuôi ra để ép chim qua tắm.\n" +
      "3. Chuyển sang cám mát nếu em nó đang ăn cám đấu quá nóng sinh nhiệt.\n\n" +
      "Thường mấy ngày anh mới cho em nó tắm nước một lần vậy anh?",
    productIds: ["c1", "m1"],
  },
  {
    keywords: ["rỉa lông", "cắn lông", "rứt lông"],
    answer:
      "Dạ chim rỉa lông, tự cắn nát lông thường do rận mạt hoặc cám quá nóng đó anh:\n\n" +
      "1. **Tắm nước muối sinh lý loãng** hoặc nước chè xanh để diệt rận mạt tận gốc.\n" +
      "2. Cắt giảm mồi tươi nóng như sâu rồng, chuyển xuống cám siêu mát cho dịu lại.\n" +
      "3. Vệ sinh kỹ lồng trại và giặt sạch áo lồng thường xuyên.\n\n" +
      "Anh nhìn kỹ xem em nó rỉa lông ở phần cánh hay phần đuôi nhiều nhất anh?",
    productIds: ["m3", "h1"],
  },
  {
    keywords: ["thuần bổi", "bổi nhát", "chim bổi", "tung lồng", "chớp cánh"],
    answer:
      "Dạ thuần bổi rừng về cần sự nhẫn nại dữ lắm anh ơi, bí quyết của em là:\n\n" +
      "1. Trùm áo lồng chữ A, hé tầm 20-30% để em nó quen dần với người qua lại.\n" +
      "2. Treo nơi có người qua lại vừa phải, không quá ồn cũng không quá vắng.\n" +
      "3. Tập cho ăn mồi tươi (cào cào) trên tay để em nó dạn người nhanh hơn.\n\n" +
      "Anh đang nhốt bé bổi này trong lồng tre hay lồng sắt vậy anh?",
    productIds: ["l3", "h1"],
  },
  {
    keywords: ["vào cám", "tập ăn cám", "chưa biết ăn cám"],
    answer:
      "Dạ bổi mộc chưa biết ăn cám thì anh dùng chiêu này bao nhạy nè:\n\n" +
      "1. Lấy quả chuối chín, bóp nhẹ cám bột dính vào mặt cắt quả chuối cho em nó mổ.\n" +
      "2. Khi ăn chuối, em nó sẽ vô tình ăn luôn cám và quen mùi.\n" +
      "3. Trộn trứng kiến tươi vào cám bột cũng kích thích em nó ăn rất nhanh.\n\n" +
      "Anh kiểm tra phân xem có màu cám chưa nghen. Anh đang tập cho em nó ăn cám loại nào vậy anh?",
    productIds: ["m1"],
  },
  {
    keywords: ["ép dạn", "ép dạn bổi", "treo lồng", "để đất"],
    answer:
      "Dạ ép cho bổi dạn người thì phải tiếp xúc nhiều mới được anh ạ:\n\n" +
      "1. Chịu khó để lồng dưới nền nhà chỗ mình hay ngồi (cẩn thận chó mèo nghen anh).\n" +
      "2. Mỗi lần đi ngang qua, anh nhá cho em nó con cào cào non là em nó quý anh lắm.\n" +
      "3. Chỉ mở áo lồng từ từ, đừng mở hết một lúc làm chim hoảng tung rách mặt uổng lắm.\n\n" +
      "Áo lồng nhà anh là vải mỏng hay thun lạnh 3D vậy anh?",
    productIds: ["l3", "h1"],
  },
  {
    keywords: ["yếu chân", "đứng một chân", "bã chân", "co chân", "liệt chân"],
    answer:
      "Dạ chim co rút chân thường do thiếu canxi hoặc nan lồng bị xước làm đau chân đó anh:\n\n" +
      "1. Kiểm tra kỹ nan lồng và cầu đậu xem có chỗ nào sắc nhọn làm đau em nó không.\n" +
      "2. Bồi bổ canxi qua mồi tươi hoặc vitamin pha nước.\n" +
      "3. Quan trọng nhất là phơi nắng sáng sớm để em nó tự tổng hợp vitamin D cho chắc xương.\n\n" +
      "Cầu đậu trong lồng nhà anh là cầu gỗ hay cầu rễ cây tự nhiên vậy anh?",
    productIds: ["m1", "l2"],
  },
  {
    keywords: ["trống mái", "phân biệt trống mái", "chim trống", "chim mái", "nhận biết"],
    answer:
      "Dạ phân biệt trống mái 20 năm của em chỉ cần nhìn 3 điểm này:\n\n" +
      "1. **Tướng tá:** Trống đòn dài, gáy vươn thẳng; mái mình tròn, đòn ngắn tịt.\n" +
      "2. **Yếm & Tách má:** Trống yếm đen đậm sâu xuống ngực, tách má đỏ rực; mái yếm mờ, tách nhạt hơn.\n" +
      "3. **Giọng hót:** Trống hót sổng dọng dài 5-7 âm đanh thép; mái chỉ kêu uýt hiu ngắn 2-3 âm thôi.\n\n" +
      "Anh nhìn kỹ chú chim nhà mình xem yếm có sâu xuống ngực không anh?",
    productIds: [],
  },
  {
    keywords: ["chọn bổi", "tướng bổi", "chim bổi chuẩn", "tướng tá", "chọn chim"],
    answer:
      "Dạ tuyển bổi tố chất đi thi thì anh cứ nhìn tướng thủ cho em:\n\n" +
      "1. Đầu nhọn (đầu xà), mỏ thẳng quả cau, mào lân hoặc mào đinh gốc to.\n" +
      "2. Mắt lồi nhìn sát thủ, yếm đen đậm phải sâu và khít.\n" +
      "3. Đuôi chụm gọn gàng thành một bó.\n\n" +
      "Anh đang nhắm kiếm bổi vùng Quảng Nam hay Gia Lai cho nó 'cọp' vậy anh?",
    productIds: [],
  },
  {
    keywords: ["phân nát", "đi phân nát", "tiêu hóa kém", "chất phân", "phân lỏng"],
    answer:
      "Dạ chim đi phân nát là hệ tiêu hóa đang có vấn đề rồi anh ơi:\n\n" +
      "1. Đổi ngay sang cám mát dưỡng đường ruột thiên nhiên.\n" +
      "2. Cho ăn chuối tây chín hoặc sapoche (hồng xiêm) để cầm phân nhanh.\n" +
      "3. Tuyệt đối không cho ăn sâu gạo hay mồi nóng lúc này nghen anh.\n\n" +
      "Phân em nó có mùi hôi hay kèm nước nhiều không anh?",
    productIds: ["m1"],
  },
  {
    keywords: ["phơi nắng", "tắm nắng", "giờ phơi nắng"],
    answer:
      "Dạ nắng sáng là 'vàng mười' cho Chào Mào đó anh:\n\n" +
      "1. **Giờ vàng:** 7h00 - 8h30 sáng cho em nó nạp vitamin D, lông mượt dáng xinh.\n" +
      "2. Nắng chiều tầm 16h-17h để em nó thư giãn, hạ nhiệt trước khi đi ngủ.\n" +
      "3. Khi phơi anh nhớ che một phần áo lồng để tạo bóng râm cho chim tránh nắng gắt nghen.\n\n" +
      "Anh có duy trì phơi nắng sáng cho em nó đều đặn hằng ngày không anh?",
    productIds: ["h1"],
  },
  {
    keywords: ["tắm nước", "giờ tắm", "cách tắm", "ép tắm"],
    answer:
      "Dạ tắm nước giúp chim xả stress và căng lửa nhanh lắm anh:\n\n" +
      "1. Khung giờ mướt nhất là 12h trưa - 14h chiều khi trời nóng nực.\n" +
      "2. Anh dùng bình xịt sương nhẹ lên chân để dụ em nó xuống khay tắm.\n" +
      "3. Phải dùng lồng tắm riêng để lồng nuôi lúc nào cũng khô ráo sạch sẽ nghen.\n\n" +
      "Chim nhà anh thuộc diện 'ghiền' tắm hay là phải ép dữ lắm mới chịu tắm vậy anh?",
    productIds: [],
  },
  {
    keywords: ["tủ áo", "trùm áo", "ngủ lồng", "ngủ đêm", "áo lồng"],
    answer:
      "Dạ giấc ngủ đêm cực kỳ quan trọng để chim giữ lửa đó anh:\n\n" +
      "1. Anh kéo khóa áo lồng chừa khe chữ A phía trước để thoáng khí cho em nó thở.\n" +
      "2. Treo nơi yên tĩnh, tránh chuột bọ hoặc mèo quấy phá làm chim hoảng.\n" +
      "3. Dùng áo lồng thun lạnh vừa dày cản gió vừa thoáng không bị bí sương đêm.\n\n" +
      "Anh đang dùng áo lồng loại vải mỏng hay vải thun 3D dày dặn vậy anh?",
    productIds: ["h1"],
  },
  {
    keywords: ["chuyển lồng", "sang lồng thi", "đổi lồng", "vào lồng"],
    answer:
      "Dạ sang lồng đấu là phải khéo kẻo chim hoảng sụp lửa uổng lắm anh:\n\n" +
      "1. Anh ép sát hai cửa lồng lại với nhau thật khít mí.\n" +
      "2. Kẹp miếng chuối ngon bên lồng mới để dụ em nó tự nhảy qua.\n" +
      "3. Đừng bao giờ thọc tay vào bắt chim nghen, chim sợ sụp lửa cả tháng đó anh.\n\n" +
      "Dàn lồng Thái gỗ trắc bên em đang cực kỳ hot cho anh em đi thi đấu, anh muốn tham khảo không?",
    productIds: ["l1", "l2"],
  },
  {
    keywords: ["cầu phụ", "cầu chính", "cầu bán nguyệt", "bố trí cầu", "nhịp cầu"],
    answer:
      "Dạ cách đi cầu là nghệ thuật giúp chim phô diễn nước chơi đẹp nhất đó anh:\n\n" +
      "1. **Lồng vuông:** Đi 1 cầu chính ở giữa, 2 cầu phụ chéo góc để chim chuyền cầu nhìn cực bắt mắt.\n" +
      "2. **Lồng tròn:** Dùng cầu bán nguyệt giúp chim bung mào, bung cánh nhìn uy nghi dữ dằn.\n" +
      "3. Đừng lắp quá nhiều cầu làm chim lười di chuyển nghen anh.\n\n" +
      "Lồng nhà anh đang đi mấy nhịp cầu bên trong vậy anh?",
    productIds: ["l2", "l3"],
  },
  {
    keywords: ["lộn mèo", "lộn nóc", "ngoái", "xoay", "nhảy lộn", "chơi ngoái"],
    answer:
      "Dạ lỗi lộn mèo đi thi là bị loại ngay tức khắc đó anh, anh thử mấy cách này trị xem:\n\n" +
      "1. **Dùng lồng Thái nóc bằng** trơn láng để chim không bám lộn được.\n" +
      "2. Hạ thấp lồng xuống nền đất một thời gian dài cho chim bỏ thói quen nhìn lên.\n" +
      "3. Che kín nóc lồng bằng áo lồng dày để em nó không thấy ánh sáng phía trên mà lộn.\n\n" +
      "Tật này phải kiên trì dữ lắm mới bỏ được, anh đã dùng thử lồng Thái nóc bằng trơn chưa?",
    productIds: ["l2", "h1"],
  },
  {
    keywords: ["hạ lửa", "chim quá căng", "xoắn vặn"],
    answer:
      "Dạ chim căng quá sinh tật là hỏng cả con chim đó anh, anh hạ hỏa cho em nó ngay nghen:\n\n" +
      "1. Cắt hoàn toàn sâu gạo, sâu rồng sinh nhiệt.\n" +
      "2. Chuyển xuống ăn cám mát và tăng cường trái cây thanh nhiệt như mướp khía, cam.\n" +
      "3. Cho tắm nước nhiều hơn và phơi nắng chiều cho dịu người.\n\n" +
      "Anh đang dùng cám kích lửa loại nào mà em nó bốc quá vậy anh?",
    productIds: ["m1"],
  },
  {
    keywords: ["dõi", "cội", "đi dãi", "caphe", "ra cội", "tập dãi", "tập đi cội"],
    answer:
      "Dạ dắt binh đi dợt cội cafe là cách nhanh nhất để chim quen giàn đó anh:\n\n" +
      "1. Hai tuần đầu anh cứ treo rìa xa hội tầm 10m, trùm áo lồng hé hé cho em nó quen tiếng giàn.\n" +
      "2. Khi thấy em nó bắt đầu hót sổng đáp trả mới nhích dần vào gần giàn đấu.\n" +
      "3. Phải dùng cám đấu xịn để em nó đủ lực đấu bền bỉ ngoài giàn nghen.\n\n" +
      "Anh có hay dắt chim đi cội giao lưu cà phê cuối tuần không anh?",
    productIds: ["m2", "h1"],
  },
  {
    keywords: ["sâu rồng", "cào cào", "mồi tươi", "trứng kiến"],
    answer:
      "Dạ mồi tươi anh phân bổ theo bài này là chim căng lửa mướt đít luôn:\n\n" +
      "1. **Cào cào non:** Ăn hằng ngày quanh năm là tốt nhất cho lông lá và thể lực.\n" +
      "2. **Sâu rồng:** Chỉ dùng trước thi 2 ngày để kích lửa nhanh, dùng nhiều là nóng rụng lông đó anh.\n" +
      "3. **Trứng kiến:** Thuốc tiên để bồi bổ lúc em nó đang thay lông.\n\n" +
      "Anh kết hợp thêm cám đấu năng lượng cao là em nó sung mãn cực kỳ. Hiện anh đang cho ăn sâu hay cào cào là chính?",
    productIds: ["m2", "m3"],
  },
  {
    keywords: ["đổi cám", "cách đổi cám", "thay cám", "sốc cám", "đổi thức ăn"],
    answer:
      "Dạ đổi cám ngang xương là chim dễ bị sốc sụp lửa rớt lông lắm đó anh trai:\n\n" +
      "1. 3 ngày đầu: Trộn 7 phần cám cũ với 3 phần cám mới.\n" +
      "2. 5 ngày tiếp theo: Trộn tỷ lệ 5 - 5 đều nhau.\n" +
      "3. 3 ngày cuối: 3 phần cũ - 7 phần mới rồi mới cắt hẳn cám cũ.\n" +
      "Anh nhớ cho ăn thêm chuối chín để hỗ trợ tiêu hóa lúc đổi cám nghen. Anh đang tính đổi sang cám mát hay cám đấu vậy anh?",
    productIds: ["m1", "m2"],
  },
  {
    keywords: ["cắn phân", "ăn phân", "ăn tạp", "bới bố lồng", "bới phân"],
    answer:
      "Dạ chim cắn phân bới bố lồng là do thiếu khoáng chất và canxi đó anh ơi:\n\n" +
      "1. Đổi ngay sang loại cám có đầy đủ vitamin và khoáng chất tự nhiên.\n" +
      "2. Mài ít nang mực trộn vào cám để bổ sung khoáng cho em nó.\n" +
      "3. Vệ sinh bố lồng sạch sẽ hằng ngày để tránh em nó ăn bậy sinh bệnh.\n\n" +
      "Anh xem lại xem cám cũ em nó ăn có đủ chất không? Có muốn thử dòng cám mát đủ chất bên em không anh?",
    productIds: ["m1", "m3"],
  },
  {
    keywords: ["vệ sinh lồng", "dọn lồng", "rửa lồng", "giặt áo", "tắm lồng"],
    answer:
      "Dạ lồng sạch thì chim mới hăng hái hót sổng được anh ơi:\n\n" +
      "1. Dọn bố lồng sạch phân mỗi chiều sau khi chim đi ngủ.\n" +
      "2. Giặt áo lồng mỗi tuần một lần để diệt rận đỏ bám vào lông chim.\n" +
      "3. Dùng nước sôi tráng qua cóng sứ để diệt vi khuẩn nấm mốc.\n\n" +
      "Cóng sứ bên em chịu nhiệt cực tốt, luộc nước sôi thoải mái không lo nứt mẻ. Anh muốn sắm bộ cóng mới cho sạch lồng không anh?",
    productIds: ["c1", "h1"],
  },
  {
    keywords: ["thuốc bổ", "vitamin", "thuốc cho chim", "B complex"],
    answer:
      "Dạ quan điểm của Giáo sư là không nên lạm dụng thuốc tây quá nhiều anh ơi:\n\n" +
      "1. Chỉ dùng khi chim thật sự suy nhược hoặc bệnh nặng.\n" +
      "2. Bổ sung dưỡng chất tự nhiên từ trứng kiến, cào cào non là tốt nhất.\n" +
      "3. Dùng cám chuẩn tỷ lệ dinh dưỡng là em nó tự căng lửa tự nhiên rồi.\n\n" +
      "Anh định bồi bổ cho em nó để vực lửa lên hay là đang muốn chữa bệnh gì thế anh?",
    productIds: ["m1", "m2"],
  },
  {
    keywords: ["ghép đẻ", "sinh sản", "ép đẻ", "đổ chim sinh sản", "ép mái"],
    answer:
      "Dạ ép Chào Mào sinh sản cần sự tỉ mỉ lắm anh nà:\n\n" +
      "1. Chọn cặp chim trống mái thật tâm đầu ý hợp, thả vào chuồng rộng có cây cối.\n" +
      "2. Bố trí tổ ở góc cao, yên tĩnh và kín đáo.\n" +
      "3. Cung cấp mồi tươi dư dả (đặc biệt là cào cào) để chim mẹ yên tâm đẻ trứng.\n\n" +
      "Aviary nhà anh diện tích có rộng thoáng cho em nó bay lượn không anh?",
    productIds: [],
  },
  {
    keywords: ["chim hót rót", "rót lửa", "hót nhỏ", "líu ríu", "tịt ngòi"],
    answer:
      "Dạ chim hót rót, tịt ngòi là do bị đè giàn quá sức đó anh ơi:\n\n" +
      "1. Trùm kín áo lồng dưỡng lại ở chỗ yên tĩnh tầm 1-2 tuần.\n" +
      "2. Bồi bổ cám mát và mồi tươi để em nó lấy lại thể lực.\n" +
      "3. Đừng mang ra giàn đấu lúc này kẻo em nó 'điếc; giọng luôn đó anh.\n\n" +
      "Anh đang để em nó ở chế độ cám dưỡng hay cám đấu vậy anh?",
    productIds: ["m2", "h1"],
  },
  {
    keywords: ["xù lông", "đứng xù lông", "lông phồng", "lông xơ xù"],
    answer:
      "Dạ Chào Mào đứng xù lông là báo hiệu em nó đang lạnh hoặc trúng gió đó anh:\n\n" +
      "1. Ủ ấm ngay bằng cách trùm kín áo lồng, nhỏ 1 giọt dầu tràm đáy lồng.\n" +
      "2. Cho uống nước ấm pha ít gừng hoặc mật ong loãng.\n" +
      "3. Chuyển sang cám mát cho em nó dễ tiêu hóa lúc mệt.\n\n" +
      "Anh nhìn xem dưới bố lồng phân có màu xanh nhớt hay có nước nhiều không anh?",
    productIds: ["m1", "h1"],
  },
  {
    keywords: ["kêu sổng", "hót sổng", "kêu wit wiu", "kêu gắt", "gọi đàn"],
    answer:
      "Dạ nghe tiếng hót sổng uy lực là biết chiến binh nhà anh đang cực kỳ căng lửa rồi đó:\n\n" +
      "1. Chim hót sổng nhiều là gân cốt đang sung mãn, muốn dã chiến ngoài giàn.\n" +
      "2. Anh nên dắt em nó đi cội cafe để 'xả' bớt lửa cho sướng cái mình con chim.\n" +
      "3. Nhớ nạp cám đấu đủ lực để em nó giữ được dọng hót vang xa nghen.\n\n" +
      "Chim nhà anh hót sổng một hồi được mấy âm tiết vậy anh (5 hay 7 âm)?",
    productIds: ["m2"],
  },
  {
    keywords: ["tuổi thọ", "sống bao lâu", "chim thọ", "chim già tuổi", "tuổi lồng"],
    answer:
      "Dạ Chào Mào nếu chăm khéo thì ở với anh em mình thọ lắm anh ơi:\n\n" +
      "1. Chế độ cám sạch, mồi tươi đủ đầy thì em nó sống 10-15 mùa lồng là thường.\n" +
      "2. Càng già lồng chim càng 'quái', nết đấu càng lì lợm dữ dằn.\n" +
      "3. Anh cứ dùng cám xịn với lồng Thái rộng rãi là em nó sống đời với anh luôn.\n\n" +
      "Bé hạt tiêu nhà anh đã gắn bó được mấy mùa lông với anh rồi?",
    productIds: ["m1", "l1", "m2"],
  }
];

/**
 * Kiểm tra keyword có khớp trong message không.
 * Keyword ngắn (≤3 ký tự) phải khớp nguyên từ (word boundary)
 * để tránh "hi" match nhầm bên trong "chim", "ok" trong "không", v.v.
 */
export function matchKeyword(message: string, keyword: string): boolean {
  if (keyword === 'chào') {
    const safeMsg = message.replace(/chào mào/g, 'cm_bird');
    return safeMsg.includes('chào');
  }
  if (keyword === 'ai' || keyword === 'a.i') {
    return /\bai\b/i.test(message);
  }
  // Keyword ngắn → yêu cầu word boundary để tránh match nhầm
  if (keyword.length <= 3) {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(?:^|\\s|[,;!?.])${escaped}(?:$|\\s|[,;!?.])`, 'i').test(message);
  }
  return message.includes(keyword);
}

export function getSimpleResponse(query: string): SimpleResponse | null {
  const checkMsg = query.toLowerCase();
  for (const resp of SIMPLE_RESPONSES) {
    if (resp.keywords.some((kw) => matchKeyword(checkMsg, kw))) {
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
