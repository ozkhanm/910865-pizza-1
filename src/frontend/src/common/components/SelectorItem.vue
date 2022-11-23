<template>
  <span>{{ text }}</span>
</template>

<script>
export default {
  name: "SelectorItem",
  props: {
    text: {
      type: String,
      required: true,
    },
  }
};
</script>

<style lang="scss" scoped>

</style>
