// OLD code

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

 // Handle form submission
  const handleDelete = (e, id) => {
    e.preventDefault();
    axios.delete(`/api/foods/${id}`)
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

      {/* <ul>
        {foods.map((food) => (
          <li key={food._id}>
            {food.name} ({food.type}) - ${food.price} x {food.amount}
          </li>
        ))}
      </ul> */}
      <table border="1" style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food.id}>
              <td>{food.name}</td>
              <td>{food.type}</td>
              <td>${food.price}</td>
              <td>{food.amount}</td>
              <td>
                <button onClick={() => deleteFood(food.id)}>Delete</button>
                {/* Optional: Add update/edit functionality here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodStock;

