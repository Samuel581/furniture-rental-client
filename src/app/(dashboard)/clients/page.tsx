import ClientsDisplayTable from '@/components/clients/clients-display-table'
import { Button } from '@/components/ui/button'
import React from 'react'


function page() {
  
  return (
    <div className='gap-5'>
      <h1 className='font-bold text-3xl text-center'>Clientes en sistema</h1>
      <ClientsDisplayTable/>
    </div>
  )
}

export default page
