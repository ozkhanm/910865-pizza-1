<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
      :value="name"
      @input="nameInputChangeHandler"
    >
  </label>
</template>

<script>
export default {
  name: "PizzaName",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    nameInputChangeHandler(e) {
      this.$emit("changeName", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
