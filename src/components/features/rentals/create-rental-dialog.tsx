import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { clientsService } from "@/services/client.service";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CreateRentalDialog() {
  const [startDateTime, setStartDateTime] = useState<Date>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date>(new Date());
  const [clientId, setClientId] = useState<String>("");
  const [selectedFurnitureID, setSelectedFurnitureID] = useState<string>("");

  const formatDateTimeForInput = (date: Date): string => {
    return date.toISOString().slice(0, 16);
  };

  const {
    data: clients,
    isLoading,
    error
  } = useQuery({
    queryKey: ["clients"],
    queryFn: clientsService.getAll
  });

  // Temporary furnitures data until you implement the actual servic

  return (
    <div className="mt-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={isLoading ? "ghost" : "default"}>Add new rental</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear nueva renta</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
            <Select
              value={selectedFurnitureID}
              onValueChange={setSelectedFurnitureID}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Cliente" />
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Fecha y hora de inicio *</Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  value={formatDateTimeForInput(startDateTime)}
                  onChange={(e) => setStartDateTime(new Date(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">Fecha y hora de fin *</Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={formatDateTimeForInput(endDateTime)}
                  onChange={(e) => setEndDateTime(new Date(e.target.value))}
                  min={formatDateTimeForInput(startDateTime)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateRentalDialog;
