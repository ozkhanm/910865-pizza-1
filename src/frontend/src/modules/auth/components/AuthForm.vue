<template>
  <form
    @submit.prevent="login"
  >
    <FormInput
      v-for="(formData, dataId) in AUTH_FORM_INPUT_DATA"
      :key="dataId"
      :ref="formData.inputName"
      class="sign-form__input"
      :text="formData.text"
      :inputType="formData.inputType"
      :inputName="formData.inputName"
      :placeholder="formData.placeholder"
      :required="formData.required"
      :value="$data[formData.inputName]"
      :inputChangeHandler="inputChangeHandler"
    />

    <button
      type="submit"
      class="button"
    >
      Авторизоваться
    </button>
  </form>
</template>

<script>
import { mapActions } from "vuex";

import FormInput from "@/common/components/FormInput.vue";

import { AUTH_FORM_INPUT_DATA } from "@/common/constants";

export default {
  name: "AuthForm",
  data() {
    return {
      email: "",
      pass: "",
      AUTH_FORM_INPUT_DATA,
    };
  },
  components: {
    FormInput,
  },
  methods: {
    ...mapActions("Auth", {
      loginUser: "login",
    }),

    inputChangeHandler(e, field) {
      this[field] = e.target.value;
    },
    async login() {
      await this.loginUser({
        email: this.email,
        password: this.pass,
      });
      this.$router.push("/");
    },
  },
  mounted() {
    this.$refs.email[0].$refs.input.focus();
  },
};
</script>

<style lang="scss" scoped>

</style>
