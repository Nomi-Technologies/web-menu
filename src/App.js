import React from 'react';
import RestaurantMenuScreen from 'screens/RestaurantMenuScreen';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import 'index.css';

import ReactGA from 'react-ga';

/******
 * App is restricted to the window's size to be compatible with mobile version
 * #root generally does not respond to the changes in size in .App
 */
export default () => {

  const [windowSize, setWindowSize] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  // if (process.env.NODE_ENV === "production") {
    console.log("initializing google analytics")
    ReactGA.initialize('G-1V27CCNXDJ');
    ReactGA.pageview(window.location.pathname + window.location.search);
  // }

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
      <div className='app'
        style={{
          height: `${windowSize.height}px`,
          width: `${windowSize.width}px`
        }}
      >
        <Switch>
          <Route path='/:restaurant_identifier'>
            <RestaurantMenuScreen/>
          </Route>
          <Route path='/' render={() => {
            window.location = 'https://www.dinewithnomi.com/';
          }}>
            {
              process.env.NODE_ENV === 'production' ?
              null : 'A list of restaurants'
            }
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )

}
