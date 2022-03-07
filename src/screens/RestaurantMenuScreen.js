import React, { useState, useEffect, useLayoutEffect } from "react";
import MobileRestaurantScreen from "narrow-screen/screens/RestaurantScreen";
import WebRestuarantScreen from "wide-screen/screens/RestaurantScreen";
import { useParams } from "react-router-dom";
import { getRestaurant, getDishesOfMenu, parseMenu } from "utils";
import { filterMenu, googleAnalyticsPageView, FilterSet } from "../utils";
import RestaurantContext from "../RestaurantContext";

export default () => {
  const { restaurant_identifier } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [activeFiltersByMenu, setActiveFiltersByMenu] = useState([]);

  // Init to [undefined] - undefined means include all dishes
  const [includedDishesByMenu, setIncludedDishesByMenu] = useState([]);
  const [excludedDishesByMenu, setExcludedDishesByMenu] = useState([]);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [menus, setMenus] = useState([]);
  const [dishesById, setDishesById] = useState({});
  const [savedDishes, setSavedDishes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    googleAnalyticsPageView(restaurant_identifier);
    getRestaurant(restaurant_identifier)
      .then((restaurant) => {
        setRestaurant(restaurant);

        Promise.all(
          restaurant.Menus.map(async (menu) => {
            let rawMenu = await getDishesOfMenu(restaurant_identifier, menu.id);
            return parseMenu(rawMenu, menu.enableFiltering);
          })
        ).then((parsedMenus) => {
          setActiveFiltersByMenu(parsedMenus.map(() => new FilterSet()));
          setExcludedDishesByMenu(parsedMenus.map(() => new Set()));
          setMenus(parsedMenus);
          const dishesLUT = parsedMenus.reduce((accumulator, menu) => {
            menu.dishes.forEach((dish) => {
              accumulator[dish.id] = dish;
            });
            return accumulator;
          }, {});
          setDishesById(dishesLUT);
          const allSavedDishes = JSON.parse(
            localStorage.getItem("savedDishes") ?? "{}"
          );
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
              if (
                !dishesLUT[id].Modifications.some((mod) => mod.id === modId)
              ) {
                removedMods.push(modId);
              }
            });
            savedDishes[index].modIds = modIds.filter(
              (modId) => removedMods.indexOf(modId) < 0
            );
          });
          savedDishes = savedDishes.filter(
            ({ id }) => removedDishes.indexOf(id) < 0
          );
          allSavedDishes[restaurant.id] = savedDishes;
          localStorage.setItem("savedDishes", JSON.stringify(allSavedDishes));
          setSavedDishes(savedDishes);
        });
      })
      .catch((err) => {
        setError(err);
      });
  }, [restaurant_identifier]);

  // create allergen dictionary
  let allergenLUT = {};
  if (menus[selectedMenuIndex]?.filters.allergens) {
    Object.values(menus[selectedMenuIndex].filters.allergens).forEach((tag) => {
      allergenLUT[tag.name] = tag.id;
    });
  }

  return (
    <RestaurantContext.Provider
      value={{
        restaurant,
        selectedMenuIndex,
        menu: menus[selectedMenuIndex],
        allergens: allergenLUT,
        activeFilters: activeFiltersByMenu[selectedMenuIndex],
        includedDishes: includedDishesByMenu[selectedMenuIndex],
        excludedDishes: excludedDishesByMenu[selectedMenuIndex],
        dishesById,
        savedDishes,
        error: error,
        setFilters: ({
          allergens = activeFiltersByMenu[selectedMenuIndex].allergens,
          diets = activeFiltersByMenu[selectedMenuIndex].diets,
          searchDishes = activeFiltersByMenu[selectedMenuIndex].searchDishes,
        }) => {
          let filtersByMenu = [...activeFiltersByMenu];
          filtersByMenu[selectedMenuIndex].allergens = allergens;
          filtersByMenu[selectedMenuIndex].diets = diets;
          filtersByMenu[selectedMenuIndex].searchDishes = searchDishes;
          setActiveFiltersByMenu(filtersByMenu);
          const menusCopy = [...menus];
          const menu = menusCopy[selectedMenuIndex];
          const dishes = menu.dishes;
          let { included, excluded, hasRemovables } = filterMenu(
            menu.dishesByFilters,
            searchDishes,
            {
              allergens,
              diets,
              dishes,
            }
          );
          menu.hasRemovables = hasRemovables;
          setMenus(menusCopy);

          const includedDishes = [...includedDishesByMenu];
          includedDishes[selectedMenuIndex] = included;
          setIncludedDishesByMenu(includedDishes);
          const excludedDishes = [...excludedDishesByMenu];
          excludedDishes[selectedMenuIndex] = excluded;
          setExcludedDishesByMenu(excludedDishes);
        },
        setSelectedMenu: setSelectedMenuIndex,
        setSavedDishes: (dishes) => {
          setSavedDishes(dishes);
          const saved = JSON.parse(localStorage.getItem("savedDishes") ?? "{}");
          saved[restaurant.id] = dishes;
          localStorage.setItem("savedDishes", JSON.stringify(saved));
        },
      }}
    >
      {window.innerWidth < 1000 ? (
        <MobileRestaurantScreen />
      ) : (
        <WebRestuarantScreen />
      )}
    </RestaurantContext.Provider>
  );
};
