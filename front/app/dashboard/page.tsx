import { auth } from '@/auth';
import Link from 'next/link'
import React from 'react'

const Dashboard = async () => {
  const session = await auth();
  console.log("sessionでuser_idの値をとれているか確認!!" ,session);
  return (
      <div>ダッシュボードページです。</div> 
  )
}

export default Dashboard