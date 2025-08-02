import { auth } from '@/auth';
import React from 'react'
import RelationsList from '../components/relations/RelationsList';
import { SWRConfig } from 'swr';
import { serverAxiosInstance } from '@/lib/axiosInstance/server';



const Relations = async () => {
  const session = await auth();
  if(!session) return;
  const sessionId = session.user.user_id;

  const res = await serverAxiosInstance.get("/user-relations");
  const relations = res.data;

  return (
    <SWRConfig value={{ fallback: {"/user-relations": relations}}}>
      <RelationsList sessionId={sessionId}/>  
    </SWRConfig>
  )
}

export default Relations