import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { serverAxiosInstance } from "./lib/axiosInstance/server"
import { z } from "zod";


const authDataSchema = z.object({
  id: z.string(),
  uid: z.string(),
  name: z.string(),
  provider: z.string(),
  role: z.string(),
});

type AuthData = z.infer<typeof authDataSchema>;


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (_credentials) => {
 
        // Rails APIへのDBへリクエスト
        // user情報にid無いと、auth.jsは認証済みと検知しない
        try {
          const res = await serverAxiosInstance.post("/guest", {
            user: {
              provider: 'guest'
            }
          })

          if (![200, 201].includes(res.status)) {
            console.error("ユーザー検証に失敗しました。")
            return null;
          }

          const data: AuthData = authDataSchema.parse(res.data);

          return {
            id: data.id,
            uid: data.uid,
            name: data.name,
            provider: data.provider,
            role: data.role
          }
        } catch (error) {
          // 例外エラー時
          console.error("意図しないエラーが発生しました", error)
          return null;
        }
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
    async jwt({ account, token, user }) {
      if (user) {
        token.id = user.id;          
        token.uid = user.uid; 
        token.name = user.name;
        token.access_token = account?.access_token;
        if(user.provider) {
          // ゲストログインの場合
          token.provider = user?.provider;
        } else {
          // Lineログインの場合
          token.provider = account?.provider;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) { 
        session.user.id = token.id;        
        session.user.uid = token.uid as string; 
        session.user.name = token.name;
        session.user.provider = token?.provider;
        session.user.access_token = token?.access_token;
        session.user.provider = token?.provider as string; 
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if(!user) {
        console.error("ログイン認証に失敗しました。")
        return false;
      }
      return true;
    }
  },
  
})