import React from "react";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-red-500 text-sm">{message}</p>;
}

export { FieldError };
