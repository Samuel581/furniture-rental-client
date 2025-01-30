// components/Form.tsx
"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clientsService } from "@/services/client.service";
import { useEffect } from "react";

const clientFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must not exceed 50 characters" }),
  phone: z
    .string()
    .min(8, { message: "Phone must be at least 10 digits" })
    .optional()
    .transform((phone) => (phone ? [phone] : [])),
  addressReference: z
    .string()
    .max(200, { message: "Address reference must not exceed 200 characters" })
    .optional(),
  notes: z
    .string()
    .max(200, { message: "Notes must not exceed 200 characters" })
    .optional(),
  latitude: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined))
    .pipe(z.number().optional()),
  longitude: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined))
    .pipe(z.number().optional()),
});

type ClientFormData = z.infer<typeof clientFormSchema>;

export default function EditClientForm() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const clientId = params.id as string;

  const { data: client, isLoading: isLoadingClient } = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => clientsService.getById(clientId),
    enabled: !!clientId, // Only fetch if we have an ID
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: "",
      phone: [],
      addressReference: "",
      notes: "",
      latitude: 0,
      longitude: 0,
    },
  });

  const updateClient = useMutation({
    mutationFn: (data: ClientFormData) => clientsService.update(clientId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      router.push("/clients");
    },
  });

  useEffect(() => {
    if (client) {
      const formattedClient = {
        ...client,
        latitude: client.latitude || undefined,
        longitude: client.longitude || undefined,
        phone: client.phone || [],
      };
      resetForm(formattedClient)
    }
  }, [client, resetForm]);

  const onSubmit = async (data: ClientFormData) => {
    try {
      await updateClient.mutateAsync(data);
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  if (isLoadingClient) {
    return <div>Loading client data...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        {/* Name Field */}
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" {...register("name")} defaultValue={""} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Telefono</Label>
          <Input id="phone" {...register("phone")} defaultValue={""} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="addressReference">Referencia de direccion</Label>
          <Input
            id="addressReference"
            {...register("addressReference")}
            defaultValue={""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="notes">Notas</Label>
          <Input id="notes" {...register("notes")} defaultValue={""} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="latitude">Latitud</Label>
          <Input id="latitude" {...register("latitude")} defaultValue={""} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.longitude?.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="longitude">Longitude</Label>
          <Input id="longitude" {...register("longitude")} defaultValue={""} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.latitude?.message}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </form>
  );
}
