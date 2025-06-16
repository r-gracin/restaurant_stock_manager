import React from 'react';
import { numericFilter } from './TableData';

  // // Handle form submission
  // const handleDelete = (e, id) => {
  //   e.preventDefault();
  //   axios.delete(`/api/foods/${id}`)
  //   .then(res => {
  //     setFoods([...foods, res.data]); // update local list
  //     setNewFood({ name: '', type: '', price: '', amount: '' }); // clear form
  //   })
  //   .catch(err => console.error(err));
  // };

export const useTableColumns = (handleDelete) => {
  return React.useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div style={{ fontWeight: 'bold' }}>{row.getValue('name')}</div>
      ),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => (
        <div style={{ color: '#666' }}>{row.getValue('type')}</div>
      ),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('price'));
        const formatted = new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
        }).format(amount);
        return <div style={{ fontWeight: 'bold' }}>{formatted}</div>;
      },
      filterFn: numericFilter,
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('amount'));
        return <div>{amount} pcs</div>;
      },
      filterFn: numericFilter,
    },
    {
      accessorKey: 'delete',
      header: '',
      cell: ({ row }) => (
        <button
          style={{ color: 'red' }}
          onClick={() => handleDelete(row.original)}
        >
          Delete
        </button>
      ),
    },
    // {
    //   accessorKey: 'status',
    //   header: 'Status',
    //   cell: ({ row }) => {
    //     const status = row.getValue('status');
    //     const statusColors = {
    //       Active: { backgroundColor: '#d4edda', color: '#155724' },
    //       Inactive: { backgroundColor: '#f8d7da', color: '#721c24' },
    //       Pending: { backgroundColor: '#fff3cd', color: '#856404' }
    //     };
    //     return (
    //       <span
    //         style={{
    //           ...statusColors[status],
    //           padding: '4px 8px',
    //           borderRadius: '12px',
    //           fontSize: '12px',
    //           fontWeight: 'bold',
    //           display: 'inline-block'
    //         }}
    //       >
    //         {status}
    //       </span>
    //     );
    //   },
    //   filterFn: 'includesString',
    // },
  ], []);
};