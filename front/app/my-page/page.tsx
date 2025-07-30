import React from 'react'
import { auth } from '@/auth';
import { serverAxiosInstance } from '@/lib/axiosInstance/server'
import Loading from '../loading';
import { UserRound } from 'lucide-react';
import { SWRConfig } from 'swr'
import NameInlineEditor from '../components/my-page/NameInlineEditor';



import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Link from 'next/link';



const MyPage = async () => {
  const session = await auth()
  if (!session) return <Loading />;
  const sessionId = session.user.user_id;
  


  const res = await serverAxiosInstance.get(`/profiles/${sessionId}`);
  const profile = res.data;
  const { partner_id, user: { role }} = profile.profile;
  console.log("取得データのチェック", profile)



  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      {/* プロフィールカード */}
      <Card>
        <CardHeader className="items-center">
          <div className="relative h-24 w-24">
            <Image
              src={
                "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXItcm91bmQtaWNvbiBsdWNpZGUtdXNlci1yb3VuZCI+PGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI1Ii8+PHBhdGggZD0iTTIwIDIxYTggOCAwIDAgMC0xNiAwIi8+PC9zdmc+"
              }
              alt="プロフィール画像"
              fill
              className="rounded-full bg-muted object-cover"
            />
          </div>

          <Button variant="secondary" size="sm" className="mt-4" disabled>
            画像を変更する
          </Button>

          <p className="mt-2 text-xs text-muted-foreground">
            (※現在、トップ画像機能は未実装です。大変申し訳ありません)
          </p>
        </CardHeader>

        <CardContent className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="grid grid-cols-[8rem_1fr] gap-y-2 gap-x-3 items-center">

              <span className="text-muted-foreground text-right font-medium">名前:</span>
              <div className="flex items-center gap-2">
                <SWRConfig value={{ fallback: {[`/profiles/${sessionId}`]: profile}}}>
                  <NameInlineEditor userId={sessionId}/>
                </SWRConfig>
              </div>

              <span className="text-muted-foreground text-right font-medium">パートナーID:</span>
              <span>{partner_id}</span>

              <span className="text-muted-foreground text-right font-medium">区分:</span>
              <span>{role}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 通知設定カード */}
      <Card>
        <CardHeader className='flex items-center justify-center'>
          <CardTitle>通知設定</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span>スケジュール通知</span>
            <Switch disabled defaultChecked />
          </div>
          <div className="flex items-center justify-center gap-10">
            <span>チャット通知</span>
            <Switch disabled defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MyPage