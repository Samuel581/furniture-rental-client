import React from 'react'
import { useRouter } from 'next/navigation'
import { Pencil } from 'lucide-react'
import { Combo } from '@/types/combo.interface'

function ComboTableDisplayButtons({ combo }: { combo: Combo }) {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-center gap-2">
      <button
        className="px-2 py-1 bg-black text-white rounded"
        onClick={() => router.push(`/combos/${combo.id}/edit`)}
      >
        <Pencil />
      </button>
    </div>
  )
}

export default ComboTableDisplayButtons
