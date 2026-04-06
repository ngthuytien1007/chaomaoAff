"use client"

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const supabase = createClient()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
    })

    if (error) {
      setError("Không thể gửi email. Quý khách vui lòng kiểm tra lại địa chỉ email.")
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
          <h1 className="text-3xl font-bold text-white tracking-tight">Khôi Phục Mật Khẩu</h1>
          <p className="text-blue-100 mt-2 text-sm">Điền email để lấy lại quyền truy cập</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-center mb-6 text-sm">
            ❌ {error}
          </div>
        )}

        {success ? (
          <div className="text-center bg-green-500/20 border border-green-500/50 p-6 rounded-2xl">
            <h3 className="text-green-300 font-bold text-xl mb-2">Đã Gửi Email! 📨</h3>
            <p className="text-green-100 text-sm mb-6">Em vừa gửi một đường dẫn khôi phục mật khẩu vào email của anh. Nhớ bấm vào link đó nha!</p>
            <Link href="/auth/login" className="inline-block py-2.5 px-6 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition-all">
              Quay lại đăng nhập
            </Link>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">Nhập Email tài khoản</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="admin@chaomao.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center"
            >
              {loading ? (
                <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : "Gửi Link Khôi Phục"}
            </button>
          </form>
        )}

        {!success && (
          <p className="mt-8 text-center text-sm text-blue-200/60">
            <Link href="/auth/login" className="text-white hover:underline transition-colors">← Trở về Đăng Nhập</Link>
          </p>
        )}
      </div>
    </div>
  )
}
