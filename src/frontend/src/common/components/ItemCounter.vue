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
      :value="countValue"
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
  data() {
    return {
      refreshKey: 0,
    };
  },
  computed: {
    additionalPlusButtonClass() {
      return this.$router.currentRoute.name === "Index" ? null : "counter__button--orange";
    },
    countValue() {
      this.refreshKey;

      return this.count;
    },
  },
  methods: {
    counterChangeHandler(e) {
      let value = parseInt(e.target.value);
      const isInputValid = String(parseInt(e.target.value)).length === e.target.value.length;

      if (!isInputValid) {
        return;
      }

      if (value < 0) {
        value = 0;
      }

      this.inputChangeHandler({
        count: value,
        item: this.item,
      });
      this.refreshKey++;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
