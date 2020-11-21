import { createContext } from 'react';

export default createContext({
  restaurant: null,
  selectedMenuIndex: 0,
  menu: null,
  activeFilters: null,
  allergens: {}, // name to allergen id
  excludedDishes: null,
  error: null,
  setFilters: () => {},
  setSelectedMenu: () => {},
});
