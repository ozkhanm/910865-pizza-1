export const countSum = items => {
  return items.reduce((prev, curr) => prev + (curr.price * curr.amount), 0);
};
