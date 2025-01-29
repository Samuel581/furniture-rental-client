import Form from '@/components/clients/client-edit-form';
import React from 'react'

interface PageProps {
    params: {
      id: string;
    };
  }

async function page({params}: PageProps) {
    const {id} = await params;
  return (
    <main className="container max-w-md py-12">
      <h1 className="text-2xl font-bold mb-6">User Registration</h1>
      <Form />
    </main>
  )
}

export default page
