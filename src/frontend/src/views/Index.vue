<template>
  <body>
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img src="@/assets/img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40">
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <main class="content">
      <form action="#" method="post">

        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">

            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <RadioButton
                :items="pizzas.dough"
                :itemMap="doughMap"
                :itemName="ITEMS_INPUT_DATA.DOUGH.ITEM_NAME"
                :defaultSelectedItem="ITEMS_INPUT_DATA.DOUGH.DEFAULT_RADIO_CHECK"
              />

            </div>

          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <RadioButton
                :items="pizzas.sizes"
                :itemMap="sizeMap"
                :itemName="ITEMS_INPUT_DATA.SIZE.ITEM_NAME"
                :defaultSelectedItem="ITEMS_INPUT_DATA.SIZE.DEFAULT_RADIO_CHECK"
              />
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

              <div class="sheet__content ingredients">

                <RadioButton
                  :items="pizzas.sauces"
                  :itemMap="sauceMap"
                  :itemName="ITEMS_INPUT_DATA.SAUCE.ITEM_NAME"
                  :containerMessage="ITEMS_INPUT_DATA.SAUCE.CONTAINER_MESSAGE"
                  :defaultSelectedItem="ITEMS_INPUT_DATA.SAUCE.DEFAULT_RADIO_CHECK"
                />

                <div class="ingredients__filling">
                  <p>Начинка:</p>

                  <ul
                    v-if="pizzas.ingredients.length"
                    class="ingredients__list"
                  >
                    <li
                      v-for="ingredient in pizzas.ingredients"
                      :key="ingredient.id"
                      class="ingredients__item"
                    >
                      <SelectorItem
                        class="filling"
                        :class="`filling--${ingredientsMap[ingredient.name]}`"
                        :text="ingredient.name"
                      />

                      <ItemCounter />
                    </li>
                  </ul>

                </div>

              </div>
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input type="text" name="pizza_name" placeholder="Введите название пиццы">
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button" disabled>Готовьте!</button>
            </div>
          </div>

        </div>

      </form>
    </main>
  </body>
</template>

<script>
  import RadioButton from "@/common/components/RadioButton";
  import ItemCounter from '../common/components/ItemCounter.vue';
  import SelectorItem from '../common/components/SelectorItem.vue';

  import { ingredientsMap, doughMap, sizeMap, sauceMap, ITEMS_INPUT_DATA } from "@/common/constants";
  import pizzas from "@/static/pizza.json";

  export default {
    name: "Index",
    components: {
        ItemCounter,
        SelectorItem,
        RadioButton,
    },
    data() {
      return {
        pizzas,
        ingredientsMap,
        doughMap,
        sizeMap,
        sauceMap,
        ITEMS_INPUT_DATA,
      };
    },
  }
</script>

<style lang="scss" scoped>

</style>
