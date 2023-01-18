<template>
    <div
      v-if="items.length"
      :class="containerClass"
    >
      <p v-if="containerMessage && containerMessage.length > 0">{{ containerMessage }}</p>

      <label
        v-for="item in items"
        :key="item.id"
        :class="labelClass(item.name)"
      >
        <input
          type="radio"
          :name="itemName"
          :value="item.id"
          :class="inputClass"
          :checked="item.id === value"
          @change="radioInputChangeHandler"
        >

        <b v-if="checkIsDoughComponent">{{ item.name }}</b>

        <SelectorItem :text="checkIsDoughComponent ? item.description : item.name" />
      </label>
    </div>
</template>

<script>
import SelectorItem from "@/common/components/SelectorItem.vue";

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
    value: {
      type: Number,
      required: true,
    },
    inputChangeHandler: {
      type: Function,
      required: true,
    },
  },
  computed: {
    containerClass() {
      return this.itemName === "sauce" ? "ingredients__sauce" : `sheet__content ${this.itemName}`;
    },
    inputClass() {
      return this.itemName === "sauce" ? "" : "visually-hidden";
    },
    checkIsDoughComponent() {
      return this.itemName === "dough";
    },
  },
  methods: {
    labelClass(name) {
      return this.itemName === "sauce" ? "ingredients__input radio" : `${this.itemName}__input ${this.itemName}__input--${this.itemMap[name]}`;
    },
    radioInputChangeHandler(e) {
      const itemId = this.items.find(it => it.id === parseInt(e.target.value)).id;

      this.inputChangeHandler(itemId);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
