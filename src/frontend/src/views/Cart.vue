<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div
          v-if="!cart.length"
          class="sheet cart__empty"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <Popup
          v-if="showModal"
        />

        <ul
          v-if="cart.length"
          class="cart-list sheet"
        >
          <CartItem
            v-for="(item, id) in cart"
            :key="id"
            :itemData="item"
          />
        </ul>

        <CartAdditional />

        <CartForm />
      </div>
    </main>

    <CartFooter />
  </form>
</template>

<script>
import { mapState } from "vuex";

import CartAdditional from '../modules/builder/components/BuilderCartAdditional.vue';
import CartFooter from '../modules/builder/components/BuilderCartFooter.vue';
import CartForm from '../modules/builder/components/BuilderCartForm.vue';
import CartItem from '../modules/builder/components/BuilderCartItem.vue';
import Popup from '../common/components/Popup.vue';

export default {
  name: "Cart",
  components: {
    CartItem,
    CartAdditional,
    CartForm,
    CartFooter,
    Popup,
  },
  computed: {
    ...mapState(["cart", "showModal"]),
  },
};
</script>

<style lang="scss" scoped>

</style>
