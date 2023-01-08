<template>
  <li>
    <img
      :src="require(`@/${imageLink(image)}`)"
      width="20"
      height="30"
      :alt="name"
    >
    <p>
      <span>{{ name }}</span>
      <b>{{ priceText }} ₽</b>
    </p>
  </li>
</template>

<script>
export default {
  name: "OrderItemAdditional",
  props: {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    priceText() {
      return this.amount > 1 ? `${this.amount}х${this.price}` : this.price;
    },
  },
  methods: {
    imageLink(link) {
      return `assets/${link.split("/").slice(2).join("/")}`;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
