import { clientAxiosInstance } from "@/lib/axiosInstance/client";

// url引数にapi/v1以降のパスだけもらう
export async function fetcher<T = unknown>(url: string): Promise<T> {
  const res = await clientAxiosInstance.get<T>(url);
  return res.data;

  // 万が一、実装ミスでエンドポイントパスの不備でエラーの場合、SWRは{error}にセット。
  // 呼び出し側のUIで、iserrorがtrueの場合、error.tsxへ遷移させるロジック作成でいける
}