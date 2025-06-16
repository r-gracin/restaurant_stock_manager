import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogDescription, DialogHeader, DialogFooter, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';

// Used for testing if backend is not working
// import { sampleData } from './table/TableData';
import { useTableColumns } from './table/TableColumns';
import GlobalSearch from './table/GlobalSearch';
import ColumnFilters from './table/ColumnFilters';
import TableBody from './table/TableBody';
import TablePagination from './table/TablePagination';

const FoodStock = () => {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState({
      name: '',
      type: '',
      price: '',
      amount: ''
  });
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  // Load existing food stock
  useEffect(() => {
    axios.get('/api/foods')
      .then(res => setFoods(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handle food item deletion (shows dialog box)
  const handleDeleteClick = (foodRow) => {
    setDeleteId(foodRow._id);
  };

  // Handle confirm of food item deletion
  const handleConfirmDelete = () => {
    if (deleteId !== null)
    {
      axios.delete(`/api/foods/${deleteId}`)
      .then(() => {
        return axios.get('/api/foods'); // re-fetch everything
      })
      .then(res => {
        setFoods(res.data);
      })
      .catch(err => {
        console.error(err);
        alert('Delete failed');
      });
    }
    else
    {
      alert('Missing delete ID');
    }
    setDeleteId(null);
  };

  // Handle cancel of food item deletion
  const handleCancelDelete = () => {
    setDeleteId(null);
  };

  const columns = useTableColumns(handleDeleteClick);

  const table = useReactTable({
    data: foods,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const containerStyles = {
    width: '100%',
    fontFamily: 'Arial, sans-serif',
    position: 'fixed',
    top: 40
  };

  // Handle form input changes
  const handleChange = (e) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/foods', {
      ...newFood,
      price: parseFloat(newFood.price),
      amount: parseInt(newFood.amount)
    })
    .then(res => {
      setFoods([...foods, res.data]); // update local list
      setNewFood({ name: '', type: '', price: '', amount: '' }); // clear form
    })
    .catch(err => console.error(err));
  };

  return (
    <div style={containerStyles}>
      <GlobalSearch
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalRows={table.getRowModel().rows.length}
        filteredRows={table.getFilteredRowModel().rows.length}
      />
      
      <ColumnFilters
        columns={columns}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />

      <form onSubmit={handleSubmit}>
         <input
           type="text"
           name="name"
           placeholder="Name"
           value={newFood.name}
           onChange={handleChange}
           required
         />
         <input
           type="text"
           name="type"
           placeholder="Type"
           value={newFood.type}
           onChange={handleChange}
           required
         />
         <input
           type="number"
           name="price"
           placeholder="Price"
           value={newFood.price}
           onChange={handleChange}
           required
           step="0.01"
         />
         <input
           type="number"
           name="amount"
           placeholder="Amount"
           value={newFood.amount}
           onChange={handleChange}
           required
         />
         <button type="submit">Add Food</button>
       </form>
      
      <TableBody
        table={table}
        columns={columns}
      />
      
      <TablePagination table={table} />

      <Dialog open={deleteId !== null} onOpenChange={setDeleteId}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>

          <p>
            Are you sure you want to delete this row? This action cannot be undone.
          </p>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={handleCancelDelete}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    </div>
  );
};

export default FoodStock;