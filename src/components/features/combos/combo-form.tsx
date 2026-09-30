"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { furnitureService } from "@/services/furniture.service";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field-error";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  comboSchema,
  ComboFormInput,
  ComboFormOutput,
} from "@/lib/validation/schemas/combo";
import FurnitureItemCard from "./furniture-item-card";

interface ComboFormProps {
  defaultValues?: ComboFormInput;
  onSubmit: (data: ComboFormOutput) => void;
  isPending: boolean;
  submitLabel: string;
  pendingLabel: string;
}

const emptyCombo: ComboFormInput = {
  name: "",
  dailyRate: "",
  furnitureItems: [],
};

function ComboForm({
  defaultValues = emptyCombo,
  onSubmit,
  isPending,
  submitLabel,
  pendingLabel,
}: ComboFormProps) {
  const [selectedFurnitureID, setSelectedFurnitureID] = useState<string>("");
  const [selectedFurnitureQuantity, setSelectedFurnitureQuantity] = useState<string>("1");
  const [pickerError, setPickerError] = useState<string>("");

  const { data: furnitures } = useQuery({
    queryFn: () => furnitureService.getAll(),
    queryKey: ["furnitures"],
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ComboFormInput, unknown, ComboFormOutput>({
    resolver: zodResolver(comboSchema),
    defaultValues,
  });

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "furnitureItems",
  });

  const handleAddFurnitureItem = () => {
    const quantity = Number(selectedFurnitureQuantity);
    if (!selectedFurnitureID) {
      setPickerError("Selecciona un mueble");
      return;
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      setPickerError("La cantidad debe ser un número entero mayor a 0");
      return;
    }

    const furniture = furnitures?.find((f) => f.id === selectedFurnitureID);
    if (!furniture) return;

    // Adding an already selected furniture increases its quantity
    const existingIndex = fields.findIndex((f) => f.furnitureId === selectedFurnitureID);
    const currentQuantity = existingIndex >= 0 ? Number(fields[existingIndex].quantity) : 0;
    const newQuantity = currentQuantity + quantity;

    if (newQuantity > furniture.stock) {
      setPickerError(`Solo hay ${furniture.stock} unidades de ${furniture.name} en stock`);
      return;
    }

    if (existingIndex >= 0) {
      update(existingIndex, { furnitureId: selectedFurnitureID, quantity: newQuantity });
    } else {
      append({ furnitureId: selectedFurnitureID, quantity: newQuantity });
    }

    setPickerError("");
    setSelectedFurnitureID("");
    setSelectedFurnitureQuantity("1");
  };

  const getFurnitureName = (furnitureId: string) =>
    furnitures?.find((f) => f.id === furnitureId)?.name ?? "Mueble";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input type="text" id="name" maxLength={50} {...register("name")} />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="dailyRate">Tarifa diaria</Label>
          <Input
            type="number"
            id="dailyRate"
            step="0.01"
            min={0.25}
            max={1000}
            {...register("dailyRate")}
          />
          <FieldError message={errors.dailyRate?.message} />
        </div>
        <div className="flex flex-row items-end gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="furnitureItems">Muebles</Label>
            <Select
              value={selectedFurnitureID}
              onValueChange={setSelectedFurnitureID}
            >
              <SelectTrigger id="furnitureItems" className="w-[200px]">
                <SelectValue placeholder="Selecciona un mueble" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Selecciona un mueble</SelectLabel>
                  {furnitures?.map((furniture) => (
                    <SelectItem key={furniture.id} value={furniture.id}>
                      {furniture.name} (stock: {furniture.stock})
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="quantity">Cantidad</Label>
            <Input
              type="number"
              id="quantity"
              step="1"
              min={1}
              value={selectedFurnitureQuantity}
              onChange={(e) => setSelectedFurnitureQuantity(e.target.value)}
            />
          </div>
          <Button type="button" onClick={handleAddFurnitureItem}>
            <Plus />
            Agregar
          </Button>
        </div>
        <FieldError message={pickerError} />
        <FieldError message={errors.furnitureItems?.message ?? errors.furnitureItems?.root?.message} />
        {fields.length > 0 && (
          <div>
            <Label>Muebles seleccionados</Label>
            <div className="flex flex-row flex-wrap gap-2">
              {fields.map((item, index) => (
                <FurnitureItemCard
                  key={item.id}
                  quantity={Number(item.quantity)}
                  name={getFurnitureName(item.furnitureId)}
                  onRemove={() => remove(index)}
                />
              ))}
            </div>
          </div>
        )}
        <Button type="submit" className="w-full mt-5" disabled={isPending}>
          <Plus />
          {isPending ? pendingLabel : submitLabel}
        </Button>
      </CardContent>
    </form>
  );
}

export default ComboForm;
