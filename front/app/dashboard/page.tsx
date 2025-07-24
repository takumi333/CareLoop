import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link'
import React from 'react'

const Dashboard = async () => {
  const session = await auth();
  console.log("sessionでuser_idの値をとれているか確認!!" ,session);
  return (
    <>
      <div>ダッシュボードページです。</div> 
      <Button>
        <Link href="/my-page">マイページへ</Link>
      </Button>
      
    </>
      
  )
}

export default Dashboard