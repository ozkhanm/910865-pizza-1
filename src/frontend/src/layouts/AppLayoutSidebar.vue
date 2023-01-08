<template>
  <div>
    <Header />
    <main class="layout">
      <Sidebar />

      <slot />
    </main>
  </div>
</template>

<script>
import Sidebar from "@/common/components/Sidebar.vue";
import Header from "@/common/components/Header.vue";

export default {
  name: "AppLayoutSidebar",
  components: {
    Sidebar,
    Header,
  },
};
</script>

<style lang="scss" scoped>

</style>
