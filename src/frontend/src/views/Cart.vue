<template>
  <form
    action="test.html"
    method="post"
    class="layout-form"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <CartPopup v-if="showModal" />

        <ul
          v-if="cart.length"
          class="cart-list sheet"
        >
          <CartItem
            v-for="(item, id) in cart"
            :key="id + 1011"
            :itemData="item"
          />
        </ul>

        <div
          v-else
          class="sheet cart__empty"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <CartAdditional />

        <CartForm />
      </div>
    </main>

    <CartFooter />
  </form>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import CartAdditional from "@/modules/cart/components/CartAdditional.vue";
import CartFooter from "@/modules/cart/components/CartFooter.vue";
import CartForm from "@/modules/cart/components/CartForm.vue";
import CartItem from "@/modules/cart/components/CartItem.vue";
import CartPopup from "@/modules/cart/components/CartPopup.vue";

import { DELIVERY_DEFAULT_TYPE } from "@/common/constants";

import { SET_DELIVERY_TYPE } from "@/store/mutation-types";

export default {
  name: "Cart",
  components: {
    CartItem,
    CartAdditional,
    CartForm,
    CartFooter,
    CartPopup,
  },
  computed: {
    ...mapState("Cart", ["cart"]),
    ...mapState("Orders", ["showModal"]),
  },
  methods: {
    ...mapMutations("Cart", {
      setDeliveryType: SET_DELIVERY_TYPE,
    }),
  },
  beforeMount() {
    this.setDeliveryType(DELIVERY_DEFAULT_TYPE);
  },
};
</script>

<style lang="scss" scoped>

</style>
