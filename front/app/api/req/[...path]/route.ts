import { serverAxiosInstance } from "@/lib/axiosInstance/server";
import { NextRequest, NextResponse } from "next/server";
import type { Method } from "axios";
import { cookies } from "next/headers";
import setCookieParser, { Cookie as ParsedCookie } from "set-cookie-parser";


const handler = async (req: NextRequest, context: { params: Promise<{ path: string[] }> }) => {

  const { path } = await context.params
  const urlPath = `/${path.join("/")}${req.nextUrl.search}`;

  // axiosのMethod型は小文字ではなく、大文字の為変換
  const method = req.method.toLowerCase() as Method;

  // GET以外は、body必須の為、body必要判定する
  const needsBody = !["GET", 'HEAD'].includes(req.method);
  const data = needsBody ? await req.json() : undefined;


  try {
    
    const res = await serverAxiosInstance.request({
      url: urlPath, // baseURL+url
      method,
      data,
    });


    const nextRes = NextResponse.json(res.data, {
      status: res.status,
      // headers: res.headers as any,
    });


    // 新規で送られてきたset-cookieを再度ブラウザに転送する
    const rawSetCookie = res.headers["set-cookie"];
            
    if (rawSetCookie) {
      // decodeValues: falseにしないと、(parse時 + cookie格納時)の2重デコードになり「cookieの値が変形して破損する」
      const parsed: ParsedCookie[] = setCookieParser(rawSetCookie, { decodeValues: false, map: false });

      for (const c of parsed) {
        nextRes.cookies.set({
          name: c.name,
          value: c.value,
          // path...どのドメインでのreq時にも、cookieを送信可能にする為ルートに設定
          path: c.path ?? "/",
          httpOnly: c.httpOnly,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          expires:  c.expires,
        });
      }

     } else {
       console.error("Rails レスポンスに Set-Cookie ヘッダーがありません。");
     };
  
    
    
    console.log("nextResのset-cookieを確認する", nextRes)
    return nextRes;

  } catch (error) {

    console.error("error情報: ",error);
    return NextResponse.json({ message: "proxyでエラーが発生しました。" }, { status: 500 });

  }
}

export { handler as GET, handler as HEAD, handler as POST, handler as PATCH, handler as PUT, handler as DELETE };

// export const GET = handler;
// export const POST = handler;
// export const PATCH = handler;
// export const PUT = handler;
// export const DELETE = handler;