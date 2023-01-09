<template>
  <div id="app">
    <AppLayout>
      <RouterView />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  created() {
    this.$store.dispatch("Builder/init", null, { root: true });
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
