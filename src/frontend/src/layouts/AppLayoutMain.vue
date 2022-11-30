<template>
  <div>
    <Header />
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script>
import Header from "@/common/components/Header.vue";

export default {
  name: "AppLayoutMain",
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped>

</style>
