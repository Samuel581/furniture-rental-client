import ClientInfoCard from '@/components/clients/client-card'
import React from 'react'
interface PageProps {
  params: {
    id: string;
  };
}

async function page({ params }: PageProps) {
  const { id } = await params;
  return (
    <div className='gap-10 m-10'>
      <h1 className='text-5xl font-semibold text-center'> Informacion del cliente </h1>
      {/* Include the id that gets passed fron the clients page into the [id] page */}

      <ClientInfoCard id={id}/>
    </div>
  )
}

export default page
