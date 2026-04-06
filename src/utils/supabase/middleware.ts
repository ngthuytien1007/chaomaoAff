import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest, baseResponse?: NextResponse) {
  let supabaseResponse = baseResponse || NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          // Preserve existing headers from baseResponse if we need to recreate response
          const newResponse = NextResponse.next({ request })
          
          if (baseResponse) {
             baseResponse.headers.forEach((val, key) => {
               newResponse.headers.set(key, val)
             })
             baseResponse.cookies.getAll().forEach(c => {
               newResponse.cookies.set(c.name, c.value, c as any)
             })
          }
          
          supabaseResponse = newResponse
          
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (request.nextUrl.pathname.startsWith('/admin') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  if (request.nextUrl.pathname.startsWith('/auth') && user) {
      if(request.nextUrl.pathname === '/auth/callback' || request.nextUrl.pathname === '/auth/forgot-password') {
          // Allow callback
      } else {
        const url = request.nextUrl.clone()
        url.pathname = '/admin/products'
        return NextResponse.redirect(url)
      }
  }

  return supabaseResponse
}
