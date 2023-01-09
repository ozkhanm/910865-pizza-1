<template>
  <div class="content__constructor">
    <div
      class="pizza"
      :class="getCustomPizzaClass"
    >
      <AppDrop>
        <div class="pizza__wrapper">
          <div
            v-for="item in selectedIngredients"
            :key="item.id"
            class="pizza__filling"
            :class="getPizzaFillingClass(item)"
          />
        </div>
      </AppDrop>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import AppDrop from "@/common/components/AppDrop.vue";

import { ingredientsMap, sauceMap, doughClassMap } from "@/common/constants";

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
  computed: {
    ...mapState("Builder", ["selectedIngredients", "currentDough", "currentSauce"]),

    getCustomPizzaClass() {
      return `pizza--foundation--${doughClassMap[this.currentDough]}-${sauceMap[this.currentSauce]}`;
    },
  },
  methods: {
    getPizzaFillingClass(item) {
      let additionalIngredientsClass = "";

      if (item.amount === 2) {
        additionalIngredientsClass = "pizza__filling--second";
      } else if (item.amount === 3) {
        additionalIngredientsClass = "pizza__filling--third";
      }

      return `pizza__filling--${ingredientsMap[item.name]} ${additionalIngredientsClass}`;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
