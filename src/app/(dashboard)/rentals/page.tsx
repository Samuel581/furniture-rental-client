import RentalsCalendar from '@/components/features/rentals/rentals-calendar'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Plus } from 'lucide-react'

function page() {
  return (
    <div>
      <h1 className='font-bold text-3xl text-center'>Calendario de reservas</h1>
      <p className='text-center pb-10'>Visualiza las reservas de muebles y eventos futuros</p>
      <RentalsCalendar/>
      <Button className='mt-5 end-0'><Plus/>Crear renta</Button>
    </div>
  )
}

export default page
