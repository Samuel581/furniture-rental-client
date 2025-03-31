import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import React from 'react'
import { PlusIcon } from 'lucide-react';

function CreateFurnitureButton() {
    const router = useRouter();
  return (
    <Button onClick={() => router.push("/furniture/create")}>
        <div className="flex items-center">
            <PlusIcon size={20} />
            <span className="ml-2">Crear nuevo mueble
            </span>
        </div>
    </Button>
  )
}

export default CreateFurnitureButton
