import React from 'react'
import DashCard from './dash-card'

function DashboardRows() {
  return (
    <div className='flex flex-row justify-around'>
      <DashCard title='Ventas por mes'/>
      <DashCard title='Usuarios con mas ganancias'/>
    </div>
  )
}

export default DashboardRows
