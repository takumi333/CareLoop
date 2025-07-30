"use client"

import React, { useEffect, useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { clientAxiosInstance } from '@/lib/axiosInstance/client'
import Loading from '@/app/loading'
import { Profile, RapProfile } from '@/types'
import { useProfile } from '@/hooks/useProfile'



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


const NameInlineEditor = ({ userId }: { userId: string }) => {
  const [editing, setEditing] = useState(false);
  const { profileData, isError, isLoading, mutate } = useProfile(userId);
  console.log(profileData);


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



  const renameHandler = () => {
    setEditing(true);
  }
  
  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const res = await clientAxiosInstance.patch<RapProfile>(`/profiles/${userId}`, {name: value.username});
      const newName = res.data.profile.name;
      if (!profileData)  { throw new Error("キャッシュを更新できませんでした。") };
      mutate({ profile: {...profileData.profile, name: newName }}, { revalidate: false });

    } catch (error) {

      // mutate処理以外でエラーが発生した場合のエラーハンドリング
      toast.error("データ取得に失敗しました", {
        toastId: customId
      });
    }
  }


  // ロード中&エラー時のハンドリング
  const customId = "custom-id-yes";
  useEffect(() => {
    if (isError) toast.error("データ取得に失敗しました", {
          toastId: customId
        });
        console.log("SWR fetcher error:", isError);
  }, [isError]);

  if (isLoading) return  <Loading />



  return (
    <>
      {!editing ? 
        <>
          <span>{profileData?.profile.name}</span>
          <Button size= "sm" onClick={renameHandler}>名前を変更する</Button>
        </>
          
      :
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    {/* <FormLabel className='text-base'>新しい名前: </FormLabel> */}
                    <FormControl>
                      <Input className='w-full' placeholder="名前を入力してください" {...field} />
                    </FormControl>
                    <Button type="submit">Submit</Button>
                  </div>
                  <FormMessage className="mt-1 text-red-500"/>
                </FormItem>
              )}
            />
          </form>
        </Form>
      }
    </>
  )
}

export default NameInlineEditor