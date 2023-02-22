import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
  }),
  extractRehydrationInfo: function (action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: function (builder) {
    return {
      getPokemonByName: builder.query(
        {
          species: { name: "" },
          sprites: { front_shiny: "" },
        },
        function (name) {
          return `pokemon/${name}`;
        }
      ),
      getPokemonList: builder.query(
        { results: [{ name: "" }] },
        function () {
          return "pokemon/";
        }
      ),
    };
  },
});

// Export hooks for usage in functional components
export const useGetPokemonByNameQuery = pokemonApi.useGetPokemonByNameQuery;
export const useGetPokemonListQuery = pokemonApi.useGetPokemonListQuery;
export const getRunningQueriesThunk =
  pokemonApi.util.getRunningQueriesThunk;

// export endpoints for use in SSR
export const getPokemonByName = pokemonApi.endpoints.getPokemonByName;
export const getPokemonList = pokemonApi.endpoints.getPokemonList;
