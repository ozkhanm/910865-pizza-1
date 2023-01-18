import { SIDEBAR_MENU } from "@/common/constants";

import {
  CHANGE_SHOW_MODAL_STATUS,
  SET_EDITING_ADDRESS,
  DELETE_ORDER,
  ADD_NEW_ORDER,
  ADD_NEW_ADDRESS,
  EDIT_ADDRESS,
  DELETE_ADDRESS,
  CHANGE_ACTIVE_SIDEBAR_MENU,
  FETCH_USER_ADDRESSES,
  FETCH_USER_ORDERS
} from "@/store/mutation-types";

export const resetState = state => ({
  showModal: false,
  editingAddress: -1,
  activeSidebarMenu: state["Orders"].activeSidebarMenu,
  userAddresses: state["Orders"].userAddresses,
  userOrders: state["Orders"].userOrders,
});

export const setupState = () => ({
  showModal: false,
  editingAddress: -1,
  activeSidebarMenu: SIDEBAR_MENU.USER_DATA.LABEL,
  userAddresses: [],
  userOrders: [],
});

const actions = {
  async fetchUserAddresses({ commit }) {
    const addresses = await this.$api.addresses.query();

    commit(FETCH_USER_ADDRESSES, addresses);
  },
  async fetchUserOrders({ commit }) {
    const orders = await this.$api.orders.query();

    commit(FETCH_USER_ORDERS, orders);
  },
  async postAddress({ commit }, newAddress) {
    const address = await this.$api.addresses.post(newAddress);

    commit(ADD_NEW_ADDRESS, address);
  },
  async putAddress({ commit }, updatedAddress) {
    await this.$api.addresses.put(updatedAddress);

    commit(EDIT_ADDRESS, updatedAddress);
  },
  async deleteAddress({ commit }, id) {
    await this.$api.addresses.delete(id);

    commit(DELETE_ADDRESS, id);
  },
  async postOrder(_, newOrder) {
    await this.$api.orders.post(newOrder);
  },
  async deleteOrder({ commit }, id) {
    await this.$api.orders.delete(id);

    commit(DELETE_ORDER, id);
  },
};

const mutations = {
  [FETCH_USER_ADDRESSES](state, addresses) {
    state.userAddresses = addresses;
  },
  [FETCH_USER_ORDERS](state, orders) {
    state.userOrders = orders;
  },
  [CHANGE_ACTIVE_SIDEBAR_MENU](state, activeMenu) {
    state.activeSidebarMenu = activeMenu;
  },
  [CHANGE_SHOW_MODAL_STATUS](state, status) {
    state.showModal = status;
  },
  [SET_EDITING_ADDRESS](state, id) {
    state.editingAddress = id;
  },
  [DELETE_ORDER](state, id) {
    state.userOrders = state.userOrders.filter(it => it.id !== id);
  },
  [ADD_NEW_ORDER](state, order) {
    state.userOrders = [...state.userOrders, order];
  },
  [ADD_NEW_ADDRESS](state, address) {
    state.userAddresses = [...state.userAddresses, address];
  },
  [EDIT_ADDRESS](state, address) {
    const userAddresses = [...state.userAddresses];
    const editIndex = userAddresses.findIndex(it => it.id === address.id);

    userAddresses[editIndex] = address;
    state.userAddresses = userAddresses;
  },
  [DELETE_ADDRESS](state, id) {
    state.userAddresses = [...state.userAddresses.filter(it => it.id !== id)];
  },
};

const state = setupState();

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
