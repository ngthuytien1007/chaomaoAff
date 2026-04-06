import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { updateSession } from '@/utils/supabase/middleware';

export async function proxy(request: NextRequest) {
  // 1. Kiểm tra ID từ Cloudflare gửi sang
  let sessionId = request.headers.get('x-sportaiv-sid');

  // 2. Nếu Cloudflare không gửi (Hết request/Bypass), kiểm tra Cookie hiện có
  if (!sessionId) {
    sessionId = request.cookies.get('sportaiv_sid')?.value || null;
  }

  let cookieSet = false;
  // 3. Nếu vẫn không có -> Tự tạo mới (Dự phòng cho Cloudflare)
  if (!sessionId) {
    sessionId = uuidv4();
    cookieSet = true;
  }

  // Gắn ngược lại vào Request Header để các API Route bên trong lấy dùng
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-sportaiv-sid', sessionId);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Đặt Cookie nếu vừa tạo mới sessionId
  if (cookieSet) {
    response.cookies.set('sportaiv_sid', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 ngày
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
  }

  response.headers.set('x-sportaiv-sid', sessionId);

  // 4. Pass Request và cấu hình Proxy Response cho hệ thống Supabase Auth Middleware tiếp nối
  return await updateSession(request, response);
}

// Mở rộng matcher: chạy trên cả trang HTML lẫn API
// để session_id được cấp trước khi frontend gọi track-visit
export const config = {
  matcher: [
    // Toàn bộ route, bỏ qua static files và image optimization
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
