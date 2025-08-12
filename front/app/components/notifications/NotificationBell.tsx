'use client'

import Loading from '@/app/loading';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { clientAxiosInstance } from '@/lib/axiosInstance/client';
import { Bell } from 'lucide-react';
import React, { useMemo, useState } from 'react'
import useSWR from 'swr';
import ErrorView from '../LocalError';
import { ScrollArea } from '@/components/ui/scroll-area';


type NotificationItem = {
    id: number,
    sender_id: number,
    recipient_id: number,
    action: "relation" | "comment" | "message",
    relation_id?: number | null,
    message_id?: number | null,
    comment_id?: number | null,
    checked: boolean,
    created_at: string,
    recipient_name: string,
}

type NotificationsResponse = {
  notifications: NotificationItem[],
};


const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  

  const fetcher = (url: string) => clientAxiosInstance.get(url).then(res => res.data);
  // 一定期間で再検証するオプション設定する
  const { data: notificationData, isLoading, error: isError, mutate} = useSWR<NotificationsResponse>("/notifications",fetcher,{
    shouldRetryOnError: false,
     revalidateOnFocus: false,
     refreshInterval: 10000, //10秒間隔で定期的に通知データをポーリングする(取得データ同値なら更新は行われない)
     dedupingInterval: 3000, // reqを連発してしまうのを防止
  });
  console.log("notificationData: ",notificationData)

  if(isLoading) return;
  if(isError) return <ErrorView onRetry={() => mutate()}/>;


  // 配列部分を事前に変数代入
  const list = notificationData?.notifications;

  const unreadCount = () => list?.filter((n: NotificationItem) => !n.checked).length;
  
  // 既読済みに変換
  const markRead = async (id: number) => {
    try {
      await clientAxiosInstance.post("/notifications/mark_read", { notifications: { id: id } });
      mutate();
    } catch (e) {
      console.error(e);
    }
  };

  const renderTitle = (n:NotificationItem) => {
    switch (n.action) {
      case "relation":
        return `${n.recipient_name}から関係者申請が届きました`;
      case "message":
        return `${n.recipient_name}新しいメッセージがあります`;
      case "comment":
        return `${n.recipient_name}コメントが付きました`;
      default:
        return `${n.recipient_name}通知が届きました`;
    }
  }

  // 自分でロジックの意味理解してから、時間表示UIロジックに使用する
  // function fromNow(iso: string) {
  //   const d = new Date(iso);
  //   const sec = Math.floor((Date.now() - d.getTime()) / 1000);
  //   if (sec < 60) return `${sec}s 前`;
  //   const min = Math.floor(sec / 60);
  //   if (min < 60) return `${min}m 前`;
  //   const hr = Math.floor(min / 60);
  //   if (hr < 24) return `${hr}h 前`;
  //   const day = Math.floor(hr / 24);
  //   return `${day}d 前`;
  // }


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {/* 表示件数の表示ロジック */}
          {/* {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-xs font-semibold text-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )} */}
          <span className="sr-only">通知を開く</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        {/* 通知一覧のタイトル&未読バッジ?&全て既読状態にする機能 */}
        {/* <div className="flex items-center justify-between px-3 py-2">
          <div className="text-sm font-semibold">通知</div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">未読 {unreadCount}</Badge>
            <Button
              variant="ghost"
              size="sm"
              disabled={unreadCount === 0 || marking === "all"}
              onClick={markAllRead}
              className="gap-1"
            >
              {marking === "all" ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCheck className="h-4 w-4" />}
              すべて既読
            </Button>
          </div>
        </div> */}
        <Separator />


        <ScrollArea className="h-80">
          {list?.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              通知はまだありません
            </div>
          ) : (
          <ul className="p-1">
            {list?.map((n: NotificationItem) => (
              <li
                key={n.id}
                className={`flex items-start gap-3 rounded-md p-2 transition hover:bg-accent/50 ${n.checked ? "opacity-80" : ""}`}
              >
                {/* <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-[10px]">
                    {abbr(n.action)}
                  </AvatarFallback>
                </Avatar> */}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">
                    {renderTitle(n)}
                    {!n.checked && (
                      <span className="ml-2 align-middle text-[10px] text-red-600">未読</span>
                    )}
                  </p>
                  {/* 時間表示ロジックを理解してからコメントアウト外す */}
                  {/* <p className="mt-1 text-xs text-muted-foreground">
                    {fromNow(n.created_at)}
                  </p> */}
                </div>

                {!n.checked ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markRead(n.id)}
                    // disabled={marking === n.id}
                    className="gap-1"
                  >
                  {/* {marking === n.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCheck className="h-4 w-4" />
                  )} */}
                    既読
                  </Button>
                ) : null}

              </li>
            ))}
          </ul>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

export default NotificationBell