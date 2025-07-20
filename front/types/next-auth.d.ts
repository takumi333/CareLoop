import type { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import { string } from "zod/v4"
 
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      uid: string
      name: string
      provider?: string
      access_token?: string;
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    uid: string
    name: string
    provider?: string
    role: string
    partner_id?: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string
    id: string
    name: string
    provider?: string
    access_token?: string
    role: string
  }
}