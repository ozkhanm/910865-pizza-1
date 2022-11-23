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
        <SelectorItem
          class="filling"
          :class="`filling--${ingredientsMap[ingredient.name]}`"
          :text="ingredient.name"
        />

        <ItemCounter />
      </li>
    </ul>

  </div>
</template>

<script>
import SelectorItem from "../../../common/components/SelectorItem.vue";
import ItemCounter from "../../../common/components/ItemCounter.vue";

import { ingredientsMap, ITEMS_INPUT_DATA } from "@/common/constants";

export default {
  name: "IngredientsFillingSelector",
  components: {
    SelectorItem,
    ItemCounter,
  },
  data() {
    return {
      ingredientsMap,
      ITEMS_INPUT_DATA,
    };
  },
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
  }
};
</script>

<style lang="scss" scoped>

</style>
