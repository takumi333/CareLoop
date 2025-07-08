import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

// ログインユーザー戻り値データをチェック
export interface User {
  id: string;
  name: string;
  uid: string;
  provider: string;
  role: string;
}


export function useUser(id: string) {
  const { data, error, isLoading } = useSWR<User>(`${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  }
}