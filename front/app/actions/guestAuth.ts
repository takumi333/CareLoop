"use server"

import { signIn } from "@/auth" 


export const guestAuth = async () => {
  await signIn(undefined, { redirectTo: "/dashboard" })
  // signIn が 302 を返すので return 不要。
  // 失敗した際は、例外エラー飛ぶ
}
