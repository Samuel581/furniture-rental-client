"use client";
import { Phone, Map, Notebook } from "lucide-react";
import { clientsService } from "@/services/client.service";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
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
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });

  
const MapComponent = dynamic(() => import("../../core/data-display/base-leaflet-map"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-gray-100 animate-pulse" />,
});


  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 bg-gray-200 rounded" />
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-6 w-64 bg-gray-200 rounded" />
        <div className="h-[400px] w-full bg-gray-100 rounded-lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 p-4 bg-red-50 text-red-700">
        Error loading client information. Please try again later.
      </div>
    );
  }

  // Validate client data existence
  if (!client) {
    return (
      <div className="rounded-lg border border-yellow-200 p-4 bg-yellow-50 text-yellow-700">
        No client data found
      </div>
    );
  }

  // Validate coordinates
  const hasValidCoordinates = 
    typeof client.latitude === 'number' && 
    typeof client.longitude === 'number' &&
    !isNaN(client.latitude) && 
    !isNaN(client.longitude);

  if (!hasValidCoordinates) {
    console.warn(`Invalid coordinates for client ${client.id}:`, {
      latitude: client.latitude,
      longitude: client.longitude
    });
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
