<template>
  <form action="#" method="post">

    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>

      <DoughSelector
        :dough="pizzas.dough"
        :currentDough="currentDough"
        @change="updateDoughValue"
      />

      <SizeSelector
        :sizes="pizzas.sizes"
        :currentSize="currentSize"
        @change="updateSizeValue"
      />

      <IngredientsSelector
        :sauces="pizzas.sauces"
        :ingredients="pizzas.ingredients"
        :currentSauce="currentSauce"
        :selectedIngredients="selectedIngredients"
        @change="updateSauceValue"
        @minusButtonClick="decreaseIngredientCount"
        @plusButtonClick="increaseIngredientCount"
        @blur="setCount"
      />

      <div class="content__pizza">
        <PizzaName
          :name="pizzaName"
          @changeName="updateName"
        />

        <PizzaView
          :selectedIngredients="selectedIngredients"
          :currentDough="currentDough"
          :currentSauce="currentSauce"
          @change="updateIngredients"
        />

        <PriceCounter
          :totalPrice="getTotalPrice"
          :selectedIngredients="selectedIngredients"
          :name="pizzaName"
          @submit="addToCart"
        />
      </div>

    </div>

  </form>
</template>

<script>
import PriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";
import PizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import DoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import SizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import IngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import PizzaName from "@/modules/builder/components/BuilderPizzaName.vue";

import { ingredientsMap, doughMap, sizeMap, sauceMap, ITEMS_INPUT_DATA, MAX_INGREDIENTS_NUMBER } from "@/common/constants";
import pizzas from "@/static/pizza.json";

export default {
  name: "Index",
  components: {
      PriceCounter,
      PizzaView,
      DoughSelector,
      SizeSelector,
      IngredientsSelector,
      PizzaName,
  },
  data() {
    return {
      pizzas,
      ingredientsMap,
      doughMap,
      sizeMap,
      sauceMap,
      ITEMS_INPUT_DATA,
      selectedIngredients: {},
      currentDough: ITEMS_INPUT_DATA.DOUGH.DEFAULT_RADIO_CHECK,
      currentSauce: ITEMS_INPUT_DATA.SAUCE.DEFAULT_RADIO_CHECK,
      currentSize: ITEMS_INPUT_DATA.SIZE.DEFAULT_RADIO_CHECK,
      totalPrice: 0,
      pizzaName: "",
      cart: [],
    };
  },
  computed: {
    getTotalPrice() {
      const multiplier = this.pizzas.sizes.find(it => it.name === this.currentSize).multiplier;
      const doughPrice = this.pizzas.dough.find(it => it.name === this.currentDough).price;
      const saucePrice = this.pizzas.sauces.find(it => it.name === this.currentSauce).price;
      const ingredientsPrice = Object.values(this.selectedIngredients).reduce((prev, curr) => {
        return prev + (curr.price * curr.amount);
      }, 0);

      return multiplier * (doughPrice + saucePrice + ingredientsPrice);
    },
  },
  methods: {
    updateDoughValue(value) {
      this.currentDough = value;
    },
    updateSauceValue(value) {
      this.currentSauce = value;
    },
    updateSizeValue(value) {
      this.currentSize = value;
    },
    updateName(name) {
      this.pizzaName = name;
    },
    updateIngredients(ingredients) {
      this.selectedIngredients = { ...this.selectedIngredients, ...ingredients };
    },
    decreaseIngredientCount(ingredient) {
      const selectedIngredients = { ...this.selectedIngredients };
      const ingredientName = ingredient.name;
      const count = --ingredient.amount;

      if (count === 0) {
        delete selectedIngredients[ingredientName];
      } else {
        selectedIngredients[ingredientName] = ingredient;
      }

      this.selectedIngredients = { ...selectedIngredients };
    },
    increaseIngredientCount(ingredient) {
      const selectedIngredients = { ...this.selectedIngredients };
      const ingredientName = ingredient.name;

      if (selectedIngredients[ingredientName]) {
        selectedIngredients[ingredientName].amount++;
      } else {
        selectedIngredients[ingredientName] = ingredient;
        selectedIngredients[ingredientName].amount = 1;
      }

      this.selectedIngredients = { ...selectedIngredients };
    },
    setCount(count, ingredientName) {
      let value;
      const selectedIngredients = { ...this.selectedIngredients };

      if (count < 0) {
        value = 0;
      } else if (count >= 0 && count <= MAX_INGREDIENTS_NUMBER) {
        value = parseInt(count);
      } else if (count > MAX_INGREDIENTS_NUMBER) {
        value = MAX_INGREDIENTS_NUMBER;
      }

      const isAlreadySelected = !!selectedIngredients[ingredientName];

      if (isAlreadySelected) {
        if (value === 0) {
          delete selectedIngredients[ingredientName];
        } else {
          selectedIngredients[ingredientName].amount = value;
        }
      } else {
        if (value !== 0) {
          selectedIngredients[ingredientName] = this.pizzas.ingredients.find(it => it.name === ingredientName);
          selectedIngredients[ingredientName].amount = value;
        }
      }

      this.selectedIngredients = { ...selectedIngredients };
    },
    addToCart() {
      const newCartItem = {
        dough: this.currentDough,
        size: this.currentSize,
        sauce: this.currentSauce,
        ingredients: this.selectedIngredients,
        name: this.pizzaName,
        price: this.totalPrice,
      };

      this.cart = [...this.cart, newCartItem];
      this.selectedIngredients = {};
      this.currentDough = ITEMS_INPUT_DATA.DOUGH.DEFAULT_RADIO_CHECK;
      this.currentSauce = ITEMS_INPUT_DATA.SAUCE.DEFAULT_RADIO_CHECK;
      this.currentSize = ITEMS_INPUT_DATA.SIZE.DEFAULT_RADIO_CHECK;
      this.totalPrice = 0;
      this.pizzaName = "";
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
