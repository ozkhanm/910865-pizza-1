export default {
  methods: {
    async $logout() {
      await this.$store.dispatch("Auth/logout");

      if (this.$router.currentRoute.path !== "/") {
        await this.$router.push("/");
      }
    },
  },
};
