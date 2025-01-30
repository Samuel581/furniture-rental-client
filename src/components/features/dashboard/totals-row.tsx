import React, { } from 'react'
import DataCard from './data-card'

function TotalsRow() {
  return (
    <div className='flex flex-row space-x-10 justify-between'>
      <DataCard title={'Total este mes'}/>
      <DataCard title={'Cantidad de rentas totales'}/>
      <DataCard title={'Cantidad de usuarios activos'}/>
    </div>
  )
}

export default TotalsRow
