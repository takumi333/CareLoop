"use client"

import React from 'react'
import Link from 'next/link'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { clientAxiosInstance } from '@/lib/axiosInstance/client'
import { toast } from 'react-toastify'
import { KeyedMutator } from 'swr'


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { RelationAddFromProps } from '@/types'


const RelationNickNameEditor = ({ close, mutate, sessionId, partnerId }: RelationAddFromProps) => {

  const formSchema = z.object({
    nickname: z.string().max(10, {
      message: "ニックネームは、10文字以下である必要があります。",
    })
    .min(1, { 
      message: "ニックネームは、1文字以上である必要があります。" 
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const res = await clientAxiosInstance.patch(`/user-relations/${sessionId}/rename`, { 
        user_relation: {
          name: value.nickname,
          partner_id: partnerId, 
        }});
      await mutate();
      toast.success("関係者のネックネームを変更しました。");
      form.reset({ nickname: "" }); 
      close(false)

    } catch (error: any) {

      const customId = "custom-id-yes";
      
      console.log("名前変更処理に不備が起きました。",`${error.message}`)
      toast.error("関係者の名前が変更できませんでした。", {
        toastId: customId
      });
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>関係者のニックネーム変更フォーム</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel className='text-base'>ニックネーム: </FormLabel> */}
                <FormControl>
                  <Input placeholder="ニックネームを入力してください" {...field} />
                </FormControl>
                <FormMessage className="mt-1 text-red-500"/>
              </FormItem>
            )}
          />
          <div className='flex items-center justify-center'>
            <Button type="submit" size="sm" className='w-1/4 mt-4'>送信</Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}

export default RelationNickNameEditor