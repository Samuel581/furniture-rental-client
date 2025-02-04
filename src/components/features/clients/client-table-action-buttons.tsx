import { Client } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import { Eye, UserPen, UserX } from "lucide-react";

export const ActionButons = ({ client }: { client: Client }) => {
    const router = useRouter();
    return (
      <div className="flex flex-row justify-center gap-2">
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded"
          onClick={() => router.push(`/clients/${client.id}`)}
        >
          <Eye />
        </button>
        <button
          className="px-2 py-1 bg-black text-white rounded"
          onClick={() => router.push(`/clients/${client.id}/edit`)}
        >
          <UserPen />
        </button>
        <button className="px-2 py-1 bg-red-500 text-white rounded">
          <UserX />
        </button>
      </div>
    );
  };