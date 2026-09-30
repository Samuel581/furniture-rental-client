import axios from "axios";

// Extracts a user-facing message from an API error.
// Nest's ValidationPipe returns `message` as a string or an array of strings.
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "No se pudo conectar con el servidor";
    }
    const message = (error.response.data as { message?: unknown } | undefined)?.message;
    if (Array.isArray(message)) {
      return message.join(", ");
    }
    if (typeof message === "string" && message.length > 0) {
      return message;
    }
  }
  return fallback;
}
