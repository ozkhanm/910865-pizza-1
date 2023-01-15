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
      <button
        type="submit"
        class="button"
        :disabled="buttonDisabled"
      >
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import { OPTIONS } from "@/common/constants";

import { CHANGE_SHOW_MODAL_STATUS } from "@/store/mutation-types";

export default {
  name: "CartFooter",
  computed: {
    ...mapState("Cart", ["cart", "selectedMisc", "phone", "currentDeliveryAddress", "deliveryType"]),
    ...mapState("Auth", ["isAuthenticated", "user"]),
    ...mapGetters("Cart", ["totalOrderPrice"]),

    buttonDisabled() {
      return this.cart.length === 0 || this.totalOrderPrice === 0;
    },
  },
  methods: {
    ...mapMutations("Orders", {
      changeShowModalStatus: CHANGE_SHOW_MODAL_STATUS,
    }),
    ...mapActions("Orders", ["postOrder"]),

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
