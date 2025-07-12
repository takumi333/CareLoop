import { auth } from '@/auth'
import Link from 'next/link'

const NotFound = async () => {
  const session = await auth()
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 p-4">
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-bold text-gray-800">Not Found</h2>
        <p className="text-lg text-gray-600">ページが見つかりませんでした</p>
        {session
          ? (
            <Link
              href="/dashboard"
              className="inline-block rounded-md bg-blue-300 px-6 py-2 text-white hover:bg-blue-600 transition"
            >
              ダッシュボードに戻る
            </Link>
          )
          : (
            <Link
              href="/top"
              className="inline-block rounded-md bg-blue-300 px-6 py-2 text-white hover:bg-blue-600 transition"
            >
              Topページに戻る
            </Link>
          )
        }
      </div>
    </div>
  )
} 

export default NotFound