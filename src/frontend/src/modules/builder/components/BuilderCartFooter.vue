<template>
  <section class="footer">
    <div class="footer__more">
      <RouterLink to="/" class="button button--border button--arrow">Хочу еще одну</RouterLink>
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
        @click.prevent
        @click="formSubmitHandler"
      >
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

import { CHANGE_SHOW_MODAL_STATUS } from "@/store/mutation-types";

export default {
  name: "CartFooter",
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["totalOrderPrice"]),

    buttonDisabled() {
      return this.cart.length === 0 || this.totalOrderPrice === 0;
    },
  },
  methods: {
    ...mapMutations({
      showModal: CHANGE_SHOW_MODAL_STATUS,
    }),

    formSubmitHandler() {
      this.showModal(true);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
