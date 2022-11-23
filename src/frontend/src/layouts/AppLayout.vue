<template>
  <div>
    <Header />
    <main class="content">
      <Index />
    </main>
  </div>
</template>

<script>
import Header from "../common/components/Header.vue";
import Index from "../views/Index.vue";

export default {
  name: "AppLayout",
  components: {
    Header,
    Index,
  },
};
</script>

<style lang="scss" scoped>

</style>
