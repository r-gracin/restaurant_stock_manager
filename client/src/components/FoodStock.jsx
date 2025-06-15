// OLD code

import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";

// const defaultData = [
//   {
//     name: 'tanner',
//     type: 'linsley',
//     price: 24,
//     amount: 100,
//   },
//   {
//     name: 'tandy',
//     type: 'miller',
//     price: 40,
//     amount: 40,
//   },
//   {
//     name: 'joe',
//     type: 'dirte',
//     price: 45,
//     amount: 20,
//   },
// ];


function FoodStock() {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState({
    name: '',
    type: '',
    price: '',
    amount: ''
  });
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);

  // Load existing food stock
  useEffect(() => {
    axios.get('/api/foods')
      .then(res => setFoods(res.data))
      .catch(err => console.error(err));
  }, []);

  const columns = useMemo(() => [
    {
      accessorKey: "name",
      header: () => "Name",
      cell: info => info.getValue(),
      filterFn: "includesString",
    },
    {
      accessorKey: "type",
      header: () => "Type",
      cell: info => info.getValue(),
      filterFn: "includesString",
    },
    {
      accessorKey: "price",
      header: () => "Price",
      cell: info => `$${info.getValue()}`,
      filterFn: "greaterThan",
    },
    {
      accessorKey: "amount",
      header: () => "Amount",
      cell: info => info.getValue(),
      filterFn: "greaterThan",
    },
    {
      accessorKey: "amount",
      header: () => "Amount",
      cell: info => info.getValue(),
      filterFn: "greaterThan",
    },
  ], []);

  const table = useReactTable({
    foods,
    columns,
    state: {
      columnFilters,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });


  // Handle form input changes
//   const handleChange = (e) => {
//     setNewFood({ ...newFood, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('/api/foods', {
//       ...newFood,
//       price: parseFloat(newFood.price),
//       amount: parseInt(newFood.amount)
//     })
//     .then(res => {
//       setFoods([...foods, res.data]); // update local list
//       setNewFood({ name: '', type: '', price: '', amount: '' }); // clear form
//     })
//     .catch(err => console.error(err));
//   };

//  // Handle form submission
//   const handleDelete = (e, id) => {
//     e.preventDefault();
//     axios.delete(`/api/foods/${id}`)
//     .then(res => {
//       setFoods([...foods, res.data]); // update local list
//       setNewFood({ name: '', type: '', price: '', amount: '' }); // clear form
//     })
//     .catch(err => console.error(err));
//   };

//   return (
//     <div style={{
//             position: 'fixed    ',
//             top: 100,
//             width: '100%',
//             zIndex: 1000,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center'
//             }}>
//       <h2>Food Stock</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={newFood.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="type"
//           placeholder="Type"
//           value={newFood.type}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={newFood.price}
//           onChange={handleChange}
//           required
//           step="0.01"
//         />
//         <input
//           type="number"
//           name="amount"
//           placeholder="Amount"
//           value={newFood.amount}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Add Food</button>
//       </form>

//       {/* <ul>
//         {foods.map((food) => (
//           <li key={food._id}>
//             {food.name} ({food.type}) - ${food.price} x {food.amount}
//           </li>
//         ))}
//       </ul> */}
//       <table border="1" style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Type</th>
//             <th>Price</th>
//             <th>Amount</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {foods.map((food) => (
//             <tr key={food.id}>
//               <td>{food.name}</td>
//               <td>{food.type}</td>
//               <td>${food.price}</td>
//               <td>{food.amount}</td>
//               <td>
//                 <button onClick={() => deleteFood(food.id)}>Delete</button>
//                 {/* Optional: Add update/edit functionality here */}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

    return (
    <div className="p-4" style={{
            position: 'fixed    ',
            top: 100,
            width: '100%',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
            }}>
      <h2 className="text-2xl font-bold mb-4">Food Items</h2>
        <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="border px-4 py-2 cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === "asc" ? " 🔼" :
                   header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                  <div>
                    {header.column.getCanFilter() ? (
                      <input
                        type="text"
                        className="mt-1 border p-1 text-sm w-full"
                        placeholder={`Filter ${header.column.id}`}
                        value={
                          (header.column.getFilterValue() ?? "")
                        }
                        onChange={e =>
                          header.column.setFilterValue(e.target.value)
                        }
                      />
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody> */}
      </table>
    </div>
  );
}

export default FoodStock;

