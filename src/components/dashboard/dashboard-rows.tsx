import React from 'react'
import DashCard from './dash-card'
import ClientTable from './client-table'
import RentalsGraph from './rentals-graph'

function DashboardRows() {
  return (
    <div className='flex flex-row justify-between'>
      <DashCard title='Ventas por mes'>
        <RentalsGraph/>
      </DashCard>
      <DashCard title='Usuarios con mas ganancias'>
        <ClientTable/>
      </DashCard>
    </div>
  )
}

export default DashboardRows
