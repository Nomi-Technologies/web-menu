import React, { useState, useEffect } from 'react';
import MobileRestaurantScreen from 'narrow-screen/screens/RestaurantScreen';
import WebRestuarantScreen from 'wide-screen/screens/RestaurantScreen';
import { useParams } from 'react-router-dom';
import { getRestaurant, getDishesOfMenu, parseMenu } from 'utils';
import RestaurantContext from '../restaurant-context';
import { filterMenu } from "../utils"

export default () => {
  const { restaurant_identifier } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [activeFiltersByMenu, setActiveFiltersByMenu] = useState([]);
  const [excludedDishesByMenu, setExcludedDishesByMenu] = useState([]);
  const [selectedMenuIndex, setSelecteMenuIndex] = useState(0);
  const [dishesByMenu, setDishesByMenu] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRestaurant(restaurant_identifier)
      .then(restaurant => {
        setRestaurant(restaurant);
        
        Promise.all(restaurant.Menus.map(async menu => {
          let rawMenu = await getDishesOfMenu(restaurant_identifier, menu.id);
          return parseMenu(rawMenu);
        })).then(
          dishesByMenu => {
            setActiveFiltersByMenu(dishesByMenu.map(() => new Set()));
            setExcludedDishesByMenu(dishesByMenu.map(() => new Set()));
            setDishesByMenu(dishesByMenu);
          }
        );
      })
      .catch(err => {
        setError(err);
      });
  }, [restaurant_identifier]);
  return (
    <RestaurantContext.Provider value={{
      restaurant: restaurant,
      selectedMenuIndex: selectedMenuIndex,
      menu: dishesByMenu[selectedMenuIndex],
      activeFilters: activeFiltersByMenu[selectedMenuIndex],
      excludedDishes: excludedDishesByMenu[selectedMenuIndex],
      error: error,
      setFilters: (filters) => {
        let filtersByMenu = activeFiltersByMenu.slice(0);
        filtersByMenu[selectedMenuIndex] = filters;
        setActiveFiltersByMenu(filtersByMenu);

        const menu = dishesByMenu[selectedMenuIndex];
        // let excluded = new Set();
        // filters.forEach((t) =>
        //   menu.dishesByTags[t].forEach((dish) => excluded.add(dish.id))
        // );
        let excluded = filterMenu(menu.tags, menu.dishesByTags, filters)
        
        const excludedDishes = excludedDishesByMenu.slice(0);
        excludedDishes[selectedMenuIndex] = excluded;
        setExcludedDishesByMenu(excludedDishes);
      },
      setSelectedMenu: setSelecteMenuIndex,
    }}>
      {
        window.innerWidth < 760 ?
        <MobileRestaurantScreen />
        :
        <WebRestuarantScreen />
      }
    </RestaurantContext.Provider>
  );
};
