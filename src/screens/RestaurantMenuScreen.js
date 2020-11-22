import React, { useState, useEffect } from 'react';
import MobileRestaurantScreen from 'narrow-screen/screens/RestaurantScreen';
import WebRestuarantScreen from 'wide-screen/screens/RestaurantScreen';
import { useParams } from 'react-router-dom';
import { getRestaurant, getDishesOfMenu, parseMenu } from 'utils';
import { filterMenu, googleAnalyticsPageView } from "../utils"
import RestaurantContext from '../RestaurantContext';

export default () => {
  const { restaurant_identifier } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [activeFiltersByMenu, setActiveFiltersByMenu] = useState([]);
  const [excludedDishesByMenu, setExcludedDishesByMenu] = useState([]);
  const [selectedMenuIndex, setSelecteMenuIndex] = useState(0);
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    googleAnalyticsPageView(restaurant_identifier)
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
            setMenus(dishesByMenu);
          }
        );
      })
      .catch(err => {
        setError(err);
      });
  }, [restaurant_identifier]);

  // create allergen dictionary
  let allergenDict = {}
  if(menus[selectedMenuIndex]?.tags) {
    Object.entries(menus[selectedMenuIndex].tags).forEach(tag => {
      allergenDict[tag[1].name] = tag[1].id
    })
  }
  

  return (
    <RestaurantContext.Provider value={{
      restaurant: restaurant,
      selectedMenuIndex: selectedMenuIndex,
      menu: menus[selectedMenuIndex],
      allergens: allergenDict,
      activeFilters: activeFiltersByMenu[selectedMenuIndex],
      excludedDishes: excludedDishesByMenu[selectedMenuIndex],
      error: error,
      setFilters: (filters) => {
        let filtersByMenu = activeFiltersByMenu.slice(0);
        filtersByMenu[selectedMenuIndex] = filters;
        setActiveFiltersByMenu(filtersByMenu);
        const menusCopy = menus.slice(0);
        const menu = menusCopy[selectedMenuIndex];
        let { excluded, hasRemovables } = filterMenu(menu.dishesByTags, filters);
        menu.hasRemovables = hasRemovables;
        setMenus(menusCopy);
        const excludedDishes = excludedDishesByMenu.slice(0);
        excludedDishes[selectedMenuIndex] = excluded;
        setExcludedDishesByMenu(excludedDishes);
      },
      setSelectedMenu: setSelecteMenuIndex,
    }}>
      {
        window.innerWidth < 1000 ?
        <MobileRestaurantScreen />
        :
        <WebRestuarantScreen />
      }
    </RestaurantContext.Provider>
  );
};
