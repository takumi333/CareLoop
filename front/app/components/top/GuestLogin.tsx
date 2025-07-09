'use client'

import React from 'react'

import { Button } from "@/components/ui/button"
import { guestAuth } from '@/app/actions/guestAuth'

const GuestLogin = () => {

  return (
    <form action={guestAuth}>
      <Button type="submit">ゲストログイン</Button>
    </form>
  )
}

export default GuestLogin