import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export function proxy(request: NextRequest) {
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

  // Gắn ngược lại vào Request Header để các API Route bên trong (ví dụ app/api/chat) lấy dùng
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

  // Cũng trả lại trong Response headers để Client (nếu cần) có thể thấy
  response.headers.set('x-sportaiv-sid', sessionId);

  return response;
}

// Cấu hình matcher để middleware chỉ chạy ở những route cần thiết
export const config = {
  matcher: [
    // Bắt toàn bộ các request vào API
    '/api/:path*',
  ],
};
