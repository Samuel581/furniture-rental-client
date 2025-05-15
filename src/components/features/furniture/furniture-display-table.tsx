"use client";
import { Furniture } from "@/types/furniture.interface";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import React from "react";
import FurnitureActionButtons from "./furniture-action-buttons";
import { useQuery } from "@tanstack/react-query";
import { furnitureService } from "@/services/furniture.service";
import DataTable from "@/components/core/data-display/base-data-table";
import CreateFurnitureButton from "./create-furniture-button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const columnHelper = createColumnHelper<Furniture>();

const columns = [
  columnHelper.accessor("name", {
    header: "Nombre",
    enableSorting: true,
    sortingFn: "text",
    cell: (info) => <p className="font-semibold">{info.getValue()}</p>,
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
      <p className="text-green-500 font-semibold">{info.getValue()}</p>
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
  return (
    <div>
      <div className="flex flex-row gap-5 mb-5 justify-items-start">
        <Card>
          <CardHeader>
            <CardTitle>{furnitures?.length}</CardTitle>
            <CardDescription>Muebles en el sistema</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-green-300">{furnitures?.filter((furniture) => furniture.isActive).length}</CardTitle>
            <CardDescription>Muebles activos</CardDescription>
          </CardHeader>
        </Card>
      </div>
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
        actionButton={<CreateFurnitureButton />}
      />
    </div>
  );
}

export default FurnituresDisplayTable;
