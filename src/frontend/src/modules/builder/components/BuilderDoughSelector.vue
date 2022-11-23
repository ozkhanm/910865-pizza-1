<template>
  <div class="content__dough">

    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <RadioButton
        :items="pizzas.dough"
        :itemMap="doughMap"
        :itemName="ITEMS_INPUT_DATA.DOUGH.ITEM_NAME"
        :defaultSelectedItem="ITEMS_INPUT_DATA.DOUGH.DEFAULT_RADIO_CHECK"
      />

    </div>

  </div>
</template>

<script>
import RadioButton from "../../../common/components/RadioButton.vue";

import { doughMap, ITEMS_INPUT_DATA } from "@/common/constants";
import pizzas from "@/static/pizza.json";

export default {
  name: "DoughSelector",
  data() {
    return {
      pizzas,
      doughMap,
      ITEMS_INPUT_DATA,
    }
  },
  components: {
    RadioButton,
  },
};
</script>

<style lang="scss" scoped>

</style>
