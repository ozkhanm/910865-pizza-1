<template>
  <form
    action="test.html"
    method="post"
  >
    <FormInput
      class="sign-form__input"
      text="E-mail"
      inputType="email"
      inputName="email"
      placeholder="example@mail.ru"
      :value="email"
      :inputChangeHandler="inputChangeHandler"
    />

    <FormInput
      class="sign-form__input"
      text="Пароль"
      inputType="password"
      inputName="pass"
      placeholder="***********"
      :value="pass"
      :inputChangeHandler="inputChangeHandler"
    />

    <SubmitButton
      text="Авторизоваться"
      :buttonClickHandler="submitButtonClickHandler"
    />
  </form>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import FormInput from "@/common/components/FormInput.vue";
import SubmitButton from "@/common/components/SubmitButton.vue";

import { CHANGE_AUTH_STATUS } from "@/store/mutation-types";

export default {
  name: "AuthForm",
  data() {
    return {
      email: "",
      pass: "",
    };
  },
  components: {
    FormInput,
    SubmitButton,
  },
  computed: {
    ...mapState("Auth", ["user"]),
  },
  methods: {
    ...mapMutations("Auth", {
      changeAuthStatus: CHANGE_AUTH_STATUS,
    }),

    submitButtonClickHandler() {
      if (this.user.email === this.email && this.user.password === this.pass) {
        this.changeAuthStatus(true);
        this.$router.push({ name: "Index" });
      }
    },
    inputChangeHandler(e, field) {
      this[field] = e.target.value;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
