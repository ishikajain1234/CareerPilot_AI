import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div>
      <h2 className=" font-bold text-3xl mb-5">Select Plan</h2>
      <PricingTable/></div>
  )
}

export default page