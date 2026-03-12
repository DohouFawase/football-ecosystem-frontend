import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
   const apiKey = request.cookies.get('app_api_key')?.value;

  if (!apiKey) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
  
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
  matcher: ["/dashboard/:path*", 
    
  ],
  
}