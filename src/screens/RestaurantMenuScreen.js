import React, { useState, useEffect } from 'react';
import MobileRestaurantScreen from 'narrow-screen/screens/RestaurantScreen';
import WebRestuarantScreen from 'wide-screen/screens/RestaurantScreen';
import { useParams } from 'react-router-dom';
import { getRestaurant, getDishesOfMenu, parseMenu } from 'utils';

export default () => {

  const { restaurant_identifier } = useParams();

  const [menus, setMenus] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [selectedMenuIndex, setSelecteMenuIndex] = useState(0);
  const [dishesByMenu, setDishesByMenu] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRestaurant(restaurant_identifier)
      .then(restaurant => {
        setMenus(restaurant.Menus);
        setRestaurantName(restaurant.name);
        setRestaurantId(restaurant.id);
        
        Promise.all(restaurant.Menus.map(async menu => {
          let rawMenu = await getDishesOfMenu(restaurant_identifier, menu.id);
          return parseMenu(rawMenu);
        })).then(
          dishesByMenu => {
            setDishesByMenu(dishesByMenu);
          }
        );
      })
      .catch(err => {
        setError(err);
      });
  }, [restaurant_identifier]);

  return window.innerWidth < 760 ?
    <MobileRestaurantScreen
      menus={menus}
      restaurantName={restaurantName}
      restaurantId={restaurantId}
      dishesByMenu={dishesByMenu}
      selectedMenuIndex={selectedMenuIndex}
      error={error}
      onSelectMenu={setSelecteMenuIndex}
    />
    :
    <WebRestuarantScreen
      menus={menus}
      restaurantName={restaurantName}
      restaurantId={restaurantId}
      dishesByMenu={dishesByMenu}
      selectedMenuIndex={selectedMenuIndex}
      error={error}
      onSelectMenu={setSelecteMenuIndex}
    />;
};
