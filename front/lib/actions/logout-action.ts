"use server"

import { cookies } from 'next/headers'
import { serverAxiosInstance } from '@/lib/axiosInstance/server'

export async function logoutAction() {
  // rails内のsession削除
  const res = await serverAxiosInstance.delete('/auth/logout')
  if (res.status !== 200) console.error('cookie.user_id が削除出来ていません。');

  // ブラウザ側に保存しているcookieを削除
  (await cookies()).delete('_care_loop_session')
}