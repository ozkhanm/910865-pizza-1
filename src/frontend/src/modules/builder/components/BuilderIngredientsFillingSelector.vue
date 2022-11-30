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
          :transferData="ingredient"
        >
          <SelectorItem
            class="filling"
            :class="`filling--${ingredientsMap[ingredient.name]}`"
            :text="ingredient.name"
          />
        </AppDrag>

        <ItemCounter
          :count="count(ingredient.name)"
          :minCount="0"
          :maxCount="MAX_INGREDIENTS_NUMBER"
          @blur="$emit('blur', $event, ingredient.name)"
          @plusButtonClick="$emit('plusButtonClick', ingredient)"
          @minusButtonClick="$emit('minusButtonClick', ingredient)"
        />
      </li>
    </ul>

  </div>
</template>

<script>
import SelectorItem from "@/common/components/SelectorItem.vue";
import ItemCounter from "@/common/components/ItemCounter.vue";
import AppDrag from "@/common/components/AppDrag.vue";

import { ingredientsMap, ITEMS_INPUT_DATA, MAX_INGREDIENTS_NUMBER } from "@/common/constants";

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
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    selectedIngredients: {
      type: Object,
      required: true,
    },
  },
  methods: {
    count(name) {
      return this.selectedIngredients[name]?.amount;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
