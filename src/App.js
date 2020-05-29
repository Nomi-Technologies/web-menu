import React from 'react';
import './index.css';
import RestaurantScreen from './screens/RestaurantScreen';

function App() {
  return (
    <div className="App">
      <RestaurantScreen restaurantId={1}/>
    </div>
  );
}

export default App;
