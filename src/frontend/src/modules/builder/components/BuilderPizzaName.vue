<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>

    <input
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
      :value="pizzaName"
      @input="nameInputChangeHandler"
    >
  </label>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import { UPDATE_NAME } from "@/store/mutation-types";

export default {
  name: "PizzaName",
  computed: {
    ...mapState("Builder", ["pizzaName"]),
  },
  methods: {
    ...mapMutations("Builder", {
      updateName: UPDATE_NAME,
    }),

    nameInputChangeHandler(e) {
      this.updateName(e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
