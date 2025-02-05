"use client";
import { Client } from "@/types/user.interface";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { ActionButons } from "./client-table-action-buttons";
import { useQuery } from "@tanstack/react-query";
import { clientsService } from "@/services/client.service";
import DataTable from "@/components/core/data-display/DataTable";
import { CreateClientButton } from "./create-client-button";

//Colums data definition
export const columnHelper = createColumnHelper<Client>();

const columns = [
  columnHelper.accessor("name", {
    header: "Nombre",
    enableSorting: true,
    sortingFn: "text",
    cell: (info) => <p className="font-semibold">{info.getValue()}</p>,
  }),
  columnHelper.accessor("phone", {
    header: "Teléfono",
    enableSorting: false,
    cell: (info) => <p>{info.getValue().join(", ")}</p>,
  }),
  columnHelper.accessor("addressReference", {
    header: "Referencia de dirección",
    enableSorting: false,
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
      return <ActionButons client={props.row.original} />;
    },
  }),
] as ColumnDef<Client>[];

function ClientsDisplayTable() {
  const {
    data: clients,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: clientsService.getAll,
  });
  return (
    <div>
      <DataTable
        columns={columns}
        data={clients ?? []}
        isLoading={isLoading}
        error={error}
        filterConfig={{
            filters: [
                {
                    type: "text",
                    key: "search",
                    placeholder: "Buscar por nombre",
                },
                {
                    type: "select",
                    key: "state",
                    placeholder: "Buscar por estado",
                    options: ["Activo", "Inactivo"],
                },
            ],
            globalFiltersFn: (client, filters) => {
                const search = (
                    typeof filters.search === "string" ? filters.search : ""
                ).toLocaleLowerCase();
                return client.name.toLocaleLowerCase().includes(search);
            }
        }}
        actionButton={<CreateClientButton />}
      />
    </div>
  );
}

export default ClientsDisplayTable;
