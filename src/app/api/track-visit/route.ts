// src/app/api/track-visit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Parse User-Agent đơn giản (không cần thư viện ngoài)
function parseUA(ua: string) {
  const os = /Windows/.test(ua)
    ? 'Windows'
    : /Mac OS X/.test(ua)
    ? 'macOS'
    : /Android/.test(ua)
    ? 'Android'
    : /iPhone|iPad/.test(ua)
    ? 'iOS'
    : /Linux/.test(ua)
    ? 'Linux'
    : 'Unknown';

  const browser = /Edg\//.test(ua)
    ? 'Edge'
    : /OPR\/|Opera/.test(ua)
    ? 'Opera'
    : /Chrome\//.test(ua)
    ? 'Chrome'
    : /Firefox\//.test(ua)
    ? 'Firefox'
    : /Safari\//.test(ua)
    ? 'Safari'
    : 'Unknown';

  const deviceType = /Mobi|Android|iPhone|iPad/.test(ua) ? 'mobile' : 'desktop';

  return { os, browser, deviceType };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      referrer?: string;
      url?: string;
      utm?: Record<string, string>;
      language?: string;
      bot_score?: number;
    };

    // 1. Session ID từ proxy (đã được gắn vào header)
    const sessionId = req.headers.get('x-sportaiv-sid');
    if (!sessionId) {
      return NextResponse.json({ ok: false, reason: 'no session' }, { status: 200 });
    }

    // 2. Thông tin địa lý từ Vercel Headers
    const ip =
      req.headers.get('x-real-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'Unknown';
    const city    = decodeURIComponent(req.headers.get('x-vercel-ip-city') || '');
    const country = req.headers.get('x-vercel-ip-country') || '';
    const region  = req.headers.get('x-vercel-ip-country-region') || '';
    const postal  = req.headers.get('x-vercel-ip-postal-code') || '';
    const asOrg   = req.headers.get('x-vercel-ip-as-organization') || '';

    // 3. Parse User-Agent
    const userAgent = req.headers.get('user-agent') || '';
    const { os, browser, deviceType } = parseUA(userAgent);

    // 4. Dữ liệu từ client
    const language  = body.language  || '';
    const botScore  = body.bot_score  ?? null;
    const referrer  = body.referrer   || '';
    const utmSource   = body.utm?.source   || '';
    const utmMedium   = body.utm?.medium   || '';
    const utmCampaign = body.utm?.campaign || '';

    const now = new Date().toISOString();

    // 5. UPSERT vào bảng profiles (tạo mới hoặc cập nhật last_seen)
    const { error: profileError } = await supabase.from('profiles').upsert(
      {
        session_id:  sessionId,
        last_seen:   now,
        first_seen:  now, // bị ignore khi conflict nếu dùng ignoreDuplicates: false (default)
        device_type: deviceType,
        os,
        browser,
        language,
        bot_score:   botScore,
      },
      {
        onConflict:       'session_id',
        ignoreDuplicates: false, // Cho phép update last_seen
      }
    );
    if (profileError) throw profileError;

    // 6. INSERT vào bảng visits
    const { error: visitError } = await supabase.from('visits').insert([
      {
        session_id:      sessionId,
        ip_address:      ip,
        city,
        region,
        country,
        postal_code:     postal,
        as_organization: asOrg,
        referrer,
        utm_source:      utmSource,
        utm_medium:      utmMedium,
        utm_campaign:    utmCampaign,
      },
    ]);
    if (visitError) throw visitError;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('❌ track-visit error:', err);
    // Trả 200 để frontend không bị lỗi JS
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
