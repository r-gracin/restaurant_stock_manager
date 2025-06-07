// function FoodStock() {
//   return <div><h2>Food Stock Page</h2></div>;
// }

// export default FoodStock;

// import axios from 'axios';
// import { useEffect, useState } from 'react';

// function FoodStock() {
//   const [foods, setFoods] = useState([]);

//   useEffect(() => {
//     axios.get('/api/foods')  // relative path
//       .then(res => setFoods(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h2>Food Stock</h2>
//       <ul>
//         {foods.map(food => (
//           <li key={food._id}>{food.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default FoodStock;

import { useState, useEffect } from 'react';
import axios from 'axios';

function FoodStock() {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState({
    name: '',
    type: '',
    price: '',
    amount: ''
  });

  // Load existing food stock
  useEffect(() => {
    axios.get('/api/foods')
      .then(res => setFoods(res.data))
      .catch(err => console.error(err));
  }, []);

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
    <div style={{
            position: 'fixed    ',
            top: 100,
            width: '100%',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
            }}>
      <h2>Food Stock</h2>

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

      <ul>
        {foods.map((food) => (
          <li key={food._id}>
            {food.name} ({food.type}) - ${food.price} x {food.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodStock;

