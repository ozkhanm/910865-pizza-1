<template>
  <form
    action="test.html"
    method="post"
  >
    <FormInput
      v-for="(formData, dataId) in AUTH_FORM_INPUT_DATA"
      :key="dataId"
      class="sign-form__input"
      :text="formData.text"
      :inputType="formData.inputType"
      :inputName="formData.inputName"
      :placeholder="formData.placeholder"
      :required="formData.required"
      :value="$data[formData.inputName]"
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

import { AUTH_FORM_INPUT_DATA } from "@/common/constants";

import { CHANGE_AUTH_STATUS } from "@/store/mutation-types";

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
