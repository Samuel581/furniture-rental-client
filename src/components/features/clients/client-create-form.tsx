'use client'
import { clientsService } from '@/services/client.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod'
import { CardContent, CardFooter } from '../../ui/card';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

const clientFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must not exceed 50 characters" }),
  phone: z
    .string()
    .min(8, { message: "Phone must be at least 10 digits" })
    .transform((phone) => (phone ? [phone] : [])),
  addressReference: z
    .string()
    .max(200, { message: "Address reference must not exceed 200 characters" }),
  notes: z
    .string()
    .max(200, { message: "Notes must not exceed 200 characters" }),
  latitude: z
    .string()
    .transform((val) => Number(val)),
  longitude: z
    .string()
    .transform((val) => (Number(val))),
});

type ClientFormData = z.infer<typeof clientFormSchema>;


function ClientCreateForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ClientFormData>({
        resolver: zodResolver(clientFormSchema),
        defaultValues: {
            name: "",
            phone: [],
            addressReference: "",
            notes: "",
            latitude: undefined,
            longitude: undefined,
        },
    });

    const createClient = useMutation({
        mutationFn: (data: ClientFormData) => clientsService.create(data),
        onSuccess: () => {
            router.push("/clients");
        },
    })

    const onSubmit = (data: ClientFormData) => {
        createClient.mutate(data);
    };

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
  )
}

export default ClientCreateForm
