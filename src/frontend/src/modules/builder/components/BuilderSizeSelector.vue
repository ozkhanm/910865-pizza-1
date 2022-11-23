<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <RadioButton
        :items="pizzas.sizes"
        :itemMap="sizeMap"
        :itemName="ITEMS_INPUT_DATA.SIZE.ITEM_NAME"
        :defaultSelectedItem="ITEMS_INPUT_DATA.SIZE.DEFAULT_RADIO_CHECK"
      />
    </div>
  </div>
</template>

<script>
import RadioButton from "../../../common/components/RadioButton.vue";

import { sizeMap, ITEMS_INPUT_DATA } from "@/common/constants";
import pizzas from "@/static/pizza.json";

export default {
  name: "SizeSelector",
  components: {
    RadioButton,
  },
  data() {
    return {
      sizeMap,
      ITEMS_INPUT_DATA,
      pizzas,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
