import { defineStore } from "pinia";
import { ref } from "vue";

import type { Pokemon } from "@/types/pokemonTypes";

export const useTeamPokemonStore = defineStore(
  "teamPokemons",
  () => {
    const MAX_POKEMONS = 6;
    const teamPokemons = ref<Pokemon[]>([]);

    function addTeamPokemons(pokemon: Pokemon) {
      const exists = teamPokemons.value.some((p) => p.name === pokemon.name);

      if (!exists && teamPokemons.value.length < MAX_POKEMONS) {
        teamPokemons.value.push(pokemon);
      }
    }

    function removeTeamPokemons(pokemonName: string) {
      teamPokemons.value = teamPokemons.value.filter((p) => p.name !== pokemonName);
    }

    function isInTeamPokemons(pokemonName: string): boolean {
      return teamPokemons.value.some((p) => p.name === pokemonName);
    }

    return {
      teamPokemons,
      addTeamPokemons,
      removeTeamPokemons,
      isInTeamPokemons,
    };
  },
  {
    persist: true,
  }
);
