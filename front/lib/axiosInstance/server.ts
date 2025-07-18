import coreAxiosInstance from "./core";
import { cookies } from 'next/headers'

export const serverAxiosInstance = coreAxiosInstance;

serverAxiosInstance.interceptors.request.use(async config => {
  // interceptors 内で必ず cookies() を再取して、毎リクエスト値が変わる仕様に。
  // →Nextのサーバー側モジュールはプロセス内で使い回しの為、毎回呼び出ししないと、インターセプタが固定されて、他人のcookie情報が送信される事故が起きる

  const cookie = (await cookies()).get('_care_loop_session')

  if(cookie){
    console.log("取得cookie名を表示!!",cookie.name)
    console.log("取得cookieの値を表示!!", cookie.value)
  }


  
  // cookie取得確認用コード
  //   const cookie = (await cookies()).getAll().map((c) => {
  //     console.log("取得cookie名を表示!!", c.name);
  //     console.log("取得cookieの値を表示!!", c.value);
  // })
  // if (cookie) {
  //   cookie.map((c) => {
  //     console.log("取得cookie名を表示!!", c.name)
  //     console.log("取得cookieの値を表示!!", c.value)
  //  })
    
   config.headers.Cookie = cookie;
   console.log("ヘッダーにセットしたcookieを確認", cookie)
  return config;
  }, (error) => {
    // ブラウザconosleでなく、ログ出力するコード作成
    console.error("cookieをヘッダーにセットできませんでした。");
    return Promise.reject(error);
  }
);