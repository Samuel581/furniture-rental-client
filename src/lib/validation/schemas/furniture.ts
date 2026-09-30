import { z } from "zod";
import { numberField, optionalText, text } from "./common";

export const furnitureSchema = z.object({
  name: text(3, 50, "El nombre"),
  color: optionalText(30, "El color"),
  type: text(3, 30, "El tipo"),
  dailyRate: numberField({ label: "La tarifa diaria", min: 0.25, max: 1000, decimals: 2 }),
  stock: numberField({ label: "El stock", min: 0, max: 10000, int: true }),
});

export type FurnitureFormInput = z.input<typeof furnitureSchema>;
export type FurnitureFormOutput = z.output<typeof furnitureSchema>;
