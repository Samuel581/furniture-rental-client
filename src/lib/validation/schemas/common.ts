import { z } from "zod";

// Required trimmed string with length limits
export const text = (min: number, max: number, label: string) =>
  z
    .string({ required_error: "Este campo es obligatorio" })
    .trim()
    .min(1, { message: "Este campo es obligatorio" })
    .min(min, { message: `${label} debe tener al menos ${min} caracteres` })
    .max(max, { message: `${label} no puede exceder ${max} caracteres` });

// Optional trimmed string, empty values become undefined
export const optionalText = (max: number, label: string) =>
  z
    .string()
    .trim()
    .max(max, { message: `${label} no puede exceder ${max} caracteres` })
    .optional()
    .transform((val) => (val ? val : undefined));

interface NumberFieldOptions {
  label: string;
  min?: number;
  max?: number;
  int?: boolean;
  decimals?: number;
}

// Parses input strings into numbers, rejecting empty and non numeric values
export const numberField = ({ label, min, max, int, decimals }: NumberFieldOptions) => {
  let schema = z.number({
    required_error: "Este campo es obligatorio",
    invalid_type_error: `${label} debe ser un número válido`,
  });
  if (int) schema = schema.int({ message: `${label} debe ser un número entero` });
  if (min !== undefined) schema = schema.min(min, { message: `${label} debe ser al menos ${min}` });
  if (max !== undefined) schema = schema.max(max, { message: `${label} no puede exceder ${max}` });

  const withDecimals =
    decimals === undefined
      ? schema
      : schema.refine(
          (val) => Math.abs(Math.round(val * 10 ** decimals) - val * 10 ** decimals) < 1e-8,
          { message: `${label} admite máximo ${decimals} decimales` }
        );

  return z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
    withDecimals
  );
};

export const optionalNumberField = (options: NumberFieldOptions) =>
  z.preprocess(
    (val) => (val === "" || val === null ? undefined : val),
    numberField(options).optional()
  );
