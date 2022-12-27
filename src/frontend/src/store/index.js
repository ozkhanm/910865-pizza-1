import Vue from "vue";
import Vuex from "vuex";

import {
  UPDATE_DOUGH_VALUE,
  UPDATE_SAUCE_VALUE,
  UPDATE_SIZE_VALUE,
  UPDATE_NAME,
  DECREASE_INGREDIENT_COUNT,
  INCREASE_INGREDIENT_COUNT,
  SET_INGREDIENT_COUNT,
  ADD_TO_CART,
  ITEM_DROP,
  UPDATE_TOTAL_PRICE,
  DECREASE_PIZZA_COUNT,
  INCREASE_PIZZA_COUNT,
  SET_PIZZA_COUNT,
  CHANGE_SHOW_MODAL_STATUS,
  FETCH_PIZZAS,
  FETCH_MISC,
  DECREASE_MISC_COUNT,
  INCREASE_MISC_COUNT,
  SET_MISC_COUNT,
  RESET_STORE,
} from "@/store/mutation-types";

import { ITEMS_INPUT_DATA, MAX_INGREDIENTS_NUMBER } from "@/common/constants";
import { countSum } from "@/common/helpers";

import pizzasJson from "@/static/pizza.json";
import miscJson from "@/static/misc.json";

Vue.use(Vuex);

const setupState = () => ({
  pizzas: [],
  misc: [],
  selectedIngredients: {},
  selectedMisc: {},
  currentDough: ITEMS_INPUT_DATA.DOUGH.DEFAULT_RADIO_CHECK,
  currentSauce: ITEMS_INPUT_DATA.SAUCE.DEFAULT_RADIO_CHECK,
  currentSize: ITEMS_INPUT_DATA.SIZE.DEFAULT_RADIO_CHECK,
  totalPrice: 0,
  pizzaName: "",
  cart: [],
  showModal: false,
});

