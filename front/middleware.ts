import { auth } from "@/auth"
import { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const session = await auth();

  if (!session && req.nextUrl.pathname !== "/top") {
    const newUrl = new URL("/top", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|top).*)"],
}