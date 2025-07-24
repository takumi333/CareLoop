import InputForm from '@/app/components/my-page/NameInlineEditor'
import Loading from '@/app/loading';
import { auth } from '@/auth';
import { serverAxiosInstance } from '@/lib/axiosInstance/server';
import React from 'react'

type ProfileNameRes = { name: string };

const NameEdit = async () => {
  const session = await auth()
  if (!session) return <Loading />;
  const sessionId = session.user.user_id;
  
  const res = await serverAxiosInstance.get<ProfileNameRes>(`/profiles/${sessionId}/edit`);
  const { name } = res.data;

  return (
    <div className='min-h-screen flex justify-center items-center px-4'>
      <div className='w-full max-w-md space-y-4'>
        <div className="flex items-center gap-2">
          <span>現在の名前:</span>
          <span>{name}</span>
        </div>
        {/* <InputForm /> */}
      </div>
    </div>
    
  )
}

export default NameEdit
