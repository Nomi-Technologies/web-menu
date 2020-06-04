import React from 'react';
import './index.css';
import RestaurantScreen from './screens/RestaurantScreen';

function App() {

  const [windowSize, setWindowSize] = React.useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }
    window.addEventListener('resize', handleResize);
  });
  
  return (
    <div className="App"
      style={{
        height: `${windowSize.height}px`,
        width: `${windowSize.width}px`
      }}
    >
      <RestaurantScreen restaurantId={1}/>
    </div>
  );
}

export default App;
