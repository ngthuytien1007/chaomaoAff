// src/app/api/track-visit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Dữ liệu địa lý từ Vercel Headers (chuẩn nhất)
    const ip =
      req.headers.get('x-real-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'Unknown';
    const city = decodeURIComponent(req.headers.get('x-vercel-ip-city') || 'Unknown');
    const country = req.headers.get('x-vercel-ip-country') || 'Unknown';
    const region = req.headers.get('x-vercel-ip-country-region') || 'Unknown';
    const latitude = req.headers.get('x-vercel-ip-latitude') || '';
    const longitude = req.headers.get('x-vercel-ip-longitude') || '';
    const userAgent = req.headers.get('user-agent') || '';

    // 2. Dữ liệu từ Frontend (Browser)
    const { screen, ram, referrer, url, utm } = body as {
      screen?: string;
      ram?: string | number;
      referrer?: string;
      url?: string;
      utm?: Record<string, string>;
    };

    const location = `${city}, ${region}, ${country}${latitude ? ` (${latitude}, ${longitude})` : ''}`;

    // 3. Ghi vào bảng visitors (cùng bảng với chat, phân biệt bằng content)
    const { error } = await supabase.from('visitors').insert([
      {
        ip,
        location,
        device: `${screen ?? ''} | RAM: ${ram ?? 'N/A'}`,
        user_agent: userAgent,
        content: `[First Visit] referrer=${referrer ?? 'Direct'} | url=${url ?? ''} | utm=${JSON.stringify(utm ?? {})}`,
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('❌ track-visit error:', err);
    // Trả 200 để frontend không bị lỗi JS
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
