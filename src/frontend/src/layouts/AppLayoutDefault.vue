<template>
  <div class="default-layout-container">
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
.default-layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
