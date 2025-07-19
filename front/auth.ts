import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Line from "next-auth/providers/line"
import { serverAxiosInstance } from "./lib/axiosInstance/server"
import { z } from "zod";
import { cookies } from "next/headers";
import setCookieParser, { Cookie as ParsedCookie } from "set-cookie-parser";


const authDataSchema = z.object({
  user: z.object({
    id: z.coerce.string(),
    uid: z.string(),
    name: z.string(),
    provider: z.string(),
    role: z.string(),
    profile: z.object({
      partner_id: z.number(),
    }),
  })
});

type AuthData = z.infer<typeof authDataSchema>;


export const { handlers, signIn, signOut, auth } = NextAuth(req => {
  return {
    providers: [
      Credentials({
        authorize: async (_credentials) => {
   
          // Rails APIへのDBへリクエスト
          // user情報にid無いと、auth.jsは認証済みと検知しない
          try {
            const res = await serverAxiosInstance.post("/auth/guest", {
              user: {
                provider: 'guest'
              }
            })
  
            if (![200, 201].includes(res.status)) {
              console.error("ユーザー検証に失敗しました。")
              return null;
            }
  
            console.log("レスポンスデータ！！！！", res.data)
            const data: AuthData = authDataSchema.parse(res.data);

            // set-cookieをブラウザへ転送
            console.log("set-cookieの戻りを確認!!", res.headers["set-cookie"])
            const rawSetCookie = res.headers["set-cookie"];
            
            if (rawSetCookie) {
              const parsed: ParsedCookie[] = setCookieParser(rawSetCookie, { map: false });

              for (const c of parsed) {
                // 環境毎に分岐（本番: None + Secure, 開発: Lax）
                const secure = process.env.NODE_ENV === "production";
                const sameSite = secure ? "none" : "lax";
  
                // ブラウザcookieに、set-cookieをセット
                (await cookies()).set(c.name, c.value, {
                  // path...どのドメインでのreq時にも、cookieを送信可能にする為ルートに設定
                  path: c.path ?? "/",
                  httpOnly: c.httpOnly,
                  secure,
                  sameSite: sameSite,
                });
              }
            } else {
              console.error("Rails レスポンスに Set-Cookie ヘッダーがありません。");
            };
  
            return {
              // userオブジェクトにセットするidの値を見直しする！！！！！
              // ここでのuser.idは、nextauth側で格納するデータのidを指す為、uidやsubをidに格納した方が良い
              id: data.user.id,
              uid: data.user.uid,
              name: data.user.name,
              provider: data.user.provider,
              role: data.user.role,
              partner_id: data.user.profile.partner_id
            }
          } catch (error) {
            // 例外エラー時
            console.error("意図しないエラーが発生しました", error)
            return null;
          }
        },
      }),
      // プロバイダーとのやりとりのみを記載(profile情報を上書きして、userオブジェクトに代入)
      Line({
        profile(profile) {
          const user = {
            id: profile.sub,
            uid:  profile.sub,
            name: profile.name,
            role: "",
          };
          return user
        },
      }),
    ],
    session: {
      maxAge: 30 * 24 * 60 * 60,
      strategy: "jwt",
      updateAge: 24 * 60 * 60
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
      // middlewareに認可は集約
      // authorized: async ({ auth }) => {
  
      //   return !!auth
      // },
      async jwt({ account, token, user}) {
        if (user) {
          token.id = user.id;          
          token.uid = user.uid; 
          token.name = user.name;
          token.provider = user.provider;
          token.role = user.role;
          token.partner_id = user.partner_id;
          // token.access_token = account?.access_token;
          // if(user.provider) {
          //   // ゲストログインの場合
          //   token.provider = user?.provider;
          // } else {
          //   // Lineログインの場合
          //   token.provider = account?.provider;
          // }
        }
  
        return token;
      },
      async session({ session, token }) {
        if (session.user) { 
          session.user.id = token.id;        
          session.user.uid = token.uid as string; 
          session.user.name = token.name;
          session.user.provider = token?.provider;
          session.user.access_token = token.role;
          // session.user.access_token = token?.access_token;
          session.user.provider = token?.partner_id as string; 
        }
        return session;
      },
      async signIn({ user, account, profile }) {
        if(account && account.provider === "line") {
          try {

            const cookieStore = await cookies();

            // cookieからroleを取得、userに代入
            const role = cookieStore.get("role");
            console.log( "roleの値をチェック!!",role)
            if (!role) return false;
            user.role = role.value;
            // 即削除
            (await cookies()).delete("role")
           

            const res = await serverAxiosInstance.post("/auth/line", {
              user: {
                uid:  user.uid,
                name: user.name,
                provider: 'line', 
                role: user.role,
              }
            })
  
            if (![200, 201].includes(res.status)) {
              console.error("ユーザー検証に失敗しました。")
              return false;
            }

            // session_cookieをブラウザcookieに転送(初回時に、cookie転送しとけば、2回目以降のreqでcookieからuser_id取得可能になる)
            // console.log("set-cookieの戻りを確認!!",res.headers)
            console.log("set-cookieの戻りを確認!!", res.headers["set-cookie"])
            const rawSetCookie = res.headers["set-cookie"];
            
            if (rawSetCookie) {
              // decodeValues: falseにしないと、(parse時 + cookie格納時)の2重デコードになり「cookieの値が変形して破損する」
              const parsed: ParsedCookie[] = setCookieParser(rawSetCookie, { decodeValues: false, map: false });

              for (const c of parsed) {
                // 環境毎に分岐（本番: None + Secure, 開発: Lax）
                const secure = process.env.NODE_ENV === "production";
                const sameSite = secure ? "none" : "lax";
  
                // ブラウザcookieに、set-cookieをセット
                cookieStore.set(c.name, c.value, {
                  // path...どのドメインでのreq時にも、cookieを送信可能にする為ルートに設定
                  path: c.path ?? "/",
                  httpOnly: c.httpOnly,
                  secure,
                  sameSite: sameSite,
                });
              }
            } else {
              console.error("Rails レスポンスに Set-Cookie ヘッダーがありません。");
            };

            
            // userオブジェクトに、UIロジックに必要になるデータを格納
            console.log("レスポンスデータ！！！！", res.data);
            const data: AuthData = authDataSchema.parse(res.data);
            user.provider = data.user.provider
            user.partner_id = data.user.profile.partner_id

            return true;
  

          } catch (error) {
            // 例外エラー時
            console.error("意図しないエラーが発生しました", error)
            return false;
          }
        } else {
          // ゲストログイン時
          if(!user) {
            console.error("ログイン認証に失敗しました。")
            return false;
          }
          return true;
        }      
      }
    },
    
  }
})
