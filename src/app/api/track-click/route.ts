// src/app/api/track-click/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.headers.get('x-sportaiv-sid');
    const { productName, productLink } = await req.json() as {
      productName?: string;
      productLink?: string;
    };

    if (sessionId) {
      const now = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).replace(' ', 'T') + '+07:00';
      const { error } = await supabase.from('affiliate_clicks').insert([{
        session_id:   sessionId,
        product_name: productName || '',
        product_link: productLink || '',
        created_at:   now,
      }]);
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Lỗi track-click:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
