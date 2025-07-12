import { redirect, RedirectType } from 'next/navigation'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { signIn } from "@/auth";
import Link from 'next/link';



export default function Top() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-36">アプリの解説&ゲストログイン時の注意書き</div>
        <hr className="my-7 h-px w-3/4 border-x border-black"/>
      </div>

      <div className="flex items-center justify-evenly">
        <Card>
          <CardHeader>
            <CardTitle>在宅介護者はこちらから</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <form action={async () => {
              "use server"
              await signIn(undefined, { redirectTo: "/dashboard" })
            }}>
              <Button type="submit">ゲストログイン</Button>
            </form>
            <Button>Lineログイン</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>患者はこちらから</CardTitle>
          </CardHeader>
          <CardContent>
            <Button>Lineログイン</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>医療関係者はこちらから</CardTitle>
          </CardHeader>
          <CardContent>
            <Button>Lineログイン</Button>
          </CardContent>
        </Card>
      </div>
      {/* <form className="w-full" action={async () => {
              "use server"
              redirect("/top");
              // await new Promise((resolve) => setTimeout(() => {
                
              //   return resolve
              // }, 5000));
            }}>
              <Button type="submit">ロード確認ボタン</Button>
            </form> */}
            
    </>
  );
}
