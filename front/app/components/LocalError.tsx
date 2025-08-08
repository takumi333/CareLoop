"use client"

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "react-toastify";

type ErrorViewProps = {
  onRetry?: () => void
}

export default function ErrorView({ onRetry }: ErrorViewProps) {

  const customId = "custom-id-yes";
  useEffect(() => {
    toast.error("データ取得に失敗しました", {toastId: customId});
    console.log("SWR fetcher error");
  }, []);

  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow">
        <h2 className="mb-2 text-center text-lg font-semibold text-red-600">
          データ取得に失敗しました
        </h2>
        <p className="mb-4 text-center text-sm text-muted-foreground">
          ネットワーク状況をご確認のうえ、再試行してください。
        </p>
        {onRetry && (
          <div className="flex justify-center">
            <Button size="lg" onClick={onRetry} className="bg-blue-500 text-white rounded">
              再試行する
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}