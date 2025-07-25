import { serverAxiosInstance } from "@/lib/axiosInstance/server";
import { NextRequest, NextResponse } from "next/server";
import type { Method } from "axios";


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
  
    const nextRes = new NextResponse(res.data, {
      status: res.status,
      headers: res.headers as any,
    });

    return res;

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