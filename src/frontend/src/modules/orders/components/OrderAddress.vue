<template>
  <div>
    <div class="layout__address">
      <div
        v-if="editingAddress !== id && !isAddNewAddress"
        class="sheet address-form"
      >
        <div class="address-form__header">
          <b>{{ name }}</b>
          <div class="address-form__edit">
            <button
              type="button"
              class="icon"
              @click="editButtonClickHandler(id)"
            >
              <span class="visually-hidden">Изменить адрес</span>
            </button>
          </div>
        </div>
        <p>{{ address }}</p>
        <small>{{ comment }}</small>
      </div>

      <form
        v-else
        action="test.html"
        method="post"
        class="address-form address-form--opened sheet"
      >
        <div
          v-if="!isAddNewAddress"
          class="address-form__header"
        >
          <b>{{ name }}</b>
        </div>

        <div class="address-form__wrapper">
          <FormInput
            v-for="(formData, dataId) in ADDRESS_FORM_INPUT_DATA"
            :key="dataId"
            :class="`address-form__input ${$formInputClassSize(additionalSizeClass, formData.size)}`"
            :text="formData.text"
            :inputType="formData.inputType"
            :inputName="`addr-${formData.inputName}`"
            :placeholder="formData.placeholder"
            :required="formData.required"
            :value="$props[formData.inputName]"
            :inputChangeHandler="inputChangeHandler"
          />
        </div>

        <div class="address-form__buttons">
          <button
            v-if="!isAddNewAddress"
            type="button"
            class="button button--transparent"
            @click="deleteAddressButtonClickHandler"
          >
            Удалить
          </button>
          <SubmitButton
            text="Сохранить"
            :buttonClickHandler="submitButtonClickHandler"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import FormInput from "@/common/components/FormInput.vue";
import SubmitButton from "@/common/components/SubmitButton.vue";

import { formInputClassSize } from "@/common/mixins";

import { ADDRESS_FORM_INPUT_DATA } from "@/common/constants";

export default {
  name: "OrderAddress",
  components: {
    FormInput,
    SubmitButton,
  },
  mixins: [formInputClassSize],
  data() {
    return {
      ADDRESS_FORM_INPUT_DATA,
      additionalSizeClass: "address-form__input--size",
    };
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    street: {
      type: String,
      default: "",
    },
    house: {
      type: String,
      default: "",
    },
    apartment: {
      type: String,
      default: "",
    },
    comment: {
      type: String,
      default: "",
    },
    id: {
      type: Number,
      required: true,
    },
    isAddNewAddress: {
      type: Boolean,
      default: false,
    },
    inputChangeHandler: {
      type: Function,
      default: () => {},
    },
    submitButtonClickHandler: {
      type: Function,
      default: () => {},
    },
    editButtonClickHandler: {
      type: Function,
      default: () => {},
    },
    deleteAddressButtonClickHandler: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    ...mapState("Orders", ["editingAddress"]),

    address() {
      return `${this.street}, д. ${this.house}, кв. ${this.apartment}`;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
