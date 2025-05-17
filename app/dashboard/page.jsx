import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InerviewList from './_components/InerviewList'

const Dashboard = () => {
  return (
    <div >
      <h2 className="fone-bold text-2xl">DashBoard</h2>
      <h2 className='text-gray-500'>Create and start your AI MockUp Interview</h2>
      <div className=' grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
      </div>
      <InerviewList/>
    </div>
  )
}

export default Dashboard