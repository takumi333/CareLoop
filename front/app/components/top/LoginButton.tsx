"use client"

import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

import React from 'react'
import Cookies from 'js-cookie'


type Props = {
  provider: "credentials" | "line",
  role?: "patient" | "home_care_giver" | "medical_personal",
}

const LoginButton = ({provider, role}: Props) => {
  const Login = async () => {
    console.log("props確認!!",provider, role)
    if (provider === "line" && role) {
      Cookies.set('role', role);
    } else {
      if (provider === "line") throw new Error("rolePropsが存在しません。");
    }
    await signIn(provider, { redirectTo: "/dashboard" })
  };

  return (
    <>
      {provider === "credentials" ?
        <Button onClick={() => Login()}>ゲストログイン</Button>
      :
        <Button onClick={() => Login()}>Lineログイン</Button>
      }
    </> 
  )
}

export default LoginButton