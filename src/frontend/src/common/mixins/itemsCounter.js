export default {
  methods: {
    $itemsCounter(items, id, propertyName) {
      const itemIndex = items.findIndex(it => it[propertyName] === id);

      return itemIndex === - 1 ? 0 : items[itemIndex].quantity;
    },
  },
};
