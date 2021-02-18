export class FilterSet {
  constructor() {
    this.allergens = new Set();
    this.diets = new Set();
  }

  get size() {
    return this.allergens.size + this.diets.size;
  }
}