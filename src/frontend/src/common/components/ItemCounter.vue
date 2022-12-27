<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="count === minCount"
      @click="minusButtonClickHandler(item)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>

    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="count"
      @change="counterChangeHandler"
    >

    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="additionalPlusButtonClass"
      :disabled="count === maxCount"
      @click="plusButtonClickHandler(item)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { MAX_INGREDIENTS_NUMBER } from "@/common/constants";

export default {
  name: "ItemCounter",
  props: {
    count: {
      type: Number,
      default: 0,
    },
    minCount: {
      type: Number,
      required: true,
    },
    maxCount: {
      type: Number,
      required: true,
    },
    plusButtonClickHandler: {
      type: Function,
      required: true,
    },
    minusButtonClickHandler: {
      type: Function,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    inputChangeHandler: {
      type: Function,
      required: true,
    },
  },
  computed: {
    additionalPlusButtonClass() {
      return this.$router.currentRoute.name === "Index" ? null : "counter__button--orange";
    },
  },
  methods: {
    counterChangeHandler(e) {
      let value = parseInt(e.target.value);
      const isInputValid = String(parseInt(e.target.value)).length === e.target.value.length;

      if (value < 0) {
        value = 0;
      }

      if (this.maxCount !== Infinity) {
        if (value >= 0 && value <= MAX_INGREDIENTS_NUMBER) {
          value = parseInt(value);
        } else if (value > MAX_INGREDIENTS_NUMBER) {
          value = MAX_INGREDIENTS_NUMBER;
        }
      }

      this.inputChangeHandler({
        count: isInputValid ? value : 0,
        item: this.item,
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
