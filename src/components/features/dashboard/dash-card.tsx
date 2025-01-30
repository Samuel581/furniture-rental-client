import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
interface DashCardProps {
    title?: string;
}

function DashCard({ title, children }: React.PropsWithChildren<DashCardProps>) {
  return (
    <Card className='w-[650px] h-[500px]'>
      <CardHeader className='text-center'>
        <p className='text-xxl font-semibold'>{ title }</p>
      </CardHeader>
      <CardContent className=''>
        {children}
      </CardContent>
    </Card>
  )
}

export default DashCard
