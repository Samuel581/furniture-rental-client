"use client";
import { Phone, Map, Notebook } from "lucide-react";
import { clientsService } from "@/services/client";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
interface ClientInfoCardProps {
  id: string;
}
const MapComponent = dynamic(() => import("../misc/google-map"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-gray-100 animate-pulse" />,
});

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

  // Let's add some validation to ensure we have valid coordinates
  if (!client?.latitude || !client?.longitude) {
    console.warn("Missing coordinates for client:", client?.id);
    return <div>Invalid client location data</div>;
  }

  const center = {
    lat: client.latitude,
    lng: client.longitude,
  };

  // Add some console logging to help debug
  console.log("Center coordinates:", center);

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
        <div className="w-full">
          <MapComponent center={center} zoom={15} />
        </div>
      </div>
    </>
  );
}

export default ClientInfoCard;
