<template>
  <div class="content__dough">

    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <RadioButton
        :items="dough"
        :itemMap="doughMap"
        :itemName="ITEMS_INPUT_DATA.DOUGH.ITEM_NAME"
        :value="currentDough"
        @change="$emit('change', $event)"
      />

    </div>

  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton.vue";

import { doughMap, ITEMS_INPUT_DATA } from "@/common/constants";

export default {
  name: "DoughSelector",
  data() {
    return {
      doughMap,
      ITEMS_INPUT_DATA,
    }
  },
  props: {
    dough: {
      type: Array,
      required: true,
    },
    currentDough: {
      type: String,
      required: true,
    },
  },
  components: {
    RadioButton,
  },
};
</script>

<style lang="scss" scoped>

</style>
