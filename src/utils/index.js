export const parseMenu = (data, enableFiltering) => {
  let menu = {
    categories: [],
    dishes: [],
    dishesByCategory: {},
    dishesByFilters: { byAllergens: {}, byDiets: {} },
    filters: { allergens: {}, diets: {} },
    hasAllergens: false,
    hasDiets: false,
    hasRemovables: false,
    enableFiltering: enableFiltering,
  };

  data.forEach((dish) => {
    // track if a menu has allergens, if not we can hide the slide up bar etc.
    if (dish.Tags.length > 0) {
      menu.hasAllergens = true;
    }

    if (dish.Diets.length > 0) {
      menu.hasDiets = true;
    }

    menu.dishes.push(dish);
    if (!(dish.Category.id in menu.dishesByCategory)) {
      menu.categories.push(dish.Category);
      menu.dishesByCategory[dish.Category.id] = [];
    }
    menu.dishesByCategory[dish.Category.id].push(dish);
    dish.Tags.forEach((tag) => {
      if (!(tag.id in menu.filters.allergens)) {
        menu.filters.allergens[tag.id] = tag;
        menu.dishesByFilters.byAllergens[tag.id] = [];
      }
      menu.dishesByFilters.byAllergens[tag.id].push(dish);
    });

    if (dish.Diets.length > 0) {
      menu.hasDiets = true;
    }
    dish.Diets.forEach((diet) => {
      if (!(diet.id in menu.filters.diets)) {
        menu.filters.diets[diet.id] = diet;
        menu.dishesByFilters.byDiets[diet.id] = [];
      }
      menu.dishesByFilters.byDiets[diet.id].push(dish);
    });
  });
  return menu;
};

export const filterMenu = ({ byAllergens, byDiets }, { allergens, diets }) => {
  let intersection;
  let excluded = new Set();
  let onlyHasRemovables = new Set();

  allergens.forEach((tagId) =>
    byAllergens[tagId].forEach((dish) => {
      if (dish.Tags.some((tag) => tag.id === tagId && tag.DishTag.removable)) {
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

  diets.forEach((dietId) => {
    const included = new Set();
    byDiets[dietId].forEach((dish) => {
      included.add(dish.id);
    });
    intersection = intersection
      ? new Set([...included].filter((id) => intersection.has(id)))
      : included;
  });
  return {
    included: intersection,
    excluded,
    hasRemovables: onlyHasRemovables.size > 0,
  };
};

export const getRestaurant = async (restaurantId) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/webApi/${restaurantId}`
  );
  return res.json();
};

export const getDishesOfMenu = async (restaurantId, menuName) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/webApi/${restaurantId}/${menuName}`
  );
  return res.json();
};

export const getRestaurantLogo = async (restaurantId) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/api/images/restaurants/${restaurantId}`
  );
  let blob = await res.blob();
  return URL.createObjectURL(blob);
};

export const getMenuBannerImage = async (menuId) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/api/images/menus/${menuId}`
  );
  if (res.ok) {
    let blob = await res.blob();
    return URL.createObjectURL(blob);
  } else {
    return null;
  }
};

export const googleAnalyticsPageView = (restaurant) => {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.REACT_APP_GOOGLE_ANALYTICS_ID
  ) {
    if (window && typeof window !== undefined && window.gtag) {
      window.gtag("config", process.env.REACT_APP_GOOGLE_ANALYTICS_ID, {
        page_title: document.title,
        page_path: window.location.pathname,
      });
      if (restaurant) {
        window.gtag("event", "load_restaurant", {
          restaurant_name: restaurant,
        });
      }
    }
  }
};

export const getDishImage = async (dishId) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/api/images/dishes/${dishId}`
  );
  if (res.ok) {
    let blob = await res.blob();
    return URL.createObjectURL(blob);
  } else {
    return null;
  }
};

export * from "./filter-set";
