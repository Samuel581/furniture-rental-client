import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DataCardProps {
    title?: string; // Make title optional if you want to allow empty cards
}

function DataCard( { title }: DataCardProps ) {
  return (
    <Card className='w-[400px]'>
        <CardHeader>
            <CardTitle className='text-center'>{title}</CardTitle>
        </CardHeader>
        <CardContent className='bg-gray-300 grid place-items-center h-32'>
            <p className='text-5xl text-center'>200</p>
        </CardContent>
    </Card>
  )
}

export default DataCard
