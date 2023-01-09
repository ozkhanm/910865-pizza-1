<template>
  <section class="footer">
    <div class="footer__more">
      <RouterLink
        to="/"
        class="button button--border button--arrow"
      >
        Хочу еще одну
      </RouterLink>
    </div>

    <p class="footer__text">Перейти к конструктору<br>чтоб собрать ещё одну пиццу</p>

    <div class="footer__price">
      <b>Итого: {{ totalOrderPrice }} ₽</b>
    </div>

    <div class="footer__submit">
      <SubmitButton
        text="Оформить заказ"
        :disabled="buttonDisabled"
        :buttonClickHandler="formSubmitHandler"
      />
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

import SubmitButton from "@/common/components/SubmitButton.vue";

import { generateRandomNumberInRange } from "@/common/helpers";

import { CHANGE_SHOW_MODAL_STATUS, ADD_NEW_ORDER } from "@/store/mutation-types";

export default {
  name: "CartFooter",
  components: {
    SubmitButton,
  },
  computed: {
    ...mapState("Cart", ["cart"]),
    ...mapGetters("Cart", ["totalOrderPrice"]),
    ...mapState("Orders", ["selectedMisc", "userOrders"]),
    ...mapState("Auth", ["isAuthorized"]),

    buttonDisabled() {
      return this.cart.length === 0 || this.totalOrderPrice === 0;
    },
  },
  methods: {
    ...mapMutations("Orders", {
      showModal: CHANGE_SHOW_MODAL_STATUS,
      addNewOrder: ADD_NEW_ORDER,
    }),

    formSubmitHandler() {
      this.showModal(true);

      if (this.isAuthorized) {
        const order = {
          id: this.userOrders[this.userOrders.length - 1].id + 1,
          orderNumber: generateRandomNumberInRange(1000, 100000),
          pizzas: this.cart,
          additionals: Object.values(this.selectedMisc),
          orderPrice: this.totalOrderPrice,
        };

        this.addNewOrder(order);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
