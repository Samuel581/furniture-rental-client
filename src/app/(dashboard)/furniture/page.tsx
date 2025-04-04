import FurnituresDisplayTable from '@/components/features/furniture/furniture-display-table'
import React from 'react'

function page() {
  return (
    <div className='gap-5'>
      <h1 className='font-bold text-3xl text-center'>Muebles en sistema</h1>
      <FurnituresDisplayTable />
    </div>
  )
}

export default page
