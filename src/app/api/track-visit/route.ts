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
      referrer?:          string;
      url?:               string;
      utm?:               Record<string, string>;
      language?:          string;
      bot_score?:         number;
      screen_resolution?: string;
      timezone?:          string;
    };

    // 1. Session ID từ proxy (đã được gắn vào header)
    const sessionId = req.headers.get('x-sportaiv-sid');
    if (!sessionId) {
      return NextResponse.json({ ok: false, reason: 'no session' }, { status: 200 });
    }

    // 2. Thông tin địa lý từ Vercel Headers
    const ip       = req.headers.get('x-real-ip') ||
                     req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
    const city     = decodeURIComponent(req.headers.get('x-vercel-ip-city') || '');
    const country  = req.headers.get('x-vercel-ip-country') || '';
    const region   = req.headers.get('x-vercel-ip-country-region') || '';
    const latitude = req.headers.get('x-vercel-ip-latitude') || '';
    const longitude= req.headers.get('x-vercel-ip-longitude') || '';
    const postal   = req.headers.get('x-vercel-ip-postal-code') || '';
    const asOrg    = req.headers.get('x-vercel-ip-as-organization') || '';

    // 3. User-Agent & parse
    const userAgent = req.headers.get('user-agent') || '';
    const { os, browser, deviceType } = parseUA(userAgent);

    // Tổng hợp location text (tiện đọc)
    const locationText = [city, region, country].filter(Boolean).join(', ');

    // 4. Dữ liệu từ client
    const language         = body.language          || '';
    const botScore         = body.bot_score         ?? null;
    const referrer         = body.referrer          || '';
    const screenResolution = body.screen_resolution || '';
    const timezone         = body.timezone          || '';
    const utmSource        = body.utm?.source       || '';
    const utmMedium        = body.utm?.medium       || '';
    const utmCampaign      = body.utm?.campaign     || '';

    // Thời gian theo múi giờ Việt Nam (UTC+7)
    const now = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).replace(' ', 'T') + '+07:00';

    // 5. UPSERT vào bảng profiles — lưu đầy đủ thông tin
    const { error: profileError } = await supabase.from('profiles').upsert(
      {
        session_id:        sessionId,
        last_seen:         now,
        first_seen:        now,       // bị ignore khi conflict (Supabase giữ giá trị cũ)
        // Thiết bị
        device_type:       deviceType,
        device:            deviceType,   // alias để tương thích cột cũ
        os,
        browser,
        user_agent:        userAgent,
        screen_resolution: screenResolution,
        // Vị trí
        city,
        country,
        region,
        latitude,
        longitude,
        location:          locationText, // text đọc nhanh
        // Hành vi
        language,
        timezone,
        referrer,
        bot_score:         botScore,
      },
      {
        onConflict:       'session_id',
        ignoreDuplicates: false,         // update last_seen + các field mới nếu có
      }
    );
    if (profileError) throw profileError;

    // 6. INSERT vào bảng visits (mỗi lần vào trang = 1 dòng)
    const { error: visitError } = await supabase.from('visits').insert([
      {
        session_id:      sessionId,
        created_at:      now,
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
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
