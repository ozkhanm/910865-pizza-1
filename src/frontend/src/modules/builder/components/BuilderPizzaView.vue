<template>
  <div class="content__constructor">
    <div class="pizza pizza--foundation--big-tomato">
      <AppDrop
        @drop="itemDropHandler"
      >
        <div class="pizza__wrapper">
          <div
            v-for="item in selectedIngredients"
            :key="item.id"
            class="pizza__filling"
            :class="`pizza__filling--${ingredientsMap[item.name]}`"
           />
        </div>
      </AppDrop>
    </div>
  </div>
</template>

<script>
import AppDrop from "../../../common/components/AppDrop.vue";

import { ingredientsMap, MAX_INGREDIENTS_NUMBER } from "../../../common/constants";

export default {
  name: "PizzaView",
  data() {
    return {
      ingredientsMap,
    };
  },
  components: {
    AppDrop,
  },
  props: {
    selectedIngredients: {
      type: Array,
      required: true,
    },
  },
  methods: {
    itemDropHandler(item) {
      const ingredient = this.selectedIngredients.find(it => it.name === item.name);

      if (ingredient === undefined) {
        this.selectedIngredients.push({
          name: item.name,
          id: item.id,
          amount: 1,
        });
      } else {
        if (ingredient.amount !== MAX_INGREDIENTS_NUMBER) {
          ingredient.amount++;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
