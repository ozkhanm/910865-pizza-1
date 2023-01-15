export default {
  methods: {
    $ingredientsText(ingredients, ingredientsList) {
      return `Начинка: ${ ingredients.map(ingredient => {
        return ingredientsList.find(ingredientListItem => {
          return ingredientListItem.id === ingredient.ingredientId
        }).name.toLowerCase()
      }).join(", ")}`;
    },
  },
};
