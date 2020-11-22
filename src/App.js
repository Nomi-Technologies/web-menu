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
  
  React.useEffect(() => {

    let gaID = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;
    if (gaID) {
      console.log("initializing google analytics")
      ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }

    ReactGA.event({
      category: "Restaurant Load",
      action: "Visit Menu"
    })

  }, []); // [] to trigger only on first render


  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )

}
