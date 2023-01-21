<template>
  <div class="sign-form-wrapper">
    <div class="sign-form">
      <RouterLink
        to="/"
        class="close close--white"
      >
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </RouterLink>

      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
      </div>

      <AuthForm />
    </div>
  </div>
</template>

<script>
import AuthForm from "@/modules/auth/components/AuthForm.vue";

export default {
  name: "Login",
  components: {
    AuthForm,
 },
};
</script>

<style lang="scss" scoped>
.sign-form-wrapper {
  display: flex;
  align-items: center;
  height: 100vh;
}
</style>
