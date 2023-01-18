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
import { mapState, mapGetters } from "vuex";

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
    ...mapGetters(["getEntityById"]),

    getCustomPizzaClass() {
      const doughName = this.getEntityById("dough", this.currentDough)?.name;
      const sauceName = this.getEntityById("sauces", this.currentSauce)?.name;

      return `pizza--foundation--${doughClassMap[doughName]}-${sauceMap[sauceName]}`;
    },
  },
  methods: {
    getPizzaFillingClass(item) {
      const ingredientName = this.getEntityById("ingredients", item.ingredientId).name;
      let additionalIngredientsClass = "";

      if (item.quantity === 2) {
        additionalIngredientsClass = "pizza__filling--second";
      } else if (item.quantity === 3) {
        additionalIngredientsClass = "pizza__filling--third";
      }

      return `pizza__filling--${ingredientsMap[ingredientName]} ${additionalIngredientsClass}`;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
