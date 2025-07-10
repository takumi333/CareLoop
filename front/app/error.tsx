'use client'

import React, { useEffect } from 'react'

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const Error = ({error, reset,}: ErrorPageProps) => {

  useEffect(() => {
    console.error("予期せぬエラーが発生しました。" ,error, error.message)
  }, [error])

  return (
    <div>
      <h2>予期せぬ問題が発生しました！</h2>
      <button className='bg-blue-500' onClick={() => reset()}>もう一度やり直す</button>
    </div>
  )
}

export default Error