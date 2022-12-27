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
            <li>{{ `${itemData.size}, на ${doughSpellingMap[itemData.dough]} тесте` }}</li>
            <li>Соус: {{ itemData.sauce.toLowerCase() }}</li>
            <li>Начинка: {{ Object.keys(itemData.ingredients).map(it => it.toLowerCase()).join(", ") }}</li>
          </ul>
        </div>
      </div>

      <ItemCounter
        :class="`cart-list__counter`"
        :count="itemData.amount"
        :item="itemData"
        :minCount="0"
        :maxCount="Infinity"
        :inputChangeHandler="setPizzaCount"
        :minusButtonClickHandler="decreasePizzaCount"
        :plusButtonClickHandler="increasePizzaCount"
      />

      <div class="cart-list__price">
        <b>{{ itemData.price }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button type="button" class="cart-list__edit">Изменить</button>
      </div>
    </li>
</template>

<script>
import { mapMutations } from "vuex";

import ItemCounter from "@/common/components/ItemCounter.vue";

import { doughSpellingMap } from "@/common/constants";
import { DECREASE_PIZZA_COUNT, INCREASE_PIZZA_COUNT, SET_PIZZA_COUNT } from "@/store/mutation-types";

export default {
  name: "CartItem",
  components: {
    ItemCounter,
  },
  data() {
    return {
      doughSpellingMap,
    };
  },
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations({
      decreasePizzaCount: DECREASE_PIZZA_COUNT,
      increasePizzaCount: INCREASE_PIZZA_COUNT,
      setPizzaCount: SET_PIZZA_COUNT,
    }),
  },
};
</script>

<style lang="scss" scoped>

</style>
