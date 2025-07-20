import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { serverAxiosInstance } from '@/lib/axiosInstance/server'
import { Menu } from "lucide-react"
import Link from "next/link"
import { cookies } from 'next/headers'

import React from 'react'

const Header = () => {

  return (
    <header className='flex w-full items-center justify-between border-b px-4 py-2 bg-blue-300'>
      <Link href="/dashboard" className="font-bold">
        CareLoop
      </Link>
      <div className="flex items-center gap-2">
        <form
          action={async () => {
            'use server';
            // rails API側のsessionを削除
            const res = await serverAxiosInstance.delete("/auth/logout");
            if (res.status !== 200) console.log("cookie.user_idが削除出来ていません。");
            // ブラウザ側に保存しているcookieを削除
            (await cookies()).delete('_care_loop_session');

            await signOut({ redirectTo: '/top' });
          }}
        >
          <Button type="submit">ログアウト</Button>
        </form>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open main menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[260px] p-0">
            {/* ドロワーヘッダ */}
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="font-semibold">CareLoop</span>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" aria-label="Close menu">
                  ✕
                </Button>
              </SheetClose>
            </div>

            {/* ドロワー内の縦並びメニュー */}
            <nav className="flex flex-col gap-1 p-4">
              <SheetClose asChild>
                <Link href="/dashboard" className="rounded-lg px-3 py-2 hover:bg-muted">
                  Dashboard
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/top" className="rounded-lg px-3 py-2 hover:bg-muted">
                  機能名
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Header