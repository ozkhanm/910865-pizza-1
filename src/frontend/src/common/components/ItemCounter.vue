<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="minusButtonDisabled"
      @click="minusButtonClickHandler"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="itemCount"
      @change="counterChangeHandler"
    >
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="plusButtonDisabled"
      @click="plusButtonClickHandler"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { MAX_INGREDIENTS_NUMBER } from "../constants";

export default {
  name: "ItemCounter",
  props: {
    ingredient: {
      type: [Object, undefined],
    },
    ingredients: {
      type: Array,
      required: true,
    },
    ingredientName: {
      type: String,
      required: true,
    },
  },
  computed: {
    itemCount() {
      return this.ingredient?.amount || "0";
    },
    minusButtonDisabled() {
      return this.ingredient?.amount === undefined;
    },
    plusButtonDisabled() {
      return this.ingredient?.amount === MAX_INGREDIENTS_NUMBER;
    },
  },
  methods: {
    counterChangeHandler(e) {
      let value = parseInt(e.target.value);

      if  (isNaN(value)) {
        value = this.itemCount;
      } else {
        if (value < 0) {
          value = 0;
        } else if (e.target.value >= 0 && e.target.value <= MAX_INGREDIENTS_NUMBER) {
          value = parseInt(value);
        } else if (value > MAX_INGREDIENTS_NUMBER) {
          value = MAX_INGREDIENTS_NUMBER;
        }
      }

      const ingredientTemplate = { ...this.ingredients.find(it => it.name === this.ingredientName) };

      ingredientTemplate.amount = value;
      this.$emit("blur", ingredientTemplate);
    },
    minusButtonClickHandler() {
      if (this.ingredient.amount !== 0) {
        const updatedIngredient = { ...this.ingredient };

        updatedIngredient.amount--;
        this.$emit("minusButtonClick", updatedIngredient);
      }
    },
    plusButtonClickHandler() {
      if (this.ingredient === undefined) {
        const ingredientTemplate = { ...this.ingredients.find(it => it.name === this.ingredientName) };

        ingredientTemplate.amount = 1;
        this.$emit("plusButtonClick", ingredientTemplate);
      } else {
        const updatedIngredient = { ...this.ingredient };

        updatedIngredient.amount++;
        this.$emit("plusButtonClick", updatedIngredient);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
