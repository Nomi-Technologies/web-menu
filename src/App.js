import React from 'react';
import { withUserAgent } from 'react-useragent';
import './index.css';
import MobileRestaurantScreen from './narrow-screen/screens/RestaurantScreen';

/******
 * App is restricted to the window's size to be compatible with mobile version
 * #root generally does not respond to the changes in size in .App
 */
function App(props) {

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

    return () => window.removeEventListener('resize', handleResize);
  }, []); // [] to trigger only on first render

  
  return (
    <div className='app-mobile'/*{props.ua.mobile? 'app-mobile': 'app'}*/
      style={{
        height: `${windowSize.height}px`,
        width: `${windowSize.width}px`
      }}
    >
      <MobileRestaurantScreen restaurantId={1}/>
    </div>
  )

}

export default withUserAgent(App);
