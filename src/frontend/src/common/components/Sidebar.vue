<template>
  <div class="layout__sidebar sidebar">
    <RouterLink
      to="/"
      class="logo layout__logo"
    >
      <AppLogo />
    </RouterLink>

    <SidebarMenuItem
      v-for="(item, id) in Object.values(SIDEBAR_MENU)"
      :key="id"
      :to="item.LINK"
      :label="item.LABEL"
    />
  </div>
</template>

<script>
import AppLogo from "@/common/components/AppLogo.vue";
import SidebarMenuItem from "@/common/components/SidebarMenuItem.vue";

import { SIDEBAR_MENU } from "@/common/constants";

export default {
  name: "AppLayoutMain",
  components: {
    AppLogo,
    SidebarMenuItem,
  },
  data() {
    return {
      SIDEBAR_MENU,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
