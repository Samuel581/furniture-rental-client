"use client";
import { furnitureService } from "@/services/furniture.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import z from "zod";
import { useForm } from "react-hook-form";
import { combosService } from "@/services/combo.service";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import FurnitureItemCard from "./FurnitureItemCard";

// First, let's fix the schema to match exactly what the API expects
const furnitureItemSchema = z.object({
  furnitureId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

const comboCreationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  dailyRate: z.number().min(0.25, "Daily rate must be at least 0.25"),
  isActive: z.boolean().optional().default(true),
  furnitureItems: z
    .array(furnitureItemSchema)
    .min(1, "At least one furniture item is required"),
});

type FormFields = z.infer<typeof comboCreationSchema>;

interface TempFurnitureItem {
  furnitureId: string;
  quantity: number;
  name: string; // For display purposes
}

function CreateComboForm() {
  const router = useRouter();
  const [selectedFurnitureID, setSelectedFurnitureID] = useState<string>("");
  const [selectedFurnitureQuantity, setSelectedFurnitureQuantity] =
    useState<number>(1);
  const [selectedItems, setSelectedItems] = useState<TempFurnitureItem[]>([]);

  const { data: furnitures } = useQuery({
    queryFn: () => furnitureService.getAll(),
    queryKey: ["furnitures"],
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      dailyRate: 1,
      isActive: true,
      furnitureItems: [],
    },
  });

  const { mutateAsync: addCombos } = useMutation({
    mutationFn: (data: FormFields) => combosService.create(data),
    onSuccess: () => {
      toast.success("Combo created successfully");
      router.push("/combos");
    },
    onError: (error) => {
      toast.error("Error creating combo");
      console.error("Error creating combo", error);
    },
  });

  const onSubmit = async (data: FormFields) => {
    try {
      const submitData = {
        name: data.name,
        dailyRate: Number(data.dailyRate),
        isActive: data.isActive,
        furnitureItems: selectedItems.map((furniture) => ({
          furnitureId: furniture.furnitureId,
          quantity: Number(furniture.quantity),
        })),
      };
      console.log(submitData);
      await addCombos(submitData);
    } catch (error) {
      console.error("Error adding combo:", error);
    }
  };

  const handleAddFurnitureItem = () => {
    if (!selectedFurnitureID || selectedFurnitureQuantity <= 0) return;

    const furniture = furnitures?.find((f) => f.id === selectedFurnitureID);
    if (!furniture) return;

    const newFurnitureItem: TempFurnitureItem = {
      furnitureId: selectedFurnitureID,
      quantity: selectedFurnitureQuantity,
      name: furniture.name,
    };

    console.log(selectedItems);
    setSelectedItems((prev) => [...prev, newFurnitureItem]);
    setSelectedFurnitureID("");
    setSelectedFurnitureQuantity(0);
    console.log(selectedItems);
  };

  const handleDeleteFurnitureItem = (furnitureId: string) => {
    setSelectedItems((prev) =>
      prev.filter((item) => item.furnitureId !== furnitureId)
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input type="text" id="name" {...register("name")} />
        </div>
        <div>
          <Label htmlFor="dailyRate">Tarifa diaria</Label>
          <Input
            type="number"
            id="dailyRate"
            step={"0.01"}
            {...register("dailyRate")}
          />
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="furnitureItems">Muebles</Label>
            <Select
              value={selectedFurnitureID}
              onValueChange={setSelectedFurnitureID}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a furniture" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a furniture</SelectLabel>
                  {furnitures?.map((furniture) => (
                    <SelectItem key={furniture.id} value={furniture.id}>
                      {furniture.name}
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
              value={selectedFurnitureQuantity}
              onChange={(e) =>
                setSelectedFurnitureQuantity(parseInt(e.target.value) || 1)
              }
            />
          </div>
          <Button
            type="button"
            onClick={handleAddFurnitureItem}
            className="bottom-0"
          >
            <Plus />
            Agregar
          </Button>
        </div>
        {selectedItems.length > 0 && (
          <div>
            <Label htmlFor="selectedItems">Muebles seleccionados</Label>
            <div className="flex flex-row gap-2">
              {selectedItems.map((item) => (
                <FurnitureItemCard
                  key={item.furnitureId}
                  quantity={item.quantity}
                  name={item.name}
                  onRemove={() => handleDeleteFurnitureItem(item.furnitureId)}
                />
              ))}
            </div>
          </div>
        )}
        <Button type="submit" className="w-full mt-5">
          <Plus />
          {isSubmitting ? "Creando combo..." : "Crear combo"}
        </Button>
      </CardContent>
    </form>
  );
}

export default CreateComboForm;
