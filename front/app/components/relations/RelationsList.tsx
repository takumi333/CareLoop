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
} from "@/components/ui/dialog"
import ErrorView from '../LocalError';
import { NewRelations } from '@/types';
import { ROLE_LABEL, STATUS_LABEL } from '@/lib/labels';
import Link from 'next/link';
import RelationNickNameEditor from './RelationNickNameEditor';


// swrに渡す用に作成し直して、型セット
// type RelationData = {
//   user_relations: Array<{
//     accepted_at: string | null,
//     requested_at: string,
//     status: string,
//     receiver: {
//       id: number,
//       name: string,
//       provider: string,
//       role: string,
//       uid: string,
//       profile: {
//         image: string,
//         name: string,
//         partner_id: number,
//       }
//     },
//     requester: {
//       id: number,
//       name: string,
//       provider: string,
//       role: string,
//       uid: string,
//       profile: {
//         image: string,
//         name: string,
//         partner_id: number,
//       }
//     }
//   }>;
// }

type Profile = { image: string; name: string; partner_id: number };

type LiteUser = {
  id: number,
  name: string,
  provider: string,
  role: string,
  uid: string,
  profile: Profile,
};

type UserRelation = {
  accepted_at: string | null,
  requested_at: string,
  status: "pending" | "accepted" | "rejected",
  receiver: LiteUser,
  requester: LiteUser,
  nicknames?: Array<{name: string}>,  // 名前変更されていないユーザーもいる為、?を付けた
};

type RelationData = { user_relations: UserRelation[] };



const RelationsList = ({sessionId}: {sessionId: string}) => {
  const [isRelationAddFormModal, setAddFormModal] = useState(false);
  const [isEditNickNameModal, setEditNickNameModal] = useState(false);
  const [partnerId, setPartnerId] = useState<number | undefined>();
  
  const fetcher = (url: string) => clientAxiosInstance.get(url).then(res => res.data);

  const {data: relations, error: isError, isLoading, mutate} = useSWR<RelationData>("/user-relations", fetcher);
  // console.log("relationsチェック",relations)

  
  
  // console.log("relationsチェック: ", relations)
  // UIで必要な値のみを抽出
  const newRelations: Array<NewRelations> = relations?.user_relations.map((relation: any) => {
    const me = Number(sessionId);
    const partner = relation.requester.id === me ? relation.receiver : relation.requester;  // ログインユーザーと関係者関係にあるユーザー抽出

    const nickname = relation.nicknames[0]?.name ?? partner.profile.name;
      
    return {
      id: partner.id,
      partner_id: partner.profile.partner_id,
      image: partner.image,
      name: nickname, // nickname: {name: value}が存在しなければprofile.nameを使用するロジックに修正する
      role: partner.role,
      status: relation.status
    }
  }) ?? [] as Array<NewRelations>;



  const relationAddFormModalHandler = () => {
    setAddFormModal(true);
  }

  const editNickNameModalHandler = (partner_id: number) => {
    setPartnerId(partner_id);
    setEditNickNameModal(true);
  }

  if(isLoading) return <Loading />;
  if(isError) return <ErrorView onRetry={() => mutate()}/>;


  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <div className="pt-4 flex justify-center w-full font-bold text-2xl border-b-2">
        <h1>関係者リスト</h1>
      </div>

      <div className="flex justify-end space-x-2">
        <Button onClick={relationAddFormModalHandler}>関係者を追加</Button>
        <Button variant="outline">
          <Link href="/dashboard">戻る</Link>
        </Button>
      </div>

      {/* 関係者追加&ニックネーム変更モーダル */}
      <Dialog open={isRelationAddFormModal} onOpenChange={setAddFormModal}>
      {isRelationAddFormModal && (
        <RelationAddForm close={setAddFormModal} mutate={mutate}/>
      )}
      </Dialog>
      <Dialog open={isEditNickNameModal} onOpenChange={setEditNickNameModal}>
        {isEditNickNameModal && (
          <RelationNickNameEditor close={setEditNickNameModal} mutate={mutate} sessionId={sessionId} partnerId={partnerId}/>
        )}
      </Dialog>


      {/* 関係者リストが1件以上存在するか分岐 */}
      {newRelations.length === 0 ? (
        <div className="flex justify-center py-8 text-muted-foreground">
          まだ関係者リストに追加されていません。
        </div>
      ) : (
        <ul className="space-y-4">
          {newRelations.map((rel) => (
            <li key={rel.id} className="flex justify-center">
              <Card className="w-3/4">
                <CardContent className="flex items-center space-x-4 p-4">
 
                  <div >
                    {rel.image ? rel.image : <UserRound size={80} className="rounded-full bg-muted object-cover" /> }
                  </div>

                  <div className="flex-1">
                    <div className="flex gap-1 text-lg font-semibold ">
                      <div className='text-gray-800'>
                        {rel.name}
                      </div>
                      <div className=" px-2 py-0.5 text-sm text-yellow-800">
                       ({STATUS_LABEL[rel.status]})
                      </div>
                    </div>
                    <span className="inline-block mt-1 px-2 py-0.5 text-sm font-medium bg-green-100 text-green-800 rounded">
                      {ROLE_LABEL[rel.role]}
                    </span>
                  </div>

                  <Button size="sm" className="whitespace-nowrap">
                    チャット
                  </Button>

                  <Button onClick={() => editNickNameModalHandler(rel.partner_id)} size="sm" className="p-2 hover:text-gray-800 hover:bg-gray-100 rounded">
                    <Pen />
                  </Button>

                  {/* 関係者削除機能はv2で実装 */}
                  {/* <Button size="sm" className="p-2 hover:text-gray-800 hover:bg-gray-100 rounded">
                    <Trash2 />
                  </Button> */}

                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div> 
  )
}

export default RelationsList