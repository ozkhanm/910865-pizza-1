<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul
      v-if="ingredients.length"
      class="ingredients__list"
    >
      <li
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <AppDrag
          :isDraggable="isDraggable(ingredient)"
          :transferData="ingredient"
        >
          <SelectorItem
            class="filling"
            :class="`filling--${ingredientsMap[ingredient.name]}`"
            :text="ingredient.name"
          />
        </AppDrag>

        <ItemCounter
          class="counter--orange ingredients__counter"
          :count="itemCounter(selectedIngredients, ingredient.id, 'ingredientId')"
          :item="ingredient"
          :minCount="0"
          :maxCount="MAX_INGREDIENTS_NUMBER"
          :inputChangeHandler="setCount"
          :minusButtonClickHandler="decreaseIngredientCount"
          :plusButtonClickHandler="increaseIngredientCount"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

import SelectorItem from "@/common/components/SelectorItem.vue";
import ItemCounter from "@/common/components/ItemCounter.vue";
import AppDrag from "@/common/components/AppDrag.vue";

import { ingredientsMap, ITEMS_INPUT_DATA, MAX_INGREDIENTS_NUMBER } from "@/common/constants";

import { DECREASE_INGREDIENT_COUNT, INCREASE_INGREDIENT_COUNT, SET_INGREDIENT_COUNT } from "@/store/mutation-types";

export default {
  name: "IngredientsFillingSelector",
  components: {
    SelectorItem,
    ItemCounter,
    AppDrag,
  },
  data() {
    return {
      ingredientsMap,
      ITEMS_INPUT_DATA,
      MAX_INGREDIENTS_NUMBER,
    };
  },
  computed: {
    ...mapState(["ingredients"]),
    ...mapState("Builder", ["selectedIngredients"]),
    ...mapGetters(["itemCounter"]),
  },
  methods: {
    ...mapMutations("Builder", {
      decreaseIngredientCount: DECREASE_INGREDIENT_COUNT,
      increaseIngredientCount: INCREASE_INGREDIENT_COUNT,
      setCount: SET_INGREDIENT_COUNT,
    }),

    isDraggable(ingredient) {
      return this.itemCounter(this.selectedIngredients, ingredient.id, "ingredientId") !== MAX_INGREDIENTS_NUMBER;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
