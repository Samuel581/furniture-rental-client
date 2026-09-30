import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field-error";
import { FurnitureFormInput } from "@/lib/validation/schemas/furniture";

interface FurnitureFormFieldsProps {
  register: UseFormRegister<FurnitureFormInput>;
  errors: FieldErrors<FurnitureFormInput>;
}

function FurnitureFormFields({ register, errors }: FurnitureFormFieldsProps) {
  return (
    <>
      <div>
        <Label htmlFor="name">Nombre del mueble</Label>
        <Input id="name" type="text" maxLength={50} {...register("name")} />
        <FieldError message={errors.name?.message} />
      </div>
      <div>
        <Label htmlFor="color">Color</Label>
        <Input id="color" type="text" maxLength={30} {...register("color")} />
        <FieldError message={errors.color?.message} />
      </div>
      <div>
        <Label htmlFor="type">Tipo</Label>
        <Input id="type" type="text" maxLength={30} {...register("type")} />
        <FieldError message={errors.type?.message} />
      </div>
      <div className="flex flex-row gap-5 ">
        <div className="w-full">
          <Label htmlFor="dailyRate">Tarifa diaria</Label>
          <Input
            id="dailyRate"
            type="number"
            step="0.01"
            min={0.25}
            max={1000}
            {...register("dailyRate")}
          />
          <FieldError message={errors.dailyRate?.message} />
        </div>
        <div className="w-full">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            step="1"
            min={0}
            max={10000}
            {...register("stock")}
          />
          <FieldError message={errors.stock?.message} />
        </div>
      </div>
    </>
  );
}

export default FurnitureFormFields;
