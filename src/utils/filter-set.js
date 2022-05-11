export class FilterSet {
  constructor() {
    this.allergens = new Set();
    this.diets = new Set();
    this.searchDishes = "";
  }

  get size() {
    return this.allergens.size + this.diets.size;
  }
}
