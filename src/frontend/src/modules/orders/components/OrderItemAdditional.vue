<template>
  <li>
    <img
      :src="imageLink(image)"
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
      const filename = link.split("/").slice(3).join("/");

      return require(`@/assets/img/` + `${filename}`);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
