<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="count === minCount"
      @click="minusButtonClickHandler"
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
      :disabled="count === maxCount"
      @click="plusButtonClickHandler"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
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
  },
  methods: {
    counterChangeHandler(e) {
      let value = parseInt(e.target.value);

      if  (isNaN(value)) {
        value = this.count;
      }

      this.$emit("blur", value);
    },
    minusButtonClickHandler() {
      this.$emit("minusButtonClick");
    },
    plusButtonClickHandler() {
      this.$emit("plusButtonClick");
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
