import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div  style={{
    position: 'fixed    ',
    top: 100,
    width: '100%',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
     }}>
      <div style={{ display: 'flex', gap: '100px' }}>
        <div onClick={() => navigate('/foodstock')} style={{ cursor: 'pointer', textAlign: 'center' }}>
          <img src="foodstock.png" alt="FoodStock" width="200" />
          <p>FoodStock</p>
        </div>
        <div onClick={() => navigate('/mealplan')} style={{ cursor: 'pointer', textAlign: 'center'}}>
          <img src="/mealplan.png" alt="MealPlan" width="200" />
          <p>MealPlan</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
