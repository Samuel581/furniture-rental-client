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
} from "@tanstack/react-table";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useState } from "react";

type FilterState = {
  [key: string]: string | boolean;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
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

function DataTable<TData, TValue>({
  columns,
  data,
  filterConfig,
  isLoading,
  error,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<FilterState>({});

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
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
      <table className="border w-full">
        {/* Table Header */}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 border"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  <SortingIndicator column={header.column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Table Body */}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const SortingIndicator = <TData,>({ 
  column 
}: { 
  column: Column<TData, unknown> 
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
  filter: NonNullable<DataTableProps<unknown, unknown>["filterConfig"]>["filters"][0];
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
