import { z } from "zod";
import { numberField, optionalNumberField, optionalText } from "./common";

export const rentalItemSchema = z.object({
  type: z.enum(["furniture", "combo"]),
  itemId: z.string().uuid({ message: "Artículo inválido" }),
  quantity: numberField({ label: "La cantidad", min: 1, int: true }),
});

export const rentalSchema = z
  .object({
    clientId: z
      .string({ required_error: "Selecciona un cliente" })
      .uuid({ message: "Selecciona un cliente" }),
    startDate: z.string().min(1, { message: "La fecha de inicio es obligatoria" }),
    endDate: z.string().min(1, { message: "La fecha de fin es obligatoria" }),
    depositAmount: optionalNumberField({ label: "El depósito", min: 0, decimals: 2 }),
    notes: optionalText(200, "Las notas"),
    secondaryDeliveryAddress: optionalText(200, "La dirección secundaria"),
    items: z.array(rentalItemSchema).min(1, { message: "Agrega al menos un artículo" }),
  })
  .refine(
    (data) =>
      Number.isNaN(Date.parse(data.startDate)) ||
      Number.isNaN(Date.parse(data.endDate)) ||
      new Date(data.endDate) > new Date(data.startDate),
    { message: "La fecha de fin debe ser posterior a la de inicio", path: ["endDate"] }
  );

export type RentalFormInput = z.input<typeof rentalSchema>;
export type RentalFormOutput = z.output<typeof rentalSchema>;
