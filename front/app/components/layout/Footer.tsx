import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
      <footer className='w-full border-t px-8 py-6 bg-blue-300'>
        {/* <div className="flex justify-center">
          <Link href="/">プライバシーポリシー</Link>
        </div> */}
        <div className='flex justify-center bg-blue-300'>
          <p>© 2025 CareLoop</p>
        </div>
      </footer>
  )
}

export default Footer