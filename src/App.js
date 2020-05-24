import React from 'react';
import './index.css';
import MenuScreen from './screens/MenuScreen';

function App() {
  return (
    <div className="App">
      <MenuScreen restaurantId={1}/>
    </div>
  );
}

export default App;
