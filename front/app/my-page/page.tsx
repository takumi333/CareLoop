import React from 'react'
import { auth } from '@/auth';
import { serverAxiosInstance } from '@/lib/axiosInstance/server'
import Loading from '../loading';
import { UserRound } from 'lucide-react';

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
  const profile = res.data.profile;
  console.log(profile);


  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      {/* プロフィールカード */}
      <Card>
        <CardHeader className="items-center">
          <div className="relative h-24 w-24">
            <Image
              src={
                profile.avatarUrl ??
                <UserRound />
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

        <CardContent className="space-y-2">
          <div className='flex justify-center gap-1'>
            <span className="font-medium text-muted-foreground">名前：</span>
            {profile.user.name}
            <div className='ml-3'>
              <Button size= "sm">
                <Link href={`/my-page/${sessionId}/edit`}>名前を変更する</Link>
              </Button>
            </div>
          </div>
          <div className='flex justify-center  gap-1'>
            <span className="font-medium text-muted-foreground">
              パートナーID:
            </span>
            {profile.partner_id}
          </div>
          <div className='flex justify-center gap-1'>
            <span className="font-medium text-muted-foreground">区分：</span>
            {profile.user.role}
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