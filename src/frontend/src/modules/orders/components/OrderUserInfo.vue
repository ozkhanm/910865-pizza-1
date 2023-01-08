<template>
  <div class="user">
    <picture>
      <source
        type="image/webp"
        :srcset="imageWithExtension(user.avatar, '@2x.webp') + ' 1x,' + imageWithExtension(user.avatar, '@4x.webp') + ' 2x'"
      >
      <img
        :src="imageWithExtension(user.avatar, '@2x.jpg')"
        :srcset="imageWithExtension(user.avatar, '@4x.jpg')"
        :alt="user.name"
        width="72"
        height="72"
      >
    </picture>
    <div class="user__name">
      <span>{{ user.name }}</span>
    </div>
    <p class="user__phone">Контактный телефон: <span>{{ user.phone }}</span></p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "OrderUserInfo",
  computed: {
    ...mapState("Auth", ["user"]),
  },
  methods: {
    imageWithExtension(link, extension) {
      const filename = link.split("/").slice(4).join("/").split(".")[0];

      return require(`@/assets/img/users/` + `${filename}` + extension);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
