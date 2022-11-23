<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">

        <RadioButton
          :items="pizzas.sauces"
          :itemMap="sauceMap"
          :itemName="ITEMS_INPUT_DATA.SAUCE.ITEM_NAME"
          :containerMessage="ITEMS_INPUT_DATA.SAUCE.CONTAINER_MESSAGE"
          :defaultSelectedItem="ITEMS_INPUT_DATA.SAUCE.DEFAULT_RADIO_CHECK"
        />

        <IngredientsFilling />

      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "../../../common/components/RadioButton.vue";
import IngredientsFilling from "./BuilderIngredientsFillingSelector.vue";

import { sauceMap, ITEMS_INPUT_DATA } from "@/common/constants";
import pizzas from "@/static/pizza.json";

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
      pizzas,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
