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

export const getMenus = async restaurantId => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/webApi/${restaurantId}`);
  return res.json();
}

export const getDishesOfMenu = async (restaurantId, menuName) => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/webApi/${restaurantId}/${menuName}`);
  return res.json();
}