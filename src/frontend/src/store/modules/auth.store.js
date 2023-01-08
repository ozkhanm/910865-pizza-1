import { CHANGE_AUTH_STATUS } from "@/store/mutation-types";

import user from "@/static/user.json";

export const setupState = () => ({
  user,
  isAuthorized: false,
});

const mutations = {
  [CHANGE_AUTH_STATUS](state, status) {
    state.isAuthorized = status;
  },
};

export default {
  namespaced: true,
  state: setupState(),
  mutations,
};