const getters = {
  totalPizzaPrice(state) {
    const multiplier = state.pizzas.sizes.find(it => it.name === state.currentSize).multiplier;
    const doughPrice = state.pizzas.dough.find(it => it.name === state.currentDough).price;
    const saucePrice = state.pizzas.sauces.find(it => it.name === state.currentSauce).price;
    const ingredientsPrice = countSum(Object.values(state.selectedIngredients));

    return multiplier * (doughPrice + saucePrice + ingredientsPrice);
  },
  totalOrderPrice(state) {
    const pizzasPrice = countSum(state.cart);
    const miscPrice = countSum(Object.values(state.selectedMisc));

    return pizzasPrice + miscPrice;
  },
};

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
    const selectedIngredients = { ...state.selectedIngredients };
    const ingredientName = ingredient.name;
    const count = --selectedIngredients[ingredientName].amount;

    if (count === 0) {
      delete selectedIngredients[ingredientName];
    } else {
      ingredient.amount = count;
      selectedIngredients[ingredientName] = ingredient;
    }

    state.selectedIngredients = { ...selectedIngredients };
  },
  [INCREASE_INGREDIENT_COUNT](state, ingredient) {
    const selectedIngredients = { ...state.selectedIngredients };
    const ingredientName = ingredient.name;

    if (selectedIngredients[ingredientName]) {
      selectedIngredients[ingredientName].amount++;
    } else {
      selectedIngredients[ingredientName] = ingredient;
      selectedIngredients[ingredientName].amount = 1;
    }

    state.selectedIngredients = { ...selectedIngredients };
  },
  [SET_INGREDIENT_COUNT](state, { count, item }) {
    const selectedIngredients = { ...state.selectedIngredients };
    const ingredientName = item.name;

    if (count !== 0) {
      selectedIngredients[ingredientName] = state.pizzas.ingredients.find(it => it.name === ingredientName);
      selectedIngredients[ingredientName].amount = count;
    } else {
      delete selectedIngredients[ingredientName];
    }

    state.selectedIngredients = { ...selectedIngredients };
  },
  [ADD_TO_CART](state, item) {
    state.cart = [...state.cart, item];
    state.selectedIngredients = {};
    state.currentDough = ITEMS_INPUT_DATA.DOUGH.DEFAULT_RADIO_CHECK;
    state.currentSauce = ITEMS_INPUT_DATA.SAUCE.DEFAULT_RADIO_CHECK;
    state.currentSize = ITEMS_INPUT_DATA.SIZE.DEFAULT_RADIO_CHECK;
    state.totalPrice = 0;
    state.pizzaName = "";
  },
  [ITEM_DROP](state, item) {
    const ingredients = { ...state.selectedIngredients };

    if (ingredients[item.name]) {
      if (ingredients[item.name].amount !== MAX_INGREDIENTS_NUMBER) {
        ingredients[item.name].amount++;
      }
    } else {
      ingredients[item.name] = {
        ...item,
        amount: 1,
      };
    }

    state.selectedIngredients = ingredients;
  },
  [UPDATE_TOTAL_PRICE](state) {
    const cartPizzas = [...state.cart];

    state.totalPrice = countSum(cartPizzas);
  },
  [DECREASE_PIZZA_COUNT](state, pizza) {
    const cart = [...state.cart];
    const targetPizzaIndex = cart.findIndex(it => it.name === pizza.name);
    const targetPizza = cart[targetPizzaIndex];

    if (targetPizza.amount !== 0) {
      targetPizza.amount--;
      cart[targetPizzaIndex] = targetPizza;
      state.cart = cart;
    }
  },
  [INCREASE_PIZZA_COUNT](state, pizza) {
    const cart = [...state.cart];
    const targetPizzaIndex = cart.findIndex(it => it.name === pizza.name);
    const targetPizza = cart[targetPizzaIndex];

    targetPizza.amount++;
    cart[targetPizzaIndex] = targetPizza;
    state.cart = cart;
  },
  [SET_PIZZA_COUNT](state, { count, item }) {
    const cart = [...state.cart];
    const targetPizzaIndex = cart.findIndex(it => it.name === item.name);
    const targetPizza = cart[targetPizzaIndex];

    targetPizza.amount = count;
    cart[targetPizzaIndex] = targetPizza;
    state.cart = cart;
  },
  [CHANGE_SHOW_MODAL_STATUS](state, status) {
    state.showModal = status;
  },
  [FETCH_PIZZAS](state, items) {
    state.pizzas = items;
  },
  [FETCH_MISC](state, items) {
    state.misc = items;
  },
  [DECREASE_MISC_COUNT](state, misc) {
    const selectedMisc = { ...state.selectedMisc };

    selectedMisc[misc.name].amount--;

    state.selectedMisc = { ...selectedMisc };
  },
  [INCREASE_MISC_COUNT](state, misc) {
    const selectedMisc = { ...state.selectedMisc };

    if (selectedMisc[misc.name]) {
      selectedMisc[misc.name].amount++;
    } else {
      selectedMisc[misc.name] = misc;
      selectedMisc[misc.name].amount = 1;
    }

    state.selectedMisc = { ...selectedMisc };
  },
  [SET_MISC_COUNT](state, { count, item }) {
    const selectedMisc = { ...state.selectedMisc };
    const miscName = item.name;

    if (count !== 0) {
      selectedMisc[miscName] = state.misc.find(it => it.name === miscName);
      selectedMisc[miscName].amount = count;
    } else {
      delete selectedMisc[miscName];
    }

    state.selectedMisc = { ...selectedMisc };
  },
  [RESET_STORE](state) {
    Object.assign(state, setupState());
  },
};

const actions = {
  async init({ dispatch }) {
    dispatch("fetchPizzas");
    dispatch("fetchMisc");
  },

  fetchPizzas({ commit }) {
    const pizzas = pizzasJson;

    commit(FETCH_PIZZAS, pizzas);
  },
  fetchMisc({ commit }) {
    const misc = miscJson;

    commit(FETCH_MISC, misc);
  },
};

export default new Vuex.Store({
  state: setupState(),
  getters,
  mutations,
  actions,
});
