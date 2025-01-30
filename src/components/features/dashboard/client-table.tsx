import React from 'react'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

function ClientTable() {
    const clients = [
        {
          name: "John Doe",
          phone: "+1-555-123-4567",
          return: 150.25,
        },
        {
          name: "Jane Smith",
          phone: "+1-555-987-6543",
          return: 225.50,
        },
        {
          name: "Michael Johnson",
          phone: "+1-555-678-9012",
          return: 100.00,
        },
      ];
  return (
    <Table>
        <TableBody>
            {clients.map(client => (
                <TableRow key={client.phone}>
                    <TableCell className='font-semibold'>{client.name}</TableCell>
                    <TableCell className='text-gray-500'>{client.phone}</TableCell>
                    <TableCell className='text-green-600 text-right'>${client.return}</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default ClientTable;
