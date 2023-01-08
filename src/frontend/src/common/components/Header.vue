<template>
  <header class="header">
    <div class="header__logo">
      <RouterLink
        to="/"
        class="logo"
      >
        <AppLogo />
      </RouterLink>
    </div>

    <div class="header__cart">
      <RouterLink to="/cart">{{ totalOrderPrice }} ₽</RouterLink>
    </div>

    <div
      v-if="!isAuthorized"
      class="header__user"
    >
      <RouterLink
        to="/sign-in"
        class="header__login"
      >
        <span>Войти</span>
      </RouterLink>
    </div>

    <div
      v-else
      class="header__user"
    >
      <RouterLink
        to="/profile"
        @click.native="profileIconClickHandler"
      >
        <picture>
          <source
            type="image/webp"
            :srcset="require(`@/${imageWithExtension(user.avatar, '.webp')}`) + ' 1x, ' + require(`@/${imageWithExtension(user.avatar, '@2x.webp')}`) + ' 2x'"
          >
          <img
            :src="require(`@/${imageLink(user.avatar)}`)"
            :srcset="require(`@/${imageWithExtension(user.avatar, '@2x.jpg')}`)"
            :alt="user.name"
            width="32"
            height="32"
          >
        </picture>
        <span>{{ user.name }}</span>
      </RouterLink>
      <a
        href="#"
        class="header__logout"
        @click.prevent
        @click="logoutButtonClickHandler"
      >
        <span>Выйти</span>
      </a>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

import AppLogo from "@/common/components/AppLogo.vue";

import { SIDEBAR_MENU } from "@/common/constants"

import { CHANGE_ACTIVE_SIDEBAR_MENU, CHANGE_AUTH_STATUS } from "@/store/mutation-types";

export default {
  name: "Header",
  components: {
    AppLogo,
  },
  computed: {
    ...mapState("Auth", ["user", "isAuthorized"]),
    ...mapGetters("Cart", ["totalOrderPrice"]),
  },
  methods: {
    ...mapMutations("Orders", {
      changeActiveSidebarMenu: CHANGE_ACTIVE_SIDEBAR_MENU,
    }),
    ...mapMutations("Auth", {
      changeAuthStatus: CHANGE_AUTH_STATUS,
    }),

    imageLink(link) {
      return `assets/${link.split("/").slice(2).join("/")}`;
    },
    imageWithExtension(link, extension) {
      return `assets/${link.split("/").slice(2).join("/")}`.split(".")[0] + `${extension}`;
    },
    profileIconClickHandler() {
      this.changeActiveSidebarMenu(SIDEBAR_MENU.USER_DATA.LABEL);
    },
    logoutButtonClickHandler() {
      this.changeAuthStatus(false);

      if (this.$router.currentRoute.name !== "Index") {
        this.$router.push({ name: "Index" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
