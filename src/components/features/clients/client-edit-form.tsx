"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clientsService } from "@/services/client.service";
import { useEffect } from "react";
import { getApiErrorMessage } from "@/lib/api/errors";
import {
  clientSchema,
  ClientFormInput,
  ClientFormOutput,
} from "@/lib/validation/schemas/client";
import ClientFormFields from "./client-form-fields";

export default function EditClientForm() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const clientId = params.id as string;

  const {
    data: client,
    isLoading: isLoadingClient,
    isError,
  } = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => clientsService.getById(clientId),
    enabled: !!clientId, // Only fetch if we have an ID
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<ClientFormInput, unknown, ClientFormOutput>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      phone: "",
      addressReference: "",
      notes: "",
      latitude: "",
      longitude: "",
    },
  });

  const updateClient = useMutation({
    mutationFn: (data: ClientFormOutput) =>
      clientsService.update(clientId, {
        ...data,
        // Send an empty string so clearing the field clears it on the API
        notes: data.notes ?? "",
        // Only the first phone is editable, keep any additional ones
        phone: [data.phone, ...(client?.phone.slice(1) ?? [])],
      }),
    onSuccess: () => {
      toast.success("Cliente actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["client", clientId] });
      router.push("/clients");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "No se pudo actualizar el cliente"));
    },
  });

  useEffect(() => {
    if (client) {
      resetForm({
        name: client.name,
        phone: client.phone?.[0] ?? "",
        addressReference: client.addressReference ?? "",
        notes: client.notes ?? "",
        latitude: client.latitude ?? "",
        longitude: client.longitude ?? "",
      });
    }
  }, [client, resetForm]);

  const onSubmit = (data: ClientFormOutput) => {
    updateClient.mutate(data);
  };

  if (isLoadingClient) {
    return <div>Cargando datos del cliente...</div>;
  }

  if (isError) {
    return <div className="text-red-500">No se pudo cargar el cliente.</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <ClientFormFields register={register} errors={errors} />
      <CardFooter>
        <Button type="submit" className="w-full" disabled={updateClient.isPending}>
          {updateClient.isPending ? "Guardando..." : "Guardar cambios"}
        </Button>
      </CardFooter>
    </form>
  );
}
