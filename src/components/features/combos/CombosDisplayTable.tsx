"use client";
import { combosService } from "@/services/combo.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Combo } from "@/types/combo.interface";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/core/data-display/DataTable";
import { ComboFurniture } from "@/types/comboFurniture.interface";

export const columnHelper = createColumnHelper<Combo>();

const colunns = [
  columnHelper.accessor("name", {
    header: "Nombre",
    enableSorting: true,
    sortingFn: "text",
    cell: (info) => <p className="font-semibold">{info.getValue()}</p>,
  }),
  columnHelper.accessor("dailyRate", {
    header: "Tarifa diaria",
    enableSorting: false,
    cell: (info) => (
      <p className="text-green-500 font-semibold">${info.getValue()}</p>
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
  columnHelper.accessor("ComboFurniture", {
    header: "Muebles",
    enableSorting: false,
    cell: (info) => (
      <div className="space-y-1">
        {info.getValue().map((item: ComboFurniture) => (
          <div key={item.id} className="flex">
            <p key={item.id} className="text-xs text-left w-44">
              {item.furniture.name} (x{item.quantity})
            </p>
            <Badge variant={"secondary"}>{item.furniture.color}</Badge>
          </div>
        ))}
      </div>
    ),
  }),
] as ColumnDef<Combo>[];

function CombosDisplayTable() {
  const { data: combos, isLoading } = useQuery({
    queryFn: () => combosService.getAll(),
    queryKey: ["combos"],
  });

  return (
    <div>
      <DataTable<Combo>
        columns={colunns}
        data={combos ?? []}
        isLoading={isLoading}
      />
    </div>
  );
}

export default CombosDisplayTable;
