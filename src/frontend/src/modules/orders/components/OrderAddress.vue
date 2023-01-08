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
            class="address-form__input"
            text="Название адреса*"
            inputType="text"
            inputName="addr-name"
            placeholder="Введите название адреса"
            :required="true"
            :value="name"
            :inputChangeHandler="inputChangeHandler"
          />

          <FormInput
            class="address-form__input address-form__input--size--normal"
            text="Улица*"
            inputType="text"
            inputName="addr-street"
            placeholder="Введите название улицы"
            :required="true"
            :value="street"
            :inputChangeHandler="inputChangeHandler"
          />

          <FormInput
            class="address-form__input address-form__input--size--small"
            text="Дом*"
            inputType="text"
            inputName="addr-house"
            placeholder="Введите номер дома"
            :required="true"
            :value="house"
            :inputChangeHandler="inputChangeHandler"
          />

          <FormInput
            class="address-form__input address-form__input--size--small"
            text="Квартира"
            inputType="text"
            inputName="addr-apartment"
            placeholder="Введите № квартиры"
            :value="apartment"
            :inputChangeHandler="inputChangeHandler"
          />

          <FormInput
            class="address-form__input"
            text="Комментарий"
            inputType="text"
            inputName="addr-comment"
            placeholder="Введите комментарий"
            :value="comment"
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

export default {
  name: "OrderAddress",
  components: {
    FormInput,
    SubmitButton,
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
