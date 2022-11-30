<template>
  <div>
    <Header />
    <slot />
  </div>
</template>

<script>
import Header from "@/common/components/Header.vue";

export default {
  name: "AppLayoutDefault",
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped>

</style>
