<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">

        <RadioButton
          :items="sauces"
          :itemMap="sauceMap"
          :itemName="ITEMS_INPUT_DATA.SAUCE.ITEM_NAME"
          :containerMessage="ITEMS_INPUT_DATA.SAUCE.CONTAINER_MESSAGE"
          :value="currentSauce"
          @change="$emit('change', $event)"
        />

        <IngredientsFilling
          :ingredients="ingredients"
          :selectedIngredients="selectedIngredients"
          @blur="($event, ingredientName) => $emit('blur', $event, ingredientName)"
          @plusButtonClick="(ingredient) => $emit('plusButtonClick', ingredient)"
          @minusButtonClick="(ingredient) => $emit('minusButtonClick', ingredient)"
        />

      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton.vue";
import IngredientsFilling from "./BuilderIngredientsFillingSelector.vue";

import { sauceMap, ITEMS_INPUT_DATA } from "@/common/constants";

export default {
  name: "IngredientsSelector",
  components: {
    RadioButton,
    IngredientsFilling,
  },
  data() {
    return {
      sauceMap,
      ITEMS_INPUT_DATA,
    };
  },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    currentSauce: {
      type: String,
      required: true,
    },
    selectedIngredients: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
