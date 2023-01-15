<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <OrderSheet
      v-for="order in userOrders"
      :key="order.id"
      :orderData="order"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

import { SIDEBAR_MENU } from "@/common/constants";

import OrderSheet from "@/modules/orders/components/OrderSheet.vue";

export default {
  name: "Orders",
  components: {
    OrderSheet,
  },
  computed: {
    ...mapState("Orders", ["userOrders"]),
  },
  beforeCreate() {
    if (!this.$store.state["Auth"].isAuthenticated) {
      this.$router.push({ name: "Login" });
    }
  },
  created() {
    this.$store.commit("Orders/CHANGE_ACTIVE_SIDEBAR_MENU", SIDEBAR_MENU.ORDER_HISTORY.LABEL);
  },
};
</script>

<style lang="scss" scoped>

</style>
