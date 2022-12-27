<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <RadioButton
        :items="sizes"
        :itemMap="sizeMap"
        :itemName="ITEMS_INPUT_DATA.SIZE.ITEM_NAME"
        :value="currentSize"
        :inputChangeHandler="updateSizeValue"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import RadioButton from "@/common/components/RadioButton.vue";

import { UPDATE_SIZE_VALUE } from "@/store/mutation-types";
import { sizeMap, ITEMS_INPUT_DATA } from "@/common/constants";

export default {
  name: "SizeSelector",
  components: {
    RadioButton,
  },
  data() {
    return {
      sizeMap,
      ITEMS_INPUT_DATA,
    };
  },
  computed: {
    ...mapState(["pizzas", "currentSize"]),

    sizes() {
      return this.pizzas.sizes;
    },
  },
  methods: {
    ...mapMutations({
      updateSizeValue: UPDATE_SIZE_VALUE,
    }),
  },
};
</script>

<style lang="scss" scoped>

</style>
