import { z } from "zod";
import { numberField, text } from "./common";

export const comboItemSchema = z.object({
  furnitureId: z.string().uuid({ message: "Mueble inválido" }),
  quantity: numberField({ label: "La cantidad", min: 1, int: true }),
});

export const comboSchema = z.object({
  name: text(3, 50, "El nombre"),
  dailyRate: numberField({ label: "La tarifa diaria", min: 0.25, max: 1000, decimals: 2 }),
  furnitureItems: z.array(comboItemSchema).min(1, { message: "Agrega al menos un mueble" }),
});

export type ComboFormInput = z.input<typeof comboSchema>;
export type ComboFormOutput = z.output<typeof comboSchema>;
