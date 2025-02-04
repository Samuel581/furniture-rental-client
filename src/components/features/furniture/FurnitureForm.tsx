"use client";
import React from "react";
import z from "zod";
import { furnitureSchema } from "@/types/furniture.schema";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
type FurnitureFormData = z.infer<typeof furnitureSchema>;

function FurnitureForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FurnitureFormData>({
    resolver: zodResolver(furnitureSchema),
    defaultValues: {
      name: "",
      color: "",
      type: "",
      dailyRate: 0,
      stock: 0,
    },
  });

  const onSubmit: SubmitHandler<FurnitureFormData> = (data) =>
    console.log(data);

  return (
    <Card className="w-2/4 mx-auto mt-10 shadow-xl border-none">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre del mueble</Label>
            <Input {...register("name")} type="text" />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="color">Color</Label>
            <Input {...register("color")} type="text" />
            {errors.color && <p className="text-red-500">{errors.color.message}</p>}
          </div>
          <div>
            <Label htmlFor="type">Tipo</Label>
            <Input {...register("type")} type="text" />
            {errors.type && <p className="text-red-500">{errors.type.message}</p>}
          </div>
          <div className="flex flex-row gap-5 ">
            <div className="w-full">
              <Label htmlFor="dailyRate">Tarifa diaria</Label>
              <Input {...register("dailyRate")} type="number" />
              {errors.dailyRate && <p className="text-red-500">{errors.dailyRate.message}</p>}
            </div>
            <div className="w-full">
              <Label htmlFor="stock">Stock</Label>
              <Input {...register("stock")} type="number" />
              {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
            </div>
          </div>
          <Button variant="default"
            type="submit"
            disabled={isSubmitting}
            className="text-white p-2 rounded-md"
          >
            {isSubmitting ? "Creando..." : "Crear"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}

export default FurnitureForm;
