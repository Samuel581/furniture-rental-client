import DisplayRow from "@/components/core/data-display/DisplayRow";
import { furnitureService } from "@/services/furniture.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { PaintBucket, Search, DollarSign, Box } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface FurnitureCardProps {
  id: string;
}

function FurnitureCard({ id }: FurnitureCardProps) {
  const {
    data: furniture,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["furniture", id],
    queryFn: () => furnitureService.getById(id),
  });

  if (error) {
    return <div>
      <p>Error: {error.message}</p>
      <p>Failed to fetch furniture with id: {id}, if this behavior persists please contact support</p>
    </div>;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 mt-2">
        <Skeleton className="h-10 w-5/12" />
        <div className="flex flex-col  gap-5">
          <DisplayRow>
            <Skeleton className="h-7 w-2/12" />
          </DisplayRow>
          <DisplayRow>
            <Skeleton className="h-7 w-2/12" />
          </DisplayRow>
          <DisplayRow>
            <Skeleton className="h-7 w-2/12" />
          </DisplayRow>
          <DisplayRow>
            <Skeleton className="h-7 w-2/12" />
          </DisplayRow>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 mt-2">
      <h3 className="text-3xl font-semibold text-gray-900">
        {furniture?.name}
      </h3>
      <div className="flex flex-col  gap-5">
        <DisplayRow>
          <PaintBucket size={24} />
          <p>{furniture?.color}</p>
        </DisplayRow>
        <DisplayRow>
          <Search size={24} />
          <p>{furniture?.type}</p>
        </DisplayRow>
        <DisplayRow>
          <DollarSign size={24} />
          <p>{furniture?.dailyRate}</p>
        </DisplayRow>
        <DisplayRow>
          <Box size={24} />
          <p>{furniture?.stock}</p>
        </DisplayRow>
      </div>
    </div>
  );
}

export default FurnitureCard;
