"use client"

import React, { useContext } from 'react'
// import { UserIdContext } from '../contexts/UserIdContext';

const Test = () => {
  const context = useContext(UserIdContext);
  console.log("contextの戻り値を確認!!", context);
  return (
    <div>サーバーサイド処理でcontextのconsoleを見るためのコンポーネントです</div>
  ) 
}

export default Test