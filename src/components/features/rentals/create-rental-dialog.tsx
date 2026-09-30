import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field-error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Plus } from "lucide-react";
import { clientsService } from "@/services/client.service";
import { furnitureService } from "@/services/furniture.service";
import { combosService } from "@/services/combo.service";
import { rentalsService } from "@/services/rental.service";
import { getApiErrorMessage } from "@/lib/api/errors";
import {
  rentalSchema,
  RentalFormInput,
  RentalFormOutput,
} from "@/lib/validation/schemas/rental";
import FurnitureItemCard from "../combos/furniture-item-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ItemType = "furniture" | "combo";

// Formats a date for datetime-local inputs using the local timezone
const formatDateTimeForInput = (date: Date): string => {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const getDefaultValues = (): RentalFormInput => {
  const start = new Date();
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
  return {
    clientId: "",
    startDate: formatDateTimeForInput(start),
    endDate: formatDateTimeForInput(end),
    depositAmount: "",
    notes: "",
    secondaryDeliveryAddress: "",
    items: [],
  };
};

function CreateRentalDialog() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [itemType, setItemType] = useState<ItemType>("furniture");
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [selectedQuantity, setSelectedQuantity] = useState<string>("1");
  const [pickerError, setPickerError] = useState<string>("");

  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: clientsService.getAll,
  });

  const { data: furnitures } = useQuery({
    queryKey: ["furnitures"],
    queryFn: () => furnitureService.getAll(),
  });

  const { data: combos } = useQuery({
    queryKey: ["combos"],
    queryFn: () => combosService.getAll(),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RentalFormInput, unknown, RentalFormOutput>({
    resolver: zodResolver(rentalSchema),
    defaultValues: getDefaultValues(),
  });

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "items",
  });

  const startDate = watch("startDate");

  const itemOptions =
    itemType === "furniture"
      ? (furnitures ?? []).map((f) => ({ id: f.id, name: f.name, stock: f.stock }))
      : (combos ?? [])
          .filter((c) => c.isActive)
          .map((c) => ({ id: c.id, name: c.name, stock: undefined }));

  const getItemName = (type: ItemType, id: string) =>
    (type === "furniture"
      ? furnitures?.find((f) => f.id === id)?.name
      : combos?.find((c) => c.id === id)?.name) ?? "Artículo";

  const resetDialog = () => {
    reset(getDefaultValues());
    setItemType("furniture");
    setSelectedItemId("");
    setSelectedQuantity("1");
    setPickerError("");
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) resetDialog();
  };

  const handleAddItem = () => {
    const quantity = Number(selectedQuantity);
    if (!selectedItemId) {
      setPickerError("Selecciona un artículo");
      return;
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      setPickerError("La cantidad debe ser un número entero mayor a 0");
      return;
    }

    const option = itemOptions.find((o) => o.id === selectedItemId);
    if (!option) return;

    // Adding an already selected item increases its quantity
    const existingIndex = fields.findIndex(
      (f) => f.type === itemType && f.itemId === selectedItemId
    );
    const currentQuantity = existingIndex >= 0 ? Number(fields[existingIndex].quantity) : 0;
    const newQuantity = currentQuantity + quantity;

    if (option.stock !== undefined && newQuantity > option.stock) {
      setPickerError(`Solo hay ${option.stock} unidades de ${option.name} en stock`);
      return;
    }

    if (existingIndex >= 0) {
      update(existingIndex, { type: itemType, itemId: selectedItemId, quantity: newQuantity });
    } else {
      append({ type: itemType, itemId: selectedItemId, quantity: newQuantity });
    }

    setPickerError("");
    setSelectedItemId("");
    setSelectedQuantity("1");
  };

  const createRental = useMutation({
    mutationFn: (data: RentalFormOutput) =>
      rentalsService.create({
        clientId: data.clientId,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
        depositAmount: data.depositAmount,
        notes: data.notes,
        secondaryDeliveryAddress: data.secondaryDeliveryAddress,
        items: data.items.map((item) =>
          item.type === "furniture"
            ? { furnitureId: item.itemId, quantity: item.quantity }
            : { comboId: item.itemId, quantity: item.quantity }
        ),
      }),
    onSuccess: () => {
      toast.success("Renta creada correctamente");
      queryClient.invalidateQueries({ queryKey: ["rentals"] });
      handleOpenChange(false);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "No se pudo crear la renta"));
    },
  });

  const onSubmit = (data: RentalFormOutput) => {
    createRental.mutate(data);
  };

  return (
    <div className="mt-5">
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant={isLoading ? "ghost" : "default"}>Nueva renta</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Crear nueva renta</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="clientId">Cliente *</Label>
                <Controller
                  control={control}
                  name="clientId"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="clientId" className="w-full">
                        <SelectValue placeholder="Selecciona un cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Selecciona un cliente</SelectLabel>
                          {clients?.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError message={errors.clientId?.message} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Fecha y hora de inicio *</Label>
                  <Input id="startDate" type="datetime-local" {...register("startDate")} />
                  <FieldError message={errors.startDate?.message} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">Fecha y hora de fin *</Label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    min={startDate}
                    {...register("endDate")}
                  />
                  <FieldError message={errors.endDate?.message} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Artículos *</Label>
                <div className="flex flex-row flex-wrap items-end gap-2">
                  <Select
                    value={itemType}
                    onValueChange={(value) => {
                      setItemType(value as ItemType);
                      setSelectedItemId("");
                    }}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="furniture">Mueble</SelectItem>
                      <SelectItem value="combo">Combo</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedItemId} onValueChange={setSelectedItemId}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecciona un artículo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {itemOptions.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.name}
                            {option.stock !== undefined && ` (stock: ${option.stock})`}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Input
                    aria-label="Cantidad"
                    type="number"
                    step="1"
                    min={1}
                    className="w-20"
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(e.target.value)}
                  />
                  <Button type="button" onClick={handleAddItem}>
                    <Plus />
                    Agregar
                  </Button>
                </div>
                <FieldError message={pickerError} />
                <FieldError message={errors.items?.message ?? errors.items?.root?.message} />
                {fields.length > 0 && (
                  <div className="flex flex-row flex-wrap gap-2">
                    {fields.map((item, index) => (
                      <FurnitureItemCard
                        key={item.id}
                        quantity={Number(item.quantity)}
                        name={getItemName(item.type, item.itemId)}
                        onRemove={() => remove(index)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="depositAmount">Depósito</Label>
                <Input
                  id="depositAmount"
                  type="number"
                  step="0.01"
                  min={0}
                  {...register("depositAmount")}
                />
                <FieldError message={errors.depositAmount?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryDeliveryAddress">Dirección de entrega alternativa</Label>
                <Input
                  id="secondaryDeliveryAddress"
                  maxLength={200}
                  {...register("secondaryDeliveryAddress")}
                />
                <FieldError message={errors.secondaryDeliveryAddress?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notas</Label>
                <Input id="notes" maxLength={200} {...register("notes")} />
                <FieldError message={errors.notes?.message} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={createRental.isPending}>
                {createRental.isPending ? "Guardando..." : "Crear renta"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateRentalDialog;
