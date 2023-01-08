<template>
  <RouterLink
    :to="to"
    class="layout__link"
    :class="activeSidebarMenu === label ? 'layout__link--active' : null"
    @click.native="changeActiveSidebarMenu(label)"
  >
    {{ label }}
  </RouterLink>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import { CHANGE_ACTIVE_SIDEBAR_MENU } from "@/store/mutation-types";

export default {
  name: "SidebarMenuItem",
  props: {
    to: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState("Orders", ["activeSidebarMenu"]),
  },
  methods: {
    ...mapMutations("Orders", {
      changeActiveSidebarMenu: CHANGE_ACTIVE_SIDEBAR_MENU,
    }),
  },
};
</script>

<style lang="scss" scoped>

</style>
