// "use client";

// import React, { useContext, useEffect, useState } from 'react'
// import Cookies from 'js-cookie'
// import { UserIdContext } from '../contexts/UserIdContext';

// const UserIdProvider = ({children}: { children: React.ReactNode }) => {

//   const [ userId ,setUserId ] = useState<number | null>(null);

//   const fetchUserId = Cookies.get('_care_loop_session')
//   console.log("cookieの値をチェック: ",fetchUserId)
//   // useEffectでトリガー管理
//   // useEffect( () => {
    
//   //   // 取得cookieを確認する
//   //   console.log("cookieの値をチェック: ",fetchUserId)
//   //   // setUserId(newId);
//   // },[fetchUserId]);
//   // エラーハンドリング(user_idの取得エラー)
//   return (
//     <UserIdContext.Provider value={userId}> 
//       {children}
//     </UserIdContext.Provider>
//   )
// }

// export default UserIdProvider