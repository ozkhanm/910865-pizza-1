import Vue from "vue";
import Vuex from "vuex";

import modules from "@/store/modules";
import { RESET_STORE } from "@/store/mutation-types";
import { setupState as resetBuilderState } from "@/store/modules/builder.store";
import { setupState as resetCartState } from "@/store/modules/cart.store";
import { resetState as resetOrdersState } from "@/store/modules/orders.store";

Vue.use(Vuex);

const resetState = () => ({
  "Builder": resetBuilderState(),
  "Cart": resetCartState(),
  "Orders": resetOrdersState(),
});

const mutations = {
  [RESET_STORE](state) {
    Object.assign(state, resetState());
  },
};

export default new Vuex.Store({
  mutations,
  modules,
});
