"use client";
import React from "react";
import { useParams } from "next/navigation";
import FurnitureCard from "@/components/features/furniture/FurnitureCard";

function Page() {
  const { id } = useParams();
  const furnitureId = Array.isArray(id) ? id[0] : id || "";
  return (
    <div className="gap-10 m-10">
      <h1 className="font-bold text-5xl text-center">Detalles de mueble</h1>
      <FurnitureCard id={furnitureId} />
    </div>
  );
}

export default Page;
