import { ResponsiveEmbed } from "react-bootstrap";

export const parseMenu = data => {
  let menu = {
    categories: [],
    dishes: [],
    dishesByCategory: {},
    dishesByTags: {},
    tags: {},
    hasAllergens: false
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

export const filterMenu = (tags, dishesByTags, selectedFilters) => {
  let excluded = new Set();
  let glutenTagId = -1;
  
  for (const [id, tag] of Object.entries(tags)) {
    if(tag.name === 'Gluten') {
      glutenTagId = tag.id;
    }
  }

  selectedFilters.forEach((tagId) =>
    dishesByTags[tagId].forEach((dish) => {
      // only exclude dish if not gluten free possible
      if(tagId === glutenTagId) {
        if(!dish.gfp) {
          excluded.add(dish.id)
        }
      } else {
        excluded.add(dish.id)
      }
    })
  );
  return excluded
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