import React from 'react';
import RestaurantMenuScreen from './screens/RestaurantMenuScreen';
import { withUserAgent } from 'react-useragent';
import { 
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import './index.css';

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
    <BrowserRouter>
      <div className='app-mobile'/*{props.ua.mobile? 'app-mobile': 'app'}*/
        style={{
          height: `${windowSize.height}px`,
          width: `${windowSize.width}px`
        }}
      >
        <Switch>
          <Route path='/:restaurant_identifier'>
            <RestaurantMenuScreen/>
          </Route>
          <Route path='/'>
            <div>
              A list of restaurants.
            </div>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )

}

export default withUserAgent(App);
