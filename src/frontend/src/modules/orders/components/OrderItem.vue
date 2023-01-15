<template>
  <li class="order__item">
    <div class="product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="name"
      >
      <div class="product__text">
        <h2>{{ name }}</h2>
        <ul>
          <li>{{ $doughText(sizeId, doughId, getEntityById) }}</li>
          <li>{{ $sauceText(sauceId, getEntityById) }}</li>
          <li>{{ $ingredientsText(ingredients, ingredientsList) }}</li>
        </ul>
      </div>
    </div>

    <p class="order__price">{{ priceText }} ₽</p>
  </li>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import { doughText, sauceText, ingredientsText } from "@/common/mixins";

export default {
  name: "OrderItem",
  mixins: [doughText, sauceText, ingredientsText],
  props: {
    doughId: {
      type: Number,
      required: true,
    },
    sizeId: {
      type: Number,
      required: true,
    },
    sauceId: {
      type: Number,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState({
      ingredientsList: "ingredients",
    }),
    ...mapGetters(["getEntityById", "pizzaPrice"]),

    priceText() {
      const price = this.pizzaPrice(this.sizeId, this.doughId, this.sauceId, this.ingredients, this.getEntityById);

      return this.quantity > 1 ? `${this.quantity}х${price}` : price;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
