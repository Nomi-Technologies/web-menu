import React, { useState, useEffect, useLayoutEffect } from 'react';
import MobileRestaurantScreen from 'narrow-screen/screens/RestaurantScreen';
import WebRestuarantScreen from 'wide-screen/screens/RestaurantScreen';
import { useParams } from 'react-router-dom';
import { getRestaurant, getDishesOfMenu, parseMenu } from 'utils';
import { filterMenu, googleAnalyticsPageView, FilterSet } from "../utils"
import RestaurantContext from '../RestaurantContext';

export default () => {
  const { restaurant_identifier } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [activeFiltersByMenu, setActiveFiltersByMenu] = useState([]);
  const [excludedDishesByMenu, setExcludedDishesByMenu] = useState([]);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [menus, setMenus] = useState([]);
  const [dishesById, setDishesById] = useState({});
  const [savedDishes, setSavedDishes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    googleAnalyticsPageView(restaurant_identifier)
    getRestaurant(restaurant_identifier)
      .then(restaurant => {
        setRestaurant(restaurant);
        
        Promise.all(restaurant.Menus.map(async menu => {
          let rawMenu = await getDishesOfMenu(restaurant_identifier, menu.id);
          return parseMenu(rawMenu, menu.enableFiltering);
        })).then(
          dishesByMenu => {
            setActiveFiltersByMenu(dishesByMenu.map(() => new FilterSet()));
            setExcludedDishesByMenu(dishesByMenu.map(() => new Set()));
            setMenus(dishesByMenu);
            const dishesLUT = dishesByMenu.reduce((accumulator, menu) => {
              menu.dishes.forEach((dish) => {
                accumulator[dish.id] = dish;
              });
              return accumulator;
            }, {});
            setDishesById(dishesLUT);
            const allSavedDishes = JSON.parse(localStorage.getItem('savedDishes') ?? '{}');
            let savedDishes = allSavedDishes[restaurant.id] ?? [];

            // purge localStorage
            let removedDishes = [];
            savedDishes.forEach(({ id, modIds }, index) => {
              if (!dishesLUT[id]) {
                removedDishes.push(id);
                return;
              }
              let removedMods = [];
              modIds.forEach((modId) => {
                if (!dishesLUT[id].Modifications.some((mod) => mod.id === modId)) {
                  removedMods.push(modId);
                }
              });
              savedDishes[index].modIds = modIds.filter((modId) => removedMods.indexOf(modId) < 0);
            });
            savedDishes = savedDishes.filter(({ id }) => removedDishes.indexOf(id) < 0);
            allSavedDishes[restaurant.id] = savedDishes;
            localStorage.setItem('savedDishes', JSON.stringify(allSavedDishes));
            setSavedDishes(savedDishes);
          }
        );
      })
      .catch(err => {
        setError(err);
      });
  }, [restaurant_identifier]);

  // create allergen dictionary
  let allergenLUT = {}
  if(menus[selectedMenuIndex]?.filters.allergens) {
    Object.values(menus[selectedMenuIndex].filters.allergens).forEach((tag) => {
      allergenLUT[tag.name] = tag.id
    })
  }
  

  return (
    <RestaurantContext.Provider value={{
      restaurant,
      selectedMenuIndex,
      menu: menus[selectedMenuIndex],
      allergens: allergenLUT,
      activeFilters: activeFiltersByMenu[selectedMenuIndex],
      excludedDishes: excludedDishesByMenu[selectedMenuIndex],
      dishesById,
      savedDishes,
      error: error,
      setFilters: (filters = {
          allergens = activeFiltersByMenu[selectedMenuIndex].allergens,
          diets = activeFiltersByMenu[selectedMenuIndex].diets,
        }) => {
          let filtersByMenu = activeFiltersByMenu.slice(0);
          filtersByMenu[selectedMenuIndex] = filters;
          setActiveFiltersByMenu(filtersByMenu);
          const menusCopy = menus.slice(0);
          const menu = menusCopy[selectedMenuIndex];
          let { excluded, hasRemovables } = filterMenu(menu.dishesByFilters,
            { allergens, diets }
          );
          menu.hasRemovables = hasRemovables;
          setMenus(menusCopy);
          const excludedDishes = excludedDishesByMenu.slice(0);
          excludedDishes[selectedMenuIndex] = excluded;
          setExcludedDishesByMenu(excludedDishes);
      },
      setSelectedMenu: setSelectedMenuIndex,
      setSavedDishes: (dishes) => {
        setSavedDishes(dishes);
        const saved = JSON.parse(localStorage.getItem('savedDishes') ?? '{}');
        saved[restaurant.id] = dishes;
        localStorage.setItem('savedDishes', JSON.stringify(saved));
      }
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
