<template>
   <li class="cart-list__item">
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          :alt="itemData.name"
        >

        <div class="product__text">
          <h2>{{ itemData.name }}</h2>
          <ul>
            <li>{{ doughText }}</li>
            <li>{{ sauceText }}</li>
            <li>{{ ingredientsText }}</li>
          </ul>
        </div>
      </div>

      <ItemCounter
        class="cart-list__counter"
        :count="itemData.amount"
        :item="itemData"
        :minCount="0"
        :maxCount="Infinity"
        :inputChangeHandler="setPizzaCount"
        :minusButtonClickHandler="decreasePizzaCount"
        :plusButtonClickHandler="increasePizzaCount"
      />

      <div class="cart-list__price">
        <b>{{ itemData.price * itemData.amount }} ₽</b>
      </div>

      <div class="cart-list__button">
        <RouterLink to="/">
          <button
            type="button"
            class="cart-list__edit"
            @click="pizzaChangeButtonClickHandler"
          >
            Изменить
          </button>
        </RouterLink>
      </div>
    </li>
</template>

<script>
import { mapMutations } from "vuex";

import ItemCounter from "@/common/components/ItemCounter.vue";

import { doughSpellingMap } from "@/common/constants";
import { getDoughText, getSauceText, getIngredientsText } from "@/common/helpers.js";

import {
  DECREASE_PIZZA_COUNT,
  INCREASE_PIZZA_COUNT,
  SET_PIZZA_COUNT,
  UPDATE_DOUGH_VALUE,
  UPDATE_SAUCE_VALUE,
  UPDATE_SIZE_VALUE,
  UPDATE_NAME,
  SET_INGREDIENT_COUNT,
  SET_EDITING_PIZZA
} from "@/store/mutation-types";

export default {
  name: "CartItem",
  components: {
    ItemCounter,
  },
  data() {
    return {
      doughSpellingMap,
      getDoughText,
      getSauceText,
      getIngredientsText,
    };
  },
  computed: {
    doughText() {
      return getDoughText(this.itemData.size, this.itemData.dough, doughSpellingMap);
    },
    sauceText() {
      return getSauceText(this.itemData.sauce);
    },
    ingredientsText() {
      return getIngredientsText(this.itemData.ingredients);
    },
  },
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations("Cart", {
      decreasePizzaCount: DECREASE_PIZZA_COUNT,
      increasePizzaCount: INCREASE_PIZZA_COUNT,
      setPizzaCount: SET_PIZZA_COUNT,
    }),
    ...mapMutations("Builder", {
      updateDoughValue: UPDATE_DOUGH_VALUE,
      updateSauceValue: UPDATE_SAUCE_VALUE,
      updateSizeValue: UPDATE_SIZE_VALUE,
      setCount: SET_INGREDIENT_COUNT,
      updateName: UPDATE_NAME,
      setEditingPizza: SET_EDITING_PIZZA,
    }),

    pizzaChangeButtonClickHandler() {
      const { dough, name, sauce, size, ingredients} = this.itemData;

      this.setEditingPizza(this.itemData);
      this.updateDoughValue(dough);
      this.updateSauceValue(sauce);
      this.updateSizeValue(size);
      this.updateName(name);

      Object.values(ingredients).forEach(it => {
        this.setCount({
          count: it.amount,
          item: it,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
