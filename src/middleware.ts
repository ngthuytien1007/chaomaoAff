import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { proxy } from './proxy'

export async function middleware(request: NextRequest) {
  // 1. Chạy proxy để cấp session_id (Track hành vi người dùng bằng cơ chế cũ)
  const proxyResponse = proxy(request)
  
  // 2. Chạy Supabase Auth để bảo vệ Route /admin và refresh token
  // Do updateSession trả về response độc lập, ta sẽ xử lý cẩn thận
  // Ở middleware auth của Supabase, hàm tạo mới response.
  // Ta có thể truyền vào 'request' đã được proxy cập nhật (có header session_id).
  
  // Tinh chỉnh updateSession bên '@/utils/supabase/middleware'
  // để nó kế thừa headers/cookies từ proxyResponse nếu cần
  return await updateSession(request, proxyResponse)
}

export const config = {
  matcher: [
    // Bỏ qua static files, image optimization, và public assets
    '/((?!_next/static|_next/image|favicon.ico|.*\\\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
