import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field-error";
import { ClientFormInput } from "@/lib/validation/schemas/client";

interface ClientFormFieldsProps {
  register: UseFormRegister<ClientFormInput>;
  errors: FieldErrors<ClientFormInput>;
}

function ClientFormFields({ register, errors }: ClientFormFieldsProps) {
  return (
    <CardContent className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" maxLength={30} {...register("name")} />
        <FieldError message={errors.name?.message} />
      </div>
      <div>
        <Label htmlFor="phone">Telefono</Label>
        <Input id="phone" type="tel" maxLength={20} {...register("phone")} />
        <FieldError message={errors.phone?.message} />
      </div>
      <div>
        <Label htmlFor="addressReference">Referencia de direccion</Label>
        <Input id="addressReference" maxLength={200} {...register("addressReference")} />
        <FieldError message={errors.addressReference?.message} />
      </div>
      <div>
        <Label htmlFor="notes">Notas</Label>
        <Input id="notes" maxLength={200} {...register("notes")} />
        <FieldError message={errors.notes?.message} />
      </div>
      <div>
        <Label htmlFor="latitude">Latitud</Label>
        <Input
          id="latitude"
          type="number"
          step="any"
          min={-90}
          max={90}
          {...register("latitude")}
        />
        <FieldError message={errors.latitude?.message} />
      </div>
      <div>
        <Label htmlFor="longitude">Longitud</Label>
        <Input
          id="longitude"
          type="number"
          step="any"
          min={-180}
          max={180}
          {...register("longitude")}
        />
        <FieldError message={errors.longitude?.message} />
      </div>
    </CardContent>
  );
}

export default ClientFormFields;
