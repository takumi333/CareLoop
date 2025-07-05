import { auth } from "@/auth"

export const middleware = auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/top") {
    const newUrl = new URL("/top", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|top).*)"],
}