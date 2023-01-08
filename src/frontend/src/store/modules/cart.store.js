import { DELIVERY_DEFAULT_TYPE } from "@/common/constants";
import { countSum } from "@/common/helpers";

import {
  ADD_TO_CART,
  DECREASE_PIZZA_COUNT,
  INCREASE_PIZZA_COUNT,
  SET_PIZZA_COUNT,
  SET_DELIVERY_TYPE,
  SET_DELIVERY_ADDRESS,
  UPDATE_STREET_VALUE,
  UPDATE_HOUSE_VALUE,
  UPDATE_APARTMENT_VALUE,
  UPDATE_EXISTING_PIZZA
} from "@/store/mutation-types";

export const setupState = () => ({
  cart: [],
  deliveryType: DELIVERY_DEFAULT_TYPE,
  currentDeliveryAddress: null,
});

const getters = {
  totalOrderPrice(state, _, rootState) {
    const pizzasPrice = countSum(state.cart);
    const miscPrice = countSum(Object.values(rootState.Orders.selectedMisc));

    return pizzasPrice + miscPrice;
  },
};

const mutations = {
  [ADD_TO_CART](state, item) {
    if (Array.isArray(item)) {
      state.cart = [...state.cart, ...item];
    } else {
      state.cart = [...state.cart, item];
    }
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
  [SET_DELIVERY_TYPE](state, type) {
    state.deliveryType = type;
  },
  [SET_DELIVERY_ADDRESS](state, address) {
    state.currentDeliveryAddress = address;
  },
  [UPDATE_STREET_VALUE](state, event) {
    state.currentDeliveryAddress = { ...state.currentDeliveryAddress, street: event.target.value };
  },
  [UPDATE_HOUSE_VALUE](state, event) {
    state.currentDeliveryAddress = { ...state.currentDeliveryAddress, house: event.target.value };
  },
  [UPDATE_APARTMENT_VALUE](state, event) {
    state.currentDeliveryAddress = { ...state.currentDeliveryAddress, apartment: event.target.value };
  },
  [UPDATE_EXISTING_PIZZA](state, pizza) {
    const cart = [...state.cart];
    const oldPizzaIndex = cart.findIndex(it => it.id === pizza.id);

    cart[oldPizzaIndex] = pizza;
    state.cart = cart;
  },
};

export default {
  namespaced: true,
  state: setupState(),
  getters,
  mutations,
};
