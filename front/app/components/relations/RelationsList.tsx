"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useProfile } from '@/hooks/useProfile';
import RelationAddForm from './RelationAddForm';
import { clientAxiosInstance } from '@/lib/axiosInstance/client';
import useSWR from 'swr';
import Loading from '@/app/loading';
import { Pen } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { UserRound } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"


// type relationProps = {
//   profile: {
//     image: string,
//     name: string,
//     role: string,
//   }
//   sessionId: string,
// }

type relationList = {
  image: string,
  partner_id: number,
  name: string,
  user: {
    id: number,
    name: string,
    provider: string,
    role: string,
    uid: string
  }
}

const RelationsList = ({sessionId}: {sessionId: string}) => {
  const [isRelationAddFormModal, setAddFormModal] = useState(false);
  const [isEditNickNameModal, setEditNickNameModal] = useState(false);
  
  const fetcher = (url: string) => clientAxiosInstance.get(url).then(res => res.data);

  const {data: relations, error: isError, isLoading, mutate} = useSWR("/user-relations", fetcher);

  if(isLoading) return <Loading />;
  console.log("relationsチェック: ", relations)
  // const relationUser = relations.profile;
  const relationList: Array<relationList> = [relations];
  console.log("relationUserチェック: ", relationList)




  const relationAddFormModalHandler = () => {
    setAddFormModal(true);
  }

  const editNickNameModalHandler = () => {
    setAddFormModal(true);
  }



  // 関係者が1件もない場合、早期return
  if (relationList?.length === 0 ) {
    return (
      <div className="flex justify-center py-8 text-muted-foreground">
        まだ関係者リストに追加されていません。
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
        {/* ヘッダー */}
        <div className="pt-4 flex justify-center w-full font-bold text-2xl border-b-2">
          <h1>関係者リスト</h1>
        </div>

        <div className="flex justify-end space-x-2">
          <Button onClick={relationAddFormModalHandler}>関係者を追加</Button>
          <Button variant="outline">戻る</Button>
        </div>

        <Dialog open={isRelationAddFormModal} onOpenChange={setAddFormModal}>
          <RelationAddForm close={setAddFormModal} mutate={mutate}/>
        </Dialog>
        {/* {isRelationAddFormModal && <RelationAddForm />} */}
      {/* {isEditNickNameModal && <RelationAddForm />} */}



        <ul className="space-y-4">
          {relationList.map((data: any) => (
            <li key={data.partner_id} className="flex justify-center">
              <Card className="w-3/4">
                <CardContent className="flex items-center space-x-4 p-4">
 
                  <div >
                    {data.image ? data.image : <UserRound size={80} className="rounded-full bg-muted object-cover" /> }
                  </div>

                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-800">
                      {data.name}
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-sm font-medium bg-green-100 text-green-800 rounded">
                      {data.user.role}
                    </span>
                  </div>

                  <Button size="sm" className="whitespace-nowrap">
                    チャット
                  </Button>

                  <Button size="sm" className="p-2 hover:text-gray-800 hover:bg-gray-100 rounded">
                    <Pen />
                  </Button>

                  <Button size="sm" className="p-2 hover:text-gray-800 hover:bg-gray-100 rounded">
                    <Trash2 />
                  </Button>

                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>

    </>
    
  )
}

export default RelationsList