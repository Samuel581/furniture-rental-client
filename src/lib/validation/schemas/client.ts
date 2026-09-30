import { z } from "zod";
import { numberField, optionalText, text } from "./common";

export const clientSchema = z.object({
  name: text(3, 30, "El nombre"),
  phone: z
    .string()
    .trim()
    .min(1, { message: "El teléfono es obligatorio" })
    .regex(/^\+?[0-9\s-]{8,20}$/, {
      message: "Ingresa un teléfono válido (8 a 20 dígitos, puede incluir +, espacios o guiones)",
    }),
  addressReference: text(10, 200, "La referencia de dirección"),
  notes: optionalText(200, "Las notas"),
  latitude: numberField({ label: "La latitud", min: -90, max: 90 }),
  longitude: numberField({ label: "La longitud", min: -180, max: 180 }),
});

export type ClientFormInput = z.input<typeof clientSchema>;
export type ClientFormOutput = z.output<typeof clientSchema>;
