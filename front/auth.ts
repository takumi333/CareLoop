import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        // 正当なuser情報の保証をここで行う
        let user = null
 
        // provider: guestのJSONデータ作成
        // Rails APIへのDBへリクエスト
        // レスポンスで、uid/name/provider/roleを取得後、user変数に代入
        // レスポンスのデータが適切なものか検証ロジック作成
        return user  // user情報のidがないと、auth.jsは認証済みと検知しない
      },
    }),
  ],

  session: {
    maxAge: 30 * 24 * 60 * 60,
    strategy: "jwt",
    updateAge: 24 * 60 * 60
  },

  callbacks: {
    authorized: async ({ auth }) => {

      return !!auth
    },
    async jwt({ account, token, user }) {
      
      return token;
    },
    async session({ session, token }) {
      return session;
    },
    async signIn({ user, account, profile }) {
      // userオブジェクトの中身が存在するか？
      // 成功時: ダッシュボードページにリダイレクトするロジック作成
      // 失敗時: errorページにリダイレクト
      return false; // trueかfalseを返す必要がある
    }
  },
  
})