<template>
  <div class="cart__form">
    <div class="cart-form">
      <FormInput
        labelClass="cart-form__select"
        spanClass="cart-form__label"
        text="Получение заказа:"
      >
        <select
          name="test"
          class="select"
          @change="selectChangeHandler"
        >
          <option
            v-for="(option, id) in selectOptions"
            :key="id"
            :value="id"
          >
            {{ option }}
          </option>
        </select>
      </FormInput>

      <FormInput
        labelClass="input--big-label"
        text="Контактный телефон:"
        inputType="text"
        inputName="tel"
        placeholder="+7 999-999-99-99"
      />

      <div
        v-if="deliveryType !== OPTIONS.GET_BY_MYSELF"
        class="cart-form__address"
      >
        <span class="cart-form__label">{{ cartFormAddressLabel }}</span>

        <FormInput
          class="cart-form__input"
          text="Улица*"
          inputType="text"
          inputName="street"
          :value="isDefaultOption ? '' : currentDeliveryAddress.street"
          :disabled="!isDefaultOption"
          :inputChangeHandler="updateStreetValue"
        />

        <FormInput
          class="cart-form__input cart-form__input--small"
          text="Дом*"
          inputType="text"
          inputName="house"
          :value="isDefaultOption ? '' : currentDeliveryAddress.house"
          :disabled="!isDefaultOption"
          :inputChangeHandler="updateHouseValue"
        />

        <FormInput
          class="cart-form__input cart-form__input--small"
          text="Квартира"
          inputType="text"
          inputName="apartment"
          :value="isDefaultOption ? '' : currentDeliveryAddress.apartment"
          :disabled="!isDefaultOption"
          :inputChangeHandler="updateApartmentValue"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import FormInput from "@/common/components/FormInput.vue";

import { UNAUTHORIZED_OPTIONS, OPTIONS } from "@/common/constants";

import {
  SET_DELIVERY_TYPE,
  SET_DELIVERY_ADDRESS,
  UPDATE_STREET_VALUE,
  UPDATE_HOUSE_VALUE,
  UPDATE_APARTMENT_VALUE
} from "@/store/mutation-types";

export default {
  name: "CartForm",
  components: {
    FormInput,
  },
  data() {
    return {
      OPTIONS,
    };
  },
  computed: {
    ...mapState("Auth", ["isAuthorized"]),
    ...mapState("Cart", ["deliveryType", "currentDeliveryAddress"]),
    ...mapState("Orders", ["userAddresses"]),

    selectOptions() {
      return this.isAuthorized ? [...UNAUTHORIZED_OPTIONS, ...this.userAddresses.map(it => it.name)] : UNAUTHORIZED_OPTIONS;
    },
    cartFormAddressLabel() {
      if (!Object.values(OPTIONS).includes(this.deliveryType)) {
        return "Адрес:";
      }

      return "Новый адрес:";
    },
    isDefaultOption() {
      return Object.values(OPTIONS).includes(this.deliveryType);
    },
  },
  methods: {
    ...mapMutations("Cart", {
      setDeliveryType: SET_DELIVERY_TYPE,
      setDeliveryAddress: SET_DELIVERY_ADDRESS,
      updateStreetValue: UPDATE_STREET_VALUE,
      updateHouseValue: UPDATE_HOUSE_VALUE,
      updateApartmentValue: UPDATE_APARTMENT_VALUE,
    }),

    selectChangeHandler(e) {
      const selectedOption = e.target.selectedOptions[0].text;

      this.setDeliveryType(selectedOption);

      if (selectedOption === OPTIONS.GET_BY_MYSELF) {
        this.setDeliveryAddress(null);
      }

      if (!Object.values(OPTIONS).includes(selectedOption)) {
        const currentAddress = this.userAddresses.find(it => it.name === selectedOption);

        this.setDeliveryAddress(currentAddress);
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.cart-form {
  justify-content: space-between;
}
</style>
