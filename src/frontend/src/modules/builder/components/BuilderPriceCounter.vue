<template>
  <div class="content__result">
    <p>Итого: {{ totalPizzaPrice }} ₽</p>

    <button
      type="button"
      class="button"
      :disabled="disabled"
      @click="submitButtonClickHandler"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

import { ADD_TO_CART, UPDATE_TOTAL_PRICE } from "@/store/mutation-types";

export default {
  name: "PriceCounter",
  computed: {
    ...mapState(["currentDough", "currentSize", "currentSauce", "selectedIngredients", "pizzaName"]),
    ...mapGetters(["totalPizzaPrice"]),

    disabled() {
      return this.totalPizzaPrice === 0 || (Object.keys(this.selectedIngredients).length === 0 || this.pizzaName.length === 0);
    },
  },
  methods: {
    ...mapMutations({
      addToCart: ADD_TO_CART,
      updateTotalPrice: UPDATE_TOTAL_PRICE,
    }),

    submitButtonClickHandler() {
      const newCartItem = {
        dough: this.currentDough,
        size: this.currentSize,
        sauce: this.currentSauce,
        ingredients: this.selectedIngredients,
        name: this.pizzaName,
        price: this.totalPizzaPrice,
        amount: 1,
      };

      this.addToCart(newCartItem);
      this.updateTotalPrice();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
