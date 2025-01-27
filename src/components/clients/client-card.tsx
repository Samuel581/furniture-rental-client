"use client";
import { Phone, Map, Notebook } from "lucide-react";
import { clientsService } from "@/services/client";
import { useQuery } from "@tanstack/react-query";
import GoogleMap from "../misc/google-map";
interface ClientInfoCardProps {
  id: string;
}

function ClientInfoCard({ id }: ClientInfoCardProps) {
  const {
    data: client,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["client", id],
    queryFn: () => clientsService.getById(id),
  });

  if (isLoading) {
    return <div>Loading clients...</div>;
  }

  if (error) {
    return <div>Error loading clients</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <h3 className="text-3xl font-semibold text-gray-900">{client?.name}</h3>
        <div className="flex items-center gap-2 text-gray-600">
          <Phone size={16} />
          <p className="text-xl">{client?.phone}</p>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Map size={16} />
          <p className="text-xl">{client?.addressReference}</p>
        </div>
        {client?.notes && (
          <div className="flex items-center gap-2 text-gray-600">
            <Notebook size={16} />
            <p className="text-xl">{client.notes}</p>
          </div>
        )}
      </div>
      <GoogleMap lat={client?.latitude ?? 0} lng={client?.longitude ?? 0} />
    </>
  );
}

export default ClientInfoCard;
