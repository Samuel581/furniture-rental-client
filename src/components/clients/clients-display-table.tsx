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
import { UserPen, UserX, ArrowBigUp, ArrowBigDown, Eye } from "lucide-react";
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { clientsService } from '@/services/client';
import { Client } from "@/interfaces/user.interface";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

// This function contains the info to setup the table later, also includes the type or interface of the data it'll recieve
// to not have errors of differ
const columnHelper = createColumnHelper<Client>();

const ActionButons = ({ client }: { client: Client }) => {
  
  const router = useRouter();

  return (
    <div className="flex flex-row justify-evenly">
    <button className="px-2 py-1 bg-blue-500 text-white rounded"
    onClick={() => router.push(`/clients/${client.id}`)}>
      <Eye/>
    </button>
    <button className="px-2 py-1 bg-black text-white rounded"
    onClick={() => router.push(`/clients/${client.id}/edit`)}>
      <UserPen />
    </button>
    <button className="px-2 py-1 bg-red-500 text-white rounded">
      <UserX />
    </button>
  </div>
  )
}

const CreateClientButton = () => {
  const router = useRouter()
  return(
    <Button onClick={() => router.push('/clients/create')}>
      Crear nuevo cliente
    </Button>
  )
}

// Here we define the columns and it's headers, we can skip the labels of the API response we don't want to implement
const columns = [
  columnHelper.accessor("name", {
    header: "Nombre",
    enableSorting: true,
    sortingFn: 'text'
  }),
  columnHelper.accessor("phone", {
    header: "Telefono",
    enableSorting: false
  }),
  columnHelper.accessor("addressReference", {
    header: "Referencia",
    enableSorting: false
  }),
  columnHelper.accessor("isActive", {
    header: "Activo",
    enableSorting: true, 
    cell: (info) => (
      <Badge variant={info.getValue() ? "success" : "destructive"}>
        { info.getValue() ? 'Activo' : 'Inactivo' }
      </Badge>
    )
  }),
  // This two columns are the actions buttons, those will be setup later but we include them now
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (props) => { return <ActionButons client={props.row.original}/> }
  }),
];

//TODO: Explain
function ClientsDisplayTable() {

  const [sorting, setSorting] = useState<SortingState>([]); // Sorting state, from now it's on TO IMPLEMENT
  // Filter state, this will be used to search names
  const [globalFilter, setGlobalFilter] = useState({
    search: "",
    state: "",
  });

  // This is how we fetch data using useQuey
  // A bit weird but creative a the same time
  const { data: clients, isLoading, error } = useQuery({
    queryKey: ['clients'],
    queryFn: clientsService.getAll,
  });

  // Here we define the table and it's filters and configuration
  const table = useReactTable({
    // Data to use on the table
    data: clients ?? [],
    // Columns config and data to render
    columns,
    // States configured
    state: {
      sorting,
      globalFilter
    },
    // Filter and sort onChanges and rows
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // Filter(s) settings and fallbacks
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
          <option value="">Cliente activo</option>
        </select>
        <CreateClientButton/>
      </div>
      <table className="border w-full">
        {/* Here we poblate the headers columns */}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th 
                key={header.id} 
                className="px-4 py-2 border cursor-pointer"
                onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: <ArrowBigUp className="inline-block ml-2"/>,
                    desc: <ArrowBigDown className="inline-block ml-2"/>,
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
                <td 
                key={cell.id} 
                className="px-4 py-2 border">
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
