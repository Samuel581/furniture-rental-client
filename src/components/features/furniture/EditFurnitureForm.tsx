import React from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { editFurnitureSchema } from "@/types/furnitureEdit.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { furnitureService } from "@/services/furniture.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
type EditFurnitureSchema = z.infer<typeof editFurnitureSchema>;

function EditFurnitureForm() {
    const params = useParams();
    const cliendId = params.id as string;
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: furniture,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["furniture", cliendId],
    queryFn: () => furnitureService.getById(cliendId),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<EditFurnitureSchema>({
    resolver: zodResolver(editFurnitureSchema),
    values: furniture,
    defaultValues: {
      name: "",
      color: "",
      type: "",
      dailyRate: 0,
      stock: 0,
    },
  });

  const { mutateAsync: updateFurniture } = useMutation({
    mutationFn: (data: EditFurnitureSchema) =>
      furnitureService.update(cliendId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["furnitures"] });
      router.push("/furniture");
    },
  });

  const onSubmit = (data: EditFurnitureSchema) => {
    updateFurniture(data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Card className="w-2/4 mx-auto mt-10 shadow-xl border-none">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre del mueble</Label>
            <Input {...register("name")} type="text" />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="color">Color</Label>
            <Input {...register("color")} type="text" />
            {errors.color && (
              <p className="text-red-500">{errors.color.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="type">Tipo</Label>
            <Input {...register("type")} type="text" />
            {errors.type && (
              <p className="text-red-500">{errors.type.message}</p>
            )}
          </div>
          <div className="flex flex-row gap-5 ">
            <div className="w-full">
              <Label htmlFor="dailyRate">Tarifa diaria</Label>
              <Input {...register("dailyRate")} type="number" />
              {errors.dailyRate && (
                <p className="text-red-500">{errors.dailyRate.message}</p>
              )}
            </div>
            <div className="w-full">
              <Label htmlFor="stock">Stock</Label>
              <Input {...register("stock")} type="number" />
              {errors.stock && (
                <p className="text-red-500">{errors.stock.message}</p>
              )}
            </div>
          </div>
          <Button
            variant="default"
            type="submit"
            disabled={isSubmitting}
            className="text-white p-2 rounded-md"
          >
            {isSubmitting ? "Actualizando..." : "Actualizar"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}

export default EditFurnitureForm;
