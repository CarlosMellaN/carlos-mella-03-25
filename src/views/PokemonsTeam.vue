<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 pt-8 pb-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
  >
    <div
      v-for="pokemon in teamPokemon.teamPokemons"
      :key="pokemon.name"
      class="rounded-lg shadow-md p-4 flex flex-col transition-transform hover:scale-105 relative mb-8"
      :class="getCardBackgroundClass(pokemon.types[0]?.name)"
    >
      <router-link :to="{ name: 'PokemonsDetails', params: { id: pokemon.id } }">
        <div class="flex justify-between items-center w-full mb-1">
          <p class="text-lg font-bold capitalize" :class="getNameTypeClass(pokemon.types[0]?.name)">
            {{ pokemon.name }}
          </p>
          <span
            class="text-gray font-bold opacity-70"
            :class="getNameTypeClass(pokemon.types[0]?.name)"
          >
            #{{ pokemon.id }}
          </span>
        </div>
        <div class="flex flex-col h-full">
          <div class="bg-opacity-80 rounded-lg p-3 flex justify-end items-center mb-1">
            <img
              :src="pokemon.imageFront"
              alt="Imagen de pokemon"
              class="w-full max-w-xs object-contain h-48"
            />
          </div>
          <div class="w-full max-w-lg mx-auto mb-4">
            <PokemonChart :stats="pokemon.stats" />
          </div>
        </div>
      </router-link>
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
        <div class="w-full md:w-1/2 flex gap-2">
          <span
            v-for="(type, index) in pokemon.types"
            :key="index"
            class="px-3 py-1 text-sm rounded-full font-medium"
            :class="getTypeClass(type.name)"
          >
            {{ type.name }}
          </span>
        </div>
        <div class="w-full md:w-1/2 flex justify-center md:justify-end">
          <button @click="playCry(pokemon)">
            <PlayIcon class="size-6 text-indigo-400" aria-hidden="true" />
          </button>
          <TeamEditor :pokemon="pokemon" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PlayIcon } from "@heroicons/vue/20/solid";
import { useTeamPokemonStore } from "@/stores/teamStore";
import {
  getCardBackgroundClass,
  getNameTypeClass,
  getTypeClass,
} from "@/utils/pokemonBackGroundColors.ts";
import type { Pokemon } from "@/types/pokemonTypes";
import PokemonChart from "@/components/PokemonChart.vue";
import TeamEditor from "@/components/TeamEditor.vue";

const teamPokemon = useTeamPokemonStore();

const playCry = (pokemon: Pokemon) => {
  const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`;
  const audio = new Audio(cryUrl);
  audio.play();
};
</script>
