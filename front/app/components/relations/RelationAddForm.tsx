"use client"

import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const RelationAddForm = ({ close }: { close: (value: React.SetStateAction<boolean>) => void}) => {

  const submitHandler = () => {
    close(false)
  }


  return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>関係者追加フォーム</DialogTitle>
          <DialogDescription>
            関係者に追加したい方のpartner_idを入力して下さい。
          </DialogDescription>
        </DialogHeader>
        {/* フォームをここに作成 */}
      </DialogContent>
  )
}

export default RelationAddForm