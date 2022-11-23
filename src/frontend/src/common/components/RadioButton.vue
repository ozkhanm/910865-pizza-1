<template>
    <div
      v-if="items.length"
      :class="containerClass"
    >
      <p
        v-if="containerMessage && containerMessage.length > 0"
      >{{ containerMessage }}</p>
      <label
        v-for="item in items"
        :key="item.id"
        :class="labelClass(item.name)"
      >
        <input
          type="radio"
          :name="itemName"
          :value="`${itemMap[item.name]}`"
          :class="inputClass"
          :checked="item.name === defaultSelectedItem"
        >
        <b
          v-if="checkIsDoughComponent"
        >{{ item.name }}</b>
        <SelectorItem
          :text="checkIsDoughComponent ? item.description : item.name"
        />
      </label>
    </div>
</template>

<script>
import SelectorItem from "./SelectorItem.vue";

import { ITEMS_INPUT_DATA } from "../constants";

export default {
  name: "RadioButton",
  components: {
    SelectorItem,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    itemMap: {
      type: Object,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    containerMessage: {
      type: String,
      required: false,
    },
    defaultSelectedItem: {
      type: String,
      required: true,
    },
  },
  computed: {
    containerClass() {
      return this.itemName === ITEMS_INPUT_DATA.SAUCE.ITEM_NAME ? "ingredients__sauce" : `sheet__content ${this.itemName}`;
    },
    inputClass() {
      return this.itemName === ITEMS_INPUT_DATA.SAUCE.ITEM_NAME ? "" : "visually-hidden";
    },
    checkIsDoughComponent() {
      return this.itemName === ITEMS_INPUT_DATA.DOUGH.ITEM_NAME;
    },
  },
  methods: {
    labelClass(name) {
      return this.itemName === ITEMS_INPUT_DATA.SAUCE.ITEM_NAME ? "ingredients__input radio" : `${this.itemName}__input ${this.itemName}__input--${this.itemMap[name]}`;
    },
  }
};
</script>

<style lang="scss" scoped>

</style>
