import Form from "@/components/features/clients/client-edit-form";
import React from "react";

async function page() {
  return (
    <main className="container py-12 my-auto">
      <div className="w-7/12 mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Actualizacion de datos del cliente
        </h1>
        <Form />
      </div>
    </main>
  );
}

export default page;
