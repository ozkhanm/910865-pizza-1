export default {
  methods: {
    $sauceText(sauceId, getter) {
      const sauce = getter("sauces", sauceId).name;

      return `Соус: ${sauce.toLowerCase()}`;
    },
  },
};
