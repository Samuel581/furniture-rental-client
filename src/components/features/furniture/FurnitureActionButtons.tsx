import React from "react";
import { useRouter } from "next/navigation";
import { Eye, UserPen, UserX } from "lucide-react";
import { Furniture } from "@/types/furniture.interface";

function FurnitureActionButtons({ furniture}: { furniture: Furniture }) {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-evenly gap-2">
      <button
        className="px-2 py-1 bg-blue-500 text-white rounded"
        onClick={() => router.push(`/furniture/${furniture.id}`)}
      >
        <Eye />
      </button>
      <button
        className="px-2 py-1 bg-black text-white rounded"
        onClick={() => router.push(`/furniture/${furniture.id}/edit`)}
      >
        <UserPen />
      </button>
      <button className="px-2 py-1 bg-red-500 text-white rounded">
        <UserX />
      </button>
    </div>
  );
}

export default FurnitureActionButtons;
