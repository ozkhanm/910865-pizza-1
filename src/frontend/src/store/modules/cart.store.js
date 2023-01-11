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
  UPDATE_EXISTING_PIZZA,
  DECREASE_MISC_COUNT,
  INCREASE_MISC_COUNT,
  SET_MISC_COUNT,
  ADD_ORDER_MISC,
} from "@/store/mutation-types";

export const setupState = () => ({
  cart: [],
  selectedMisc: {},
  deliveryType: DELIVERY_DEFAULT_TYPE,
  currentDeliveryAddress: null,
});

const getters = {
  totalOrderPrice(state) {
    const pizzasPrice = countSum(state.cart);
    const miscPrice = countSum(Object.values(state.selectedMisc));

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
      selectedMisc[miscName] = this.state["Builder"].misc.find(it => it.name === miscName);
      selectedMisc[miscName].amount = count;
    } else {
      delete selectedMisc[miscName];
    }

    state.selectedMisc = { ...selectedMisc };
  },
  [ADD_ORDER_MISC](state, misc) {
    state.selectedMisc = misc;
  },
};

export default {
  namespaced: true,
  state: setupState(),
  getters,
  mutations,
};
