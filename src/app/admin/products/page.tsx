"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/constants";

export default function AdminProductsPage() {

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

  // New product preview after creation
  const [newProduct, setNewProduct] = useState<Product | null>(null);
  // List of all products for this admin
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState("");

  const fetchMyProducts = async () => {
    setListLoading(true);
    setListError("");
    try {
      const res = await fetch("/api/admin/products", { method: "GET" });
      
      // Nếu bị redirect hoặc 401 → chưa đăng nhập
      if (res.status === 401 || res.redirected) {
        window.location.href = "/auth/login";
        return;
      }

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        window.location.href = "/auth/login";
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Lỗi không xác định");
      
      const mappedProducts = (data.products || []).map((row: any) => ({
        id: row.id,
        name: row.name,
        price: row.price,
        originalPrice: row.original_price ?? undefined,
        rating: row.rating ?? 5.0,
        image: row.image || row.image_url || '',
        affiliate_url: row.affiliate_url ?? '',
        tags: Array.isArray(row.tags) ? row.tags : [],
        category: Array.isArray(row.category) ? row.category : [],
      }));
      setMyProducts(mappedProducts);
    } catch (e: any) {
      setListError(e.message);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    // Load admin's products on component mount
    fetchMyProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });
    setNewProduct(null);

    if (!imageFile) {
      setMessage({ text: "Anh chưa chọn ảnh sản phẩm ạ!", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      
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
        body: formData,
      });

      // Kiểm tra phiên đăng nhập
      if (res.status === 401 || res.redirected) {
        window.location.href = "/auth/login";
        return;
      }
      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        window.location.href = "/auth/login";
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Lỗi không xác định");
      }

      // API now returns the full product record
      const p = data.product;
      const mappedProduct = {
        id: p.id,
        name: p.name,
        price: p.price,
        originalPrice: p.original_price ?? undefined,
        rating: p.rating ?? 5.0,
        image: p.image || p.image_url || '',
        affiliate_url: p.affiliate_url ?? '',
        tags: Array.isArray(p.tags) ? p.tags : [],
        category: Array.isArray(p.category) ? p.category : [],
      };
      setNewProduct(mappedProduct);
      setMessage({ text: data.message || "Đăng sản phẩm thành công!", type: "success" });
      
      // Refresh the product list
      fetchMyProducts();

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
          <p className="text-gray-500 mt-2 text-sm">Hệ thống Quản Trị Affiliate & Cloud Storage</p>
        </div>

        {message.text && (
          <div className={`p-4 mb-6 rounded-lg font-medium ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {message.type === 'error' ? '❌' : '✅'} {message.text}
          </div>
        )}

        {/* New product preview */}
        {newProduct && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Sản phẩm vừa tạo</h2>
            <ProductCard product={newProduct} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
            className={`w-full py-4 mt-6 rounded-xl text-white font-bold text-lg shadow-lg transition-transform active:scale-95 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-xl'}`}
          >
            {loading ? "🚀 Đang up hình lên mây..." : "ĐĂNG SẢN PHẨM LÊN HỆ THỐNG"}
          </button>
        </form>

        {/* Admin's product list */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Sản phẩm của tôi</h2>
          {listLoading && <p>Đang tải danh sách...</p>}
          {listError && <p className="text-red-600">{listError}</p>}
          {!listLoading && myProducts.length === 0 && <p>Chưa có sản phẩm nào.</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
