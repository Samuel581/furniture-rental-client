// components/UserTable.tsx
"use client"; // Required for Next.js App Router
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel
} from "@tanstack/react-table";
import { UserPen, UserX, ArrowBigUp, ArrowBigDown } from "lucide-react";
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { clientsService } from '@/services/client';
import { Client } from "@/interfaces/user.interface";
//TODO: explain
const columnHelper = createColumnHelper<Client>();

const columns = [
  // Define columns using the column helper:
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("name", {
    header: "Nombre",
    enableSorting: true,
  }),
  columnHelper.accessor("phone", {
    header: "Telefono",
  }),
  columnHelper.accessor("addressReference", {
    header: "Referencia",
  }),
  columnHelper.accessor("isActive", {
    header: "Estado",
    enableSorting: true
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2">
        <button className="px-2 py-1 bg-black text-white rounded">
          <UserPen />
        </button>
        <button className="px-2 py-1 bg-red-500 text-white rounded">
          <UserX />
        </button>
      </div>
    ),
  }),
];

//TODO: Explain
function ClientsDisplayTable() {
  const [sorting, setSorting] = useState<SortingState>([]); // Sorting state
  const [globalFilter, setGlobalFilter] = useState({
    search: "",
    state: "",
  });

  const { data: clients, isLoading, error } = useQuery({
    queryKey: ['clients'],
    queryFn: clientsService.getAll,
  });

  const table = useReactTable({
    data: clients ?? [],
    columns,
    state: {
      sorting,
      globalFilter
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _, filterValue) => {
      const search = filterValue.search.toLowerCase();
      const state = filterValue.state;
      return (
        row.original.name.toLowerCase().includes(search) &&
        (state === '' || row.original.isActive === state)
      );
    },
  });

  if (isLoading) {
    return <div>Loading clients...</div>;
  }

  if (error) {
    return <div>Error loading clients</div>;
  }

  return (
    //Filter inputs

    //Table
    <div className="p-2">
      <div className="mb-4 flex gap-4">
        {/* Name Search Input */}
        <input
          type="text"
          placeholder="Search names..."
          value={globalFilter.search}
          onChange={(e) =>
            setGlobalFilter((prev) => ({ ...prev, search: e.target.value }))
          }
          className="p-2 border rounded"
        />

        {/* Role Filter Dropdown */}
        <select
          value={globalFilter.state}
          onChange={(e) =>
            setGlobalFilter((prev) => ({ ...prev, role: e.target.value }))
          }
          className="p-2 border rounded"
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>
      <table className="border">
        {/* Here we poblate the headers columns */}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 border cursor-pointer">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: <ArrowBigUp />,
                    desc: <ArrowBigDown />,
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border">
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

export default ClientsDisplayTable;
