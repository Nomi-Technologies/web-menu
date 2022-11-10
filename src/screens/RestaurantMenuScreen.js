import React, { useState, useEffect, useLayoutEffect } from "react";
import MobileRestaurantScreen from "narrow-screen/screens/RestaurantScreen";
import WebRestuarantScreen from "wide-screen/screens/RestaurantScreen";
import { useParams, useSearchParams } from "react-router-dom";
import { getRestaurant, getDishesOfMenu, parseMenu } from "utils";
import { filterMenu, googleAnalyticsPageView, FilterSet } from "../utils";
import RestaurantContext from "../RestaurantContext";

export default () => {
  let { restoId } = useParams();
  restoId = restoId ?? "demo-restaurant";
  const [searchParams, setSearchParams] = useSearchParams();
  const queryMenuId = searchParams.get("menuId");

  const [restaurant, setRestaurant] = useState(null);
  const [activeFiltersByMenu, setActiveFiltersByMenu] = useState([]);

  // Init to [undefined] - undefined means include all dishes
  const [includedDishesByMenu, setIncludedDishesByMenu] = useState([]);
  const [excludedDishesByMenu, setExcludedDishesByMenu] = useState([]);
  const [menus, setMenus] = useState([]);
  const [dishesById, setDishesById] = useState({});
  const [savedDishes, setSavedDishes] = useState([]);
  const [error, setError] = useState(null);

  let selectedMenuIndex = 0;
  for (let i = 0; i < menus.length; ++i) {
    if (menus[i].id === queryMenuId) {
      selectedMenuIndex = i;
      break;
    }
  }

  useEffect(() => {
    googleAnalyticsPageView(restoId);
    getRestaurant(restoId)
      .then((restaurant) => {
        setRestaurant(restaurant);

        Promise.all(
          restaurant.Menus.map(async (menu) => {
            let rawMenu = await getDishesOfMenu(restoId, menu.id);
            return parseMenu(rawMenu, menu.id, menu.enableFiltering);
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
  }, [restoId]);

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
            { ...menu.dishesByFilters, bySearchValue: searchDishes },
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
        setSelectedMenu: (index) =>
          setSearchParams({ menuId: menus[index].id }),
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
