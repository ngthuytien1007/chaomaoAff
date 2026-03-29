import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.headers.get('x-sportaiv-sid');
    const { productName, productLink } = await req.json();

    if (sessionId) {
      await supabase.from('affiliate_clicks').insert([{
        session_id: sessionId,
        product_name: productName,
        product_link: productLink
      }]);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lỗi track-click:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
