import { createContext } from 'react';

export default createContext({
  restaurant: null,
  selectedMenuIndex: 0,
  menu: null,
  activeFilters: null,
  excludedDishes: null,
  error: null,
  setFilters: () => {},
  setSelectedMenu: () => {},
});