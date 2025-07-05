"use client"

import { SelectedChapterIndexContext } from '@/context/SelectedChpaterIndex'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Provider = ({ children }) => {
  const { user } = useUser();
  const [userDetail,setUserDetail]=useState();
   const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const CreateNewUser = async () => {
    try {
      const result = await axios.post('/api/user', {
        email: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
      });
      console.log(result.data);
      setUserDetail(result.data);
    } catch (err) {
      console.error("User creation failed:", err);
    }
  }

  useEffect(() => {
    if (user) {
      CreateNewUser();
    }
  }, [user]);

  return( 
    <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
      <SelectedChapterIndexContext.Provider value={{ selectedChapterIndex, setSelectedChapterIndex }}>
  <div>{children}
  </div>
  </SelectedChapterIndexContext.Provider>
  </UserDetailContext.Provider>
  )
}

export default Provider;
