import coreAxiosInstance from "./core";
import { cookies } from 'next/headers'

export const serverAxiosInstance = coreAxiosInstance;

serverAxiosInstance.interceptors.request.use(async config => {
  // interceptors 内で必ず cookies() を再取して、毎リクエスト値が変わる仕様に。
  // →Nextのサーバー側モジュールはプロセス内で使い回しの為、毎回呼び出ししないと、インターセプタが固定されて、他人のcookie情報が送信される事故が起きる
  const cookie = (await cookies()).toString();
   config.headers.Cookie = cookie;
  return config;
  }, (error) => {
    // ブラウザconosleでなく、ログ出力するコード作成
    console.error("cookieをヘッダーにセットできませんでした。");
    return Promise.reject(error);
  }
);