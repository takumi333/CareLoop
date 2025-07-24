import { cookies } from 'next/headers';
import axios from "axios";


const resolveBaseURL = () => {
  if (process.env.NODE_ENV === "development") {
    return `http://back:3000/api/v1`;
  } else {
    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1`;
  }
}

export const serverAxiosInstance = axios.create({
  baseURL: resolveBaseURL(),
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});


serverAxiosInstance.interceptors.request.use(async config => {
  // サーバー処理は、手動でreqヘッダーにcookieセットしないと、ユーザー検証出来ない
  // ※必ずcookieを再取して、毎リクエスト値が変える
  // →Nextのサーバー側モジュールはプロセス内で使い回しの為、毎回呼び出ししないと、インターセプタが固定されて、他人のcookie情報が送信される事故が起きる

  const cookie = (await cookies()).get('_care_loop_session')
    
  if (cookie) {
    // console.log("取得cookie名を表示!!",cookie.name)
    // console.log("取得cookieの値を表示!!", cookie.value)
    const cookieHeader = `${cookie.name}=${cookie.value}`;

    config.headers.Cookie = cookieHeader
    // console.log("ヘッダーにセットしたcookieを確認", config.headers.Cookie)
  }
   
  return config;

  }, (error) => {
    console.error("cookieをヘッダーにセットできませんでした。");
    return Promise.reject(error);
  }
);