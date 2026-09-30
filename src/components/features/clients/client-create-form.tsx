'use client'
import { clientsService } from '@/services/client.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { CardFooter } from '../../ui/card';
import { Button } from '../../ui/button';
import { getApiErrorMessage } from '@/lib/api/errors';
import {
  clientSchema,
  ClientFormInput,
  ClientFormOutput,
} from '@/lib/validation/schemas/client';
import ClientFormFields from './client-form-fields';

function ClientCreateForm() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
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

    const createClient = useMutation({
        mutationFn: (data: ClientFormOutput) =>
            clientsService.create({ ...data, phone: [data.phone] }),
        onSuccess: () => {
            toast.success("Cliente creado correctamente");
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            router.push("/clients");
        },
        onError: (error) => {
            toast.error(getApiErrorMessage(error, "No se pudo crear el cliente"));
        },
    })

    const onSubmit = (data: ClientFormOutput) => {
        createClient.mutate(data);
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <ClientFormFields register={register} errors={errors} />
      <CardFooter>
        <Button type="submit" className="w-full" disabled={createClient.isPending}>
          {createClient.isPending ? "Guardando..." : "Crear cliente"}
        </Button>
      </CardFooter>
    </form>
  )
}

export default ClientCreateForm
