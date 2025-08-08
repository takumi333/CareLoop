'use client'

import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const Error = ({error, reset,}: ErrorPageProps) => {

  const customId = "custom-id-yes";
  useEffect(() => {
    toast.error("データ取得に失敗しました", {toastId: customId})
    console.error("予期せぬエラーが発生しました。" ,error, error.message)
  }, [error])


  // return (
  //   <div>
  //     <h2>予期せぬ問題が発生しました！</h2>
  //     <button className='bg-blue-500' onClick={() => reset()}>もう一度やり直す</button>
  //   </div>
  // )

  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow">
        <h2 className="mb-2 text-center text-lg font-semibold text-red-600">
          予期せぬ問題が発生しました！
        </h2>
        <p className="mb-4 text-center text-sm text-muted-foreground">
          ネットワーク状況をご確認のうえ、再試行してください。
        </p>
          <div className="flex justify-center">
            <Button size="lg" onClick={() => reset()} className="bg-blue-500 text-white rounded">
              再試行する
            </Button>
          </div>
      </div>
    </div>
  );
}

export default Error