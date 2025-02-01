"use client";
import { Furniture } from "@/types/furniture.interface";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import React from "react";
import FurnitureActionButtons from "./FurnitureActionButtons";
import { useQuery } from "@tanstack/react-query";
import { furnitureService } from "@/services/furniture.service";
import DataTable from "@/components/core/DataTable";

export const columnHelper = createColumnHelper<Furniture>();

const columns = [
  columnHelper.accessor("name", {
    header: "Nombre",
    enableSorting: true,
    sortingFn: "text",
  }),
  columnHelper.accessor("color", {
    header: "Color",
    enableSorting: false,
  }),
  columnHelper.accessor("type", {
    header: "Tipo de mueble",
    enableSorting: false,
  }),
  columnHelper.accessor("stock", {
    header: "Stock",
    enableSorting: false,
  }),
  columnHelper.accessor("dailyRate", {
    header: "Tarifa diaria",
    enableSorting: false,
    cell: (info) => (
      <p className="text-right text-green-500 font-semibold">{`$${info.getValue()}`}</p>
    ),
  }),
  columnHelper.accessor("isActive", {
    header: "Estado",
    enableSorting: true,
    cell: (info) => (
      <div className="flex justify-center">
        <Badge variant={info.getValue() ? "success" : "destructive"}>
          {info.getValue() ? "Activo" : "Inactivo"}
        </Badge>
      </div>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "Acciones",
    cell: (props) => {
      return <FurnitureActionButtons furniture={props.row.original} />;
    },
  }),
] as ColumnDef<Furniture>[];

function FurnituresDisplayTable() {
  const {
    data: furnitures,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["furnitures"],
    queryFn: furnitureService.getAll,
  });

  console.log(furnitures);
  return (
    <div>
      {/* FIXED: Added the TValue generic parameter as 'any' since we have mixed value types */}
      <DataTable<Furniture>
        columns={columns}
        data={furnitures ?? []}
        isLoading={isLoading}
        error={error}
        filterConfig={{
          filters: [
            {
              type: "text",
              key: "search",
              placeholder: "Buscar por nombre",
            },
          ],
          globalFiltersFn: (furniture, filters) => {
            const search = (
              typeof filters.search === "string" ? filters.search : ""
            ).toLowerCase();
            return furniture.name.toLowerCase().includes(search);
          },
        }}
      />
    </div>
  );
}

export default FurnituresDisplayTable;
