import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import FoodStock from './components/FoodStock';
import MealPlan from './components/MealPlan';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foodstock" element={<FoodStock />} />
        <Route path="/mealplan" element={<MealPlan />} />
      </Routes>
    </Router>
  );
}

export default App;
