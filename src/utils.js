import { ResponsiveEmbed } from "react-bootstrap";

export const parseMenu = (data, enableFiltering) => {
  let menu = {
    categories: [],
    dishes: [],
    dishesByCategory: {},
    dishesByTags: {},
    tags: {},
    hasAllergens: false,
    hasRemovables: false,
    enableFiltering: enableFiltering,
  };

  data.forEach(dish => {
    // track if a menu has allergens, if not we can hide the slide up bar etc.
    if(dish.Tags.length > 0) {
      menu.hasAllergens = true;
    }

    menu.dishes.push(dish);
    if (!(dish.Category.id in menu.dishesByCategory)) {
      menu.categories.push(dish.Category);
      menu.dishesByCategory[dish.Category.id] = [];
    }
    menu.dishesByCategory[dish.Category.id].push(dish);
    dish.Tags.forEach(tag => {
      if (!(tag.id in menu.tags)) {
        menu.tags[tag.id] = tag;
        menu.dishesByTags[tag.id] = [];
      }
      menu.dishesByTags[tag.id].push(dish);
    });
    // menu.enableFiltering = dish.enableFiltering
  });
  return menu;
}

export const filterMenu = (dishesByTags, selectedFilters) => {
  let excluded = new Set();
  let onlyHasRemovables = new Set();

  selectedFilters.forEach((tagId) =>
    dishesByTags[tagId].forEach((dish) => {
      if (dish.Tags.some((tag) => tag.id === tagId && tag.DishTag.removable )) {
        // This dish-tag is removable
        if (!excluded.has(dish.id)) {
          // if excluded => the dish has been filtered out by another unremovable allergen
          // Do not add to removable in that case.
          onlyHasRemovables.add(dish.id);
        }
      } else {
        // Saw an unremovable allergen, remove from onlyHasRemovables
        excluded.add(dish.id);
        onlyHasRemovables.delete(dish.id);
      }
    })
  );
  return { excluded, hasRemovables: onlyHasRemovables.size > 0 };
}

export const getRestaurant = async restaurantId => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/webApi/${restaurantId}`);
  return res.json();
}

export const getDishesOfMenu = async (restaurantId, menuName) => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/webApi/${restaurantId}/${menuName}`);
  return res.json();
}

export const getRestaurantLogo = async (restaurantId) => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/images/restaurants/${restaurantId}`)
  let blob = await res.blob();
  return URL.createObjectURL(blob);
}

export const getMenuBannerImage = async (menuId) => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/images/menus/${menuId}`)
  if(res.ok) {
    let blob = await res.blob();
    return URL.createObjectURL(blob);
  } else {
    return null
  }
}

export const googleAnalyticsPageView = (restaurant) => {

  if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
    if (window && typeof window !== undefined) {
      window.gtag('config', 'G-1V27CCNXDJ', { 'page_title': document.title, 'page_path': window.location.pathname })
      if(restaurant) {
        window.gtag('event', 'load_restaurant', { restaurant_name: restaurant })
      }
    }
  }
}
export const getDishImage = async (dishId) => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/images/dishes/${dishId}`)
  if(res.ok) {
    let blob = await res.blob();
    return URL.createObjectURL(blob);
  } else {
    return null
  }
}
