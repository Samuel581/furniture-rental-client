import FurnitureForm from '@/components/features/furniture/FurnitureForm'
import React from 'react'

export default function Page() {
  return (
    <div className='gap-10'>
      <h1 className='text-3xl font-bold text-center'> Creacion de nuevo mueble </h1>
      <FurnitureForm/>
    </div>
  )
}
