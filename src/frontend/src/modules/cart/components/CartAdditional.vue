<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        class="additional-list__item sheet"
        v-for="item in misc"
        :key="item.id"
      >
        <p class="additional-list__description">
          <img
            :src="imageLink(item.image)"
            width="39"
            height="60"
            :alt="item.name"
          >
          <span>{{ item.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <ItemCounter
            class="additional-list__counter"
            :count="count(item.name)"
            :item="item"
            :minCount="0"
            :maxCount="Infinity"
            :inputChangeHandler="setMiscCount"
            :minusButtonClickHandler="decreaseMiscCount"
            :plusButtonClickHandler="increaseMiscCount"
          />

          <div class="additional-list__price">
            <b>x {{ item.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import ItemCounter from "@/common/components/ItemCounter.vue";

import { DECREASE_MISC_COUNT, INCREASE_MISC_COUNT, SET_MISC_COUNT } from "@/store/mutation-types";

export default {
  name: "CartAdditional",
  components: {
    ItemCounter,
  },
  computed: {
    ...mapState("Orders", ["selectedMisc"]),
    ...mapState("Builder", ["misc"]),
  },
  methods: {
    ...mapMutations("Orders", {
      decreaseMiscCount: DECREASE_MISC_COUNT,
      increaseMiscCount: INCREASE_MISC_COUNT,
      setMiscCount: SET_MISC_COUNT,
    }),

    imageLink(link) {
      const filename = link.split("/").slice(3).join("/");

      return require(`@/assets/img/` + `${filename}`);
    },
    count(name) {
      return this.selectedMisc[name]?.amount || 0;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
