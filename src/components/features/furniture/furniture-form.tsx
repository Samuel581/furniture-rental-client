"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { furnitureService } from "@/services/furniture.service";
import { getApiErrorMessage } from "@/lib/api/errors";
import {
  furnitureSchema,
  FurnitureFormInput,
  FurnitureFormOutput,
} from "@/lib/validation/schemas/furniture";
import FurnitureFormFields from "./furniture-form-fields";

function FurnitureForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
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

  const addFurniture = useMutation({
    mutationFn: (data: FurnitureFormOutput) => furnitureService.create(data),
    onSuccess: () => {
      toast.success("Mueble creado correctamente");
      queryClient.invalidateQueries({ queryKey: ["furnitures"] });
      router.push("/furniture");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "No se pudo crear el mueble"));
    },
  })

  const onSubmit = (data: FurnitureFormOutput) => {
    addFurniture.mutate(data);
  }
  return (
    <Card className="w-2/4 mx-auto mt-10 shadow-xl border-none">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent className="space-y-4">
          <FurnitureFormFields register={register} errors={errors} />
          <Button variant="default"
            type="submit"
            disabled={addFurniture.isPending}
            className="text-white p-2 rounded-md"
          >
            {addFurniture.isPending ? "Creando..." : "Crear"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}

export default FurnitureForm;
