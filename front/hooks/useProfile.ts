import useSWR from "swr";
import { clientAxiosInstance } from "@/lib/axiosInstance/client";
import { RapProfile } from "@/types";




// url引数にapi/v1以降のパスだけもらう
function fetcher(url: string) {
  return clientAxiosInstance.get(url).then(res => res.data);
}

export function useProfile(id: string) {
  const { data, error, isLoading, mutate } = useSWR<RapProfile>(`/profiles/${id}`, fetcher, {
     revalidateOnMount: false, // マウント時に再リクエストさせず、SSRから取得データを渡す。
     shouldRetryOnError: false,  // エラー時に、無限レンダリングになるのを防ぐ。
     revalidateOnFocus: false, // UI上、フォーカス時のキャッシュ処理を無効。
     dedupingInterval: 3000, // 重複レンダリングによる重複フェッチを防止。
    });

  return {
    profileData: data,
    isLoading,
    isError: error,
    mutate,
  }
}