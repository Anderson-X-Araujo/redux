import { createSlice } from "@reduxjs/toolkit";
import data from "../data";

const slice = createSlice({
  name: "products",
  initialState: {
    data,
    filters: {
      colors: [],
      prices: {
        max: 0,
        min: 0,
      },
    },
  },
  reducers: {
    changeFilters(state, action) {
      state.filters[action.payload.name] = action.payload.value;
    },
  },
});

export const { changeFilters } = slice.actions;

// Seletores com diferentes filtros
export const selectUniqueColors = ({ products }) =>
  Array.from(new Set(products.data.map(({ color }) => color)));

// Composição de funções
const filterColors = (colors) => (product) =>
  !colors.length || colors.includes(product.color);

const filterPrices = (prices) => (product) =>
  (!prices.max || product.price < prices.max) &&
  (!prices.min || product.price > prices.min);

export const filterProducts = ({ products }) => {
  const { filters, data } = products;
  return data
    .filter(filterColors(filters.colors))
    .filter(filterPrices(filters.prices));
};

export default slice.reducer;
