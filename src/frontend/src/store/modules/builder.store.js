import { MAX_INGREDIENTS_NUMBER } from "@/common/constants";

import {
  UPDATE_DOUGH_VALUE,
  UPDATE_SAUCE_VALUE,
  UPDATE_SIZE_VALUE,
  UPDATE_NAME,
  DECREASE_INGREDIENT_COUNT,
  INCREASE_INGREDIENT_COUNT,
  SET_INGREDIENT_COUNT,
  ITEM_DROP,
  SET_EDITING_PIZZA,
  CLEAR_BUILDER_PROPERTIES
} from "@/store/mutation-types";

export const setupState = () => ({
  selectedIngredients: [],
  currentDough: -1,
  currentSauce: -1,
  currentSize: -1,
  pizzaName: "",
  editingPizza: null,
});

const mutations = {
  [UPDATE_DOUGH_VALUE](state, value) {
    state.currentDough = value;
  },
  [UPDATE_SAUCE_VALUE](state, value) {
    state.currentSauce = value;
  },
  [UPDATE_SIZE_VALUE](state, value) {
    state.currentSize = value;
  },
  [UPDATE_NAME](state, name) {
    state.pizzaName = name;
  },
  [DECREASE_INGREDIENT_COUNT](state, ingredient) {
    const selectedIngredients = [...state.selectedIngredients];
    const ingredientIndex = selectedIngredients.findIndex(it => it.ingredientId === ingredient.id);
    const count = --selectedIngredients[ingredientIndex].quantity;
    let currentIngredient = selectedIngredients[ingredientIndex];

    if (count === 0) {
      state.selectedIngredients = selectedIngredients.filter(it => it.ingredientId !== ingredient.id);
    } else {
      currentIngredient.quantity = count;
      selectedIngredients[ingredientIndex] = currentIngredient;
      state.selectedIngredients = selectedIngredients;
    }
  },
  [INCREASE_INGREDIENT_COUNT](state, ingredient) {
    const selectedIngredients = [...state.selectedIngredients];
    const ingredientIndex = selectedIngredients.findIndex(it => it.ingredientId === ingredient.id);

    if (ingredientIndex !== -1) {
      selectedIngredients[ingredientIndex].quantity++;
    } else {
      selectedIngredients.push({
        ingredientId: ingredient.id,
        quantity: 1,
      });
    }

    state.selectedIngredients = selectedIngredients;
  },
  [SET_INGREDIENT_COUNT](state, { count, item }) {
    const selectedIngredients = [...state.selectedIngredients];
    const ingredientIndex = selectedIngredients.findIndex(it => it.ingredientId === item.id);

    if (count > MAX_INGREDIENTS_NUMBER) {
      count = MAX_INGREDIENTS_NUMBER;
    }

    if (ingredientIndex !== -1) {
      let ingredient = selectedIngredients[ingredientIndex];

      if (count !== 0) {
        ingredient.quantity = count;
      } else {
        ingredient = selectedIngredients.filter(it => it.ingredientId !== item.id);
      }

      selectedIngredients[ingredientIndex] = ingredient;
    } else {
      selectedIngredients.push({
        ingredientId: item.id,
        quantity: count,
      });
    }

    state.selectedIngredients = selectedIngredients;
  },
  [ITEM_DROP](state, item) {
    const ingredients = [...state.selectedIngredients];
    const ingredientIndex = ingredients.findIndex(it => it.ingredientId === item.id);

    if (ingredientIndex !== -1) {
      const ingredient = ingredients[ingredientIndex];

      if (ingredient.quantity !== MAX_INGREDIENTS_NUMBER) {
        ingredient.quantity++;
      }
    } else {
      ingredients.push({
        ingredientId: item.id,
        quantity: 1,
      });
    }

    state.selectedIngredients = ingredients;
  },
  [SET_EDITING_PIZZA](state, status) {
    state.editingPizza = status;
  },
  [CLEAR_BUILDER_PROPERTIES](state) {
    state.selectedIngredients = [];
    state.currentDough = 1;
    state.currentSauce = 1;
    state.currentSize = 1;
    state.pizzaName = "";
  },
};

export default {
  namespaced: true,
  state: setupState(),
  mutations,
};
