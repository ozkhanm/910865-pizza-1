import resources from "@/common/enums/resources";

import { AuthApiService, CrudApiService, ReadOnlyApiService } from "@/services/api.service";

export const getDoughText = (size, dough, doughSpellingMap) => {
  return `${size}, на ${doughSpellingMap[dough]} тесте`;
};

export const getSauceText = sauce => {
  return `Соус: ${sauce.toLowerCase()}`;
};

export const getIngredientsText = (ingredients, ingredientsList) => {
  return `Начинка: ${ ingredients.map(it => ingredientsList.find(it1 => it1.id === it.ingredientId).name.toLowerCase()).join(", ")}`;
};

export const createResources = () => {
  return {
    [resources.AUTH]: new AuthApiService(),
    [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH),
    [resources.SIZE]: new ReadOnlyApiService(resources.SIZE),
    [resources.SAUCE]: new ReadOnlyApiService(resources.SAUCE),
    [resources.INGREDIENTS]: new ReadOnlyApiService(resources.INGREDIENTS),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS),
  };
};

export const setAuth = store => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};

export const getFullAddress = address => {
  const { street, building, flat } = address;
  const flatStr = flat.length !== 0 ? `, кв. ${address.flat}` : "";

  return `${street}, д. ${building}` + flatStr;
};
