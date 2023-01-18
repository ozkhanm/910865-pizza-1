<template>
  <div id="app">
    <AppLayout>
      <RouterView />
    </AppLayout>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import AppLayout from "@/layouts/AppLayout.vue";

import { setAuth } from "@/common/helpers";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  methods: {
    ...mapActions(["init"]),
  },
  created() {
    window.onerror = function(msg, url, line, col, error) {
      console.error(error);
    };

    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }

    this.init();
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
