import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'

interface DashCardProps {
    title?: string;
}

function DashCard({ title }: DashCardProps) {
  return (
    <Card>
      <CardHeader className='w-[550px]'>
        <p className='text-xxl font-semibold'>{ title }</p>
      </CardHeader>
      <CardContent className='bg-yellow-200'>

      </CardContent>
    </Card>
  )
}

export default DashCard
