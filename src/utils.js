export const parseMenu = data => {
  let menu = {
    categories: [],
    dishes: [],
    dishesByCategory: {},
    dishesByTags: {},
    tags: {},
  };

  data.forEach(dish => {
    menu.dishes[dish.id] = dish;
    if (!menu.categories.includes(dish.Category.name)) {
      menu.categories.push(dish.Category.name);
      menu.dishesByCategory[dish.Category.name] = [];
    }
    menu.dishesByCategory[dish.Category.name].push(dish);
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