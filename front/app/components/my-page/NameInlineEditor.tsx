"use client"

import React, { useEffect, useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { clientAxiosInstance } from '@/lib/axiosInstance/client'
import { useSession } from 'next-auth/react'
import Loading from '@/app/loading'
import Link from 'next/link'



// type profileProps = { name :string }

const NameInlineEditor = () => {
  const [editing, setEditing] = useState(false);

  const renameHandler = () => {
    setEditing(true);
  }


  const formSchema = z.object({
    username: z.string().min(2, {
      message: "名前は、最低2文字以上でないと変更できません。",
    }).max(10 ,{
      message: "名前は、最大10文字以下にして下さい。",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })



  const { data, status } = useSession();
  if (status === "loading") return <Loading />;
  const sessionId = data?.user.user_id;
  
  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    // my-pageに記載しているaxiosSSRが実行されると、「フルページ更新」にならない？
    // やっぱり、SWRを使用して、更新処理後、mutateを使用して、SWRにて取得させた方が、最新状態での、CSR的な部分更新としてUI表示にならないか？
    // res.dataに型定義をして、
    const res = await clientAxiosInstance.patch(`/profiles/${sessionId}`, {name: value.username});
    console.log(res)
    // resが、status:okか検証
    // my-pageに遷移

    // console.log(value)
  }

  return (
    <>
      {!editing ? 
          <div>
            <Button size= "sm" onClick={renameHandler}>名前を変更する</Button>
          </div>
      :
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className='flex items-center gap-2'>
                  <FormLabel className='text-base'>新しい名前: </FormLabel>
                  <FormControl>
                    <Input className='w-1/2' placeholder="名前を入力してください" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      }
    </>
  )
}

export default NameInlineEditor