import FurnituresDisplayTable from '@/components/features/furniture/FurnituresDisplayTable'
import React from 'react'

function page() {
  return (
    <div className='gap-5'>
      <h1 className='font-bold text-3xl text-center'>Clientes en sistema</h1>
      <FurnituresDisplayTable />
    </div>
  )
}

export default page
