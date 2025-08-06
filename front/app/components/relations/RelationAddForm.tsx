"use client"

import React from 'react'
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



type relationAddFromProps = {
  close: (value: React.SetStateAction<boolean>) => void,
  mutate:  KeyedMutator<any>
}


const RelationAddForm = ({ close, mutate }: relationAddFromProps) => {

  const formSchema = z.object({
    partner_id: z.string().length(10, {
      message: "partner_idは、10文字である必要があります。",
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partner_id: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const res = await clientAxiosInstance.post("/user-relations", { user_relation: { partner_id: value.partner_id }});
      await mutate();
      toast.success("追加する関係者へ申請を送信しました。");
      close(false)

    } catch (error: any) {

      console.log("関係者申請処理に不備が起きました。",`${error.message}`)
      toast.error("追加関係者への申請ができませんでした。", {
        toastId: customId
      });
    }
  }

  const customId = "custom-id-yes";



  return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>関係者追加フォーム</DialogTitle>
          <DialogDescription>
            関係者に追加したい方のpartner_idを入力して下さい。
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="partner_id"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel className='text-base'>partner_id: </FormLabel> */}
                  <FormControl>
                    <Input placeholder="partner_idを入力してください" {...field} />
                  </FormControl>
                  <FormMessage className="mt-1 text-red-500"/>
                </FormItem>
              )}
            />
            <div className='flex items-center justify-center'>
              <Button type="submit" size="sm" className='w-1/4 mt-4'>Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
  )
}

export default RelationAddForm