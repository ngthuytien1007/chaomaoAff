"use client"

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-900 overflow-hidden relative">
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>

      <div className="z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">Mở Tài Khoản</h1>
          <p className="text-blue-100 mt-2 text-sm">Tham gia mạng lưới quản trị viên</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-center mb-6 text-sm">
            ❌ {error}
          </div>
        )}

        {success ? (
          <div className="text-center bg-green-500/20 border border-green-500/50 p-6 rounded-2xl">
            <h3 className="text-green-300 font-bold text-xl mb-2">Thành công! 🎉</h3>
            <p className="text-green-100 text-sm mb-6">Em đã gửi một email xác nhận đến hộp thư của anh. Nhớ kiểm tra nha!</p>
            <Link href="/auth/login" className="inline-block py-2.5 px-6 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition-all">
              Quay lại đăng nhập
            </Link>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">Email của anh</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">Thiết lập Mật khẩu (Từ 6 ký tự)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center"
            >
              {loading ? (
                <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : "Đăng Ký Tài Khoản"}
            </button>
          </form>
        )}

        {!success && (
          <p className="mt-8 text-center text-sm text-blue-200/60">
            Đã có tài khoản? <Link href="/auth/login" className="text-white hover:underline">Vào ngay</Link>
          </p>
        )}
      </div>
    </div>
  )
}
