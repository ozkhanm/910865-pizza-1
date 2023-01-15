<template>
  <form
    class="layout-form"
    @submit.prevent="formSubmitHandler"
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
            :key="id"
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
import { mapState, mapMutations, mapActions } from "vuex";

import CartAdditional from "@/modules/cart/components/CartAdditional.vue";
import CartFooter from "@/modules/cart/components/CartFooter.vue";
import CartForm from "@/modules/cart/components/CartForm.vue";
import CartItem from "@/modules/cart/components/CartItem.vue";
import CartPopup from "@/modules/cart/components/CartPopup.vue";

import { OPTIONS } from "@/common/constants";

import { SET_DELIVERY_TYPE, CHANGE_SHOW_MODAL_STATUS } from "@/store/mutation-types";

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
    ...mapState("Cart", ["cart", "selectedMisc", "phone", "currentDeliveryAddress", "deliveryType"]),
    ...mapState("Orders", ["showModal"]),
    ...mapState("Auth", ["isAuthenticated", "user"]),
  },
  methods: {
    ...mapMutations("Cart", {
      setDeliveryType: SET_DELIVERY_TYPE,
    }),
    ...mapMutations("Orders", {
      changeShowModalStatus: CHANGE_SHOW_MODAL_STATUS,
    }),
    ...mapActions("Orders", ["postOrder", "deleteOrder"]),

    async formSubmitHandler() {
      this.changeShowModalStatus(true);

      if (this.isAuthenticated) {
        const order = {
          userId: this.user.id,
          phone: this.phone,
          address: this.deliveryType !== OPTIONS.GET_BY_MYSELF ? {
            street: this.currentDeliveryAddress.street,
            building: this.currentDeliveryAddress.building,
            flat: this.currentDeliveryAddress.flat,
            comment: this.currentDeliveryAddress.comment || "",
          } : null,
          pizzas: this.cart,
          misc: this.selectedMisc,
        };

        await this.postOrder(order);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
