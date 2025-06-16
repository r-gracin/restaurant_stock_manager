import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{
    position: 'fixed    ',
    top: 0,
    width: '100%',
    background: '#333',
    padding: '10px',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    gap: '10px'
  }}>
    <Link to="/" style={{ color: 'white', margin: '10px' }}>Home</Link>
    <Link to="/foodstock" style={{ color: 'white', margin: '10px' }}>FoodStock</Link>
    <Link to="/mealplan" style={{ color: 'white', margin: '10px' }}>MealPlan</Link>
    <Link to="/testcode" style={{ color: 'white', margin: '10px' }}>TestCode</Link>
  </nav>
);

export default Navbar;
