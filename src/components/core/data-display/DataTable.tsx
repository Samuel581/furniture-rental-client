"use client";
import React from "react";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
  type Column,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../ui/table";
import { Button } from "@/components/ui/button";

type FilterState = {
  [key: string]: string | boolean;
};

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  filterConfig?: {
    filters: Array<{
      type: "text" | "select";
      key: string;
      placeholder: string;
      options?: string[];
    }>;
    globalFiltersFn: (row: TData, filterValue: FilterState) => boolean;
  };
  isLoading?: boolean;
  error?: Error | null;
}

function DataTable<TData>({
  columns,
  data,
  filterConfig,
  isLoading,
  error,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<FilterState>({});

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _, filterValue) => {
      return filterConfig?.globalFiltersFn(row.original, filterValue) ?? true;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-2">
      {filterConfig && (
        <div className="mb-4 flex gap-4">
          {filterConfig.filters.map((filter) => (
            <FilterInput
              key={filter.key}
              filter={filter}
              value={globalFilter[filter.key]?.toString() || ""}
              onChange={(value: unknown) =>
                setGlobalFilter((prev) => ({
                  ...prev,
                  [filter.key]: value as string | boolean,
                }))
              }
            />
          ))}
        </div>
      )}
      <div className="rounded-md border">
        <Table className="w-full overflow-hidden shadow-lg">
          {/* Table Header */}
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="p-2 text-center"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <SortingIndicator column={header.column} />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {/* Table Body */}
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-2 text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Pagina anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Pagina siguiente
        </Button>
      </div>
    </div>
  );
}

const SortingIndicator = <TData,>({
  column,
}: {
  column: Column<TData, unknown>;
}) => {
  const sortedState = column.getIsSorted();
  return (
    <>
      {sortedState === "asc" && <ArrowBigUp className="inline-block ml-2" />}
      {sortedState === "desc" && <ArrowBigDown className="inline-block ml-2" />}
    </>
  );
};

const FilterInput = ({
  filter,
  value,
  onChange,
}: {
  filter: NonNullable<DataTableProps<unknown>["filterConfig"]>["filters"][0];
  value: string;
  onChange: (value: string) => void;
}) => {
  if (filter.type === "select") {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">{filter.placeholder}</option>
        {filter.options?.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type="text"
      placeholder={filter.placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded"
    />
  );
};

export default DataTable;
