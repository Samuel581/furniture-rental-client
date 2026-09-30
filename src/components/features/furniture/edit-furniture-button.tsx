"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { furnitureService } from "@/services/furniture.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api/errors";
import {
  furnitureSchema,
  FurnitureFormInput,
  FurnitureFormOutput,
} from "@/lib/validation/schemas/furniture";
import FurnitureFormFields from "./furniture-form-fields";

function EditFurnitureForm() {
  const params = useParams();
  const furnitureId = params.id as string;
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: furniture,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["furniture", furnitureId],
    queryFn: () => furnitureService.getById(furnitureId),
    enabled: !!furnitureId,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FurnitureFormInput, unknown, FurnitureFormOutput>({
    resolver: zodResolver(furnitureSchema),
    defaultValues: {
      name: "",
      color: "",
      type: "",
      dailyRate: "",
      stock: "",
    },
  });

  useEffect(() => {
    if (furniture) {
      reset({
        name: furniture.name,
        color: furniture.color ?? "",
        type: furniture.type,
        dailyRate: furniture.dailyRate,
        stock: furniture.stock,
      });
    }
  }, [furniture, reset]);

  const updateFurniture = useMutation({
    mutationFn: (data: FurnitureFormOutput) =>
      furnitureService.update(furnitureId, {
        ...data,
        // Send an empty string so clearing the field clears it on the API
        color: data.color ?? "",
      }),
    onSuccess: () => {
      toast.success("Mueble actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: ["furnitures"] });
      queryClient.invalidateQueries({ queryKey: ["furniture", furnitureId] });
      router.push("/furniture");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "No se pudo actualizar el mueble"));
    },
  });

  const onSubmit = (data: FurnitureFormOutput) => {
    updateFurniture.mutate(data);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div className="text-red-500">No se pudo cargar el mueble.</div>;
  }

  return (
    <Card className="w-2/4 mx-auto mt-10 shadow-xl border-none">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent className="space-y-4">
          <FurnitureFormFields register={register} errors={errors} />
          <Button
            variant="default"
            type="submit"
            disabled={updateFurniture.isPending}
            className="text-white p-2 rounded-md"
          >
            {updateFurniture.isPending ? "Actualizando..." : "Actualizar"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}

export default EditFurnitureForm;
