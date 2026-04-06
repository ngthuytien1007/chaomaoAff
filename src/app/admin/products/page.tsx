"use client";

import { useState } from "react";

export default function AdminProductsPage() {
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  
  // States cho form sản phẩm
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [rating, setRating] = useState("5.0");
  const [affiliateUrl, setAffiliateUrl] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    if (!imageFile) {
      setMessage({ text: "Anh chưa chọn ảnh sản phẩm ạ!", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("passcode", passcode);
      
      // Auto sinh ID ngẫu nhiên ví dụ m_xyz
      formData.append("id", "p_" + Math.random().toString(36).substring(2, 9));
      
      formData.append("name", name);
      formData.append("price", price);
      formData.append("originalPrice", originalPrice);
      formData.append("rating", rating);
      formData.append("affiliateUrl", affiliateUrl);
      
      // Tách tags ra mảng (nhập cách nhau dấu phẩy)
      const tagsArray = tags.split(",").map(t => t.trim()).filter(Boolean);
      const categoryArray = category.split(",").map(c => c.trim()).filter(Boolean);
      
      formData.append("tags", JSON.stringify(tagsArray));
      formData.append("category", JSON.stringify(categoryArray));
      formData.append("image", imageFile);

      const res = await fetch("/api/admin/products", {
        method: "POST",
        body: formData, // Không set Content-Type, trình duyệt tự xử lý boundary
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Lỗi không xác định");
      }

      setMessage({ text: data.message + " (Ghi nhớ F5 trang chủ để xem cập nhật)", type: "success" });
      
      // Clear form
      setName(""); setPrice(""); setOriginalPrice(""); setAffiliateUrl(""); setTags(""); setCategory(""); setImageFile(null);
      
    } catch (error: any) {
      setMessage({ text: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-12 text-gray-800">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 border-b pb-4 border-gray-200">
            Đăng Sản Phẩm Affiliate
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Hệ thống xài ổ cứng mây Supabase vĩnh viễn</p>
        </div>

        {message.text && (
          <div className={`p-4 mb-6 rounded-lg font-medium \${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {message.type === 'error' ? '❌' : '✅'} {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 mb-6">
            <label className="block text-sm font-bold text-orange-800 mb-1">Mã Nhận Diện Admin *</label>
            <input 
              type="password" 
              value={passcode} 
              onChange={(e)=>setPasscode(e.target.value)} 
              className="w-full p-2 border border-orange-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Nhập mã bí mật..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">Tên Sản Phẩm *</label>
              <input value={name} onChange={e=>setName(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="VD: Lồng Thái Gỗ Mun Cao Cấp..." required />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Giá Bán *</label>
              <input value={price} onChange={e=>setPrice(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="VD: 1.250.000đ" required />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Giá Gốc (Gạch ngang) *</label>
              <input value={originalPrice} onChange={e=>setOriginalPrice(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="VD: 1.500.000đ" required />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">Link Bán Hàng (Shopee/Lazada/Zalo) *</label>
              <input type="url" value={affiliateUrl} onChange={e=>setAffiliateUrl(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://..." required />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Thẻ Gắn Nhãn (Tags)</label>
              <input value={tags} onChange={e=>setTags(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Cách nhau = dấu phẩy (VD: Cao cấp, Giá rẻ)" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Danh Mục Cốt Lõi (Nhận diện AI)</label>
              <input value={category} onChange={e=>setCategory(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="cám, lồng đấu, phụ kiện, thái..." />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Ảnh Sản Phẩm *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 flex flex-col items-center justify-center relative min-h-[120px]">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
                {!imageFile ? (
                   <div className="text-gray-500">
                      <span className="text-3xl block mb-2">📸</span>
                      Bấm vào đây để chọn ảnh từ máy
                   </div>
                ) : (
                  <div className="text-green-600 font-semibold flex items-center gap-2">
                    ✅ Đã chọn ảnh: {imageFile.name}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={\`w-full py-4 mt-6 rounded-xl text-white font-bold text-lg shadow-lg transition-transform active:scale-95 \${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-xl'}\`}
          >
            {loading ? "🚀 Đang up hình lên mây..." : "ĐĂNG SẢN PHẨM LÊN HỆ THỐNG"}
          </button>
        </form>
      </div>
    </div>
  );
}
