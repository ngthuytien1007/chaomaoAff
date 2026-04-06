"use client"

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError("Sai tài khoản hoặc mật khẩu rồi anh ơi!")
      setLoading(false)
    } else {
      router.push('/admin/products')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-900 overflow-hidden relative">
      {/* Nền bong bóng mờ ảo Glassmorphism */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>

      <div className="z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">Chào Mào AI</h1>
          <p className="text-blue-100 mt-2 text-sm">Hệ thống Quản Trị Affiliate</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-center mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">Email Đăng Nhập</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="admin@chaomao.com"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-sm font-medium text-blue-100">Mật khẩu</label>
              <Link href="/auth/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">Quên mật khẩu?</Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center">
            <input id="remember" type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 bg-transparent" defaultChecked />
            <label htmlFor="remember" className="ml-2 text-sm text-blue-200">Nhớ phiên đăng nhập của mình</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center"
          >
            {loading ? (
              <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : "Đăng Nhập"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-blue-200/60">
          Chưa có tài khoản? <Link href="/auth/register" className="text-white hover:underline">Tạo mới ngay</Link>
        </p>
      </div>
    </div>
  )
}
