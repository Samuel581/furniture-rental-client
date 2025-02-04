'use client'
import React from 'react'
import { useParams } from 'next/navigation'

function Page() {
    const { id } = useParams()
  return (
    <div>
      This is the edit page for the furniture with id: {id}
    </div>
  )
}

export default Page
