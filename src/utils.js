import { ResponsiveEmbed } from "react-bootstrap";

export const parseMenu = data => {
  let menu = {
    categories: [],
    dishes: [],
    dishesByCategory: {},
    dishesByTags: {},
    tags: {},
    hasAllergens: false,
    hasRemovables: false,
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
  let blob = await res.blob();
  return URL.createObjectURL(blob);
}