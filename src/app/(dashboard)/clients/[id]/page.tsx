import ClientInfoCard from '@/components/features/clients/client-card'
type Params = Promise<{id: string}>;

async function page( props: {params : Params}) {
  const params = await props.params;
  const id = params.id;
  return (
    <div className='gap-10 m-10'>
      <h1 className='text-5xl font-semibold text-center'> Informacion del cliente </h1>
      <ClientInfoCard id={id}/>
    </div>
  )
}

export default page
