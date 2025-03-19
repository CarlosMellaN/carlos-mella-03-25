<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 pt-8 pb-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
  >
    <div
      v-for="pokemon in teamPokemon.teamPokemons"
      :key="pokemon.name"
      class="rounded-lg shadow-md p-4 flex flex-col transition-transform hover:scale-105 relative"
      :class="getCardBackgroundClass(pokemon.types[0]?.name)"
    >
      <div class="flex justify-between items-center w-full mb-3">
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
        <div class="bg-opacity-80 rounded-lg p-3 flex justify-end items-center mb-auto">
          <img
            :src="pokemon.imageFront"
            alt="Imagen de pokemon"
            class="w-full max-w-xs object-contain h-48"
          />
        </div>
        <div>
          <div class="w-full max-w-lg mx-auto">
            <PokemonChart :stats="pokemon.stats" />
          </div>
          <button
            @click="playCry(pokemon)"
            class="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            🔊 Play
          </button>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(type, index) in pokemon.types"
              :key="index"
              class="px-3 py-1 text-sm rounded-full font-medium"
              :class="getTypeClass(type.name)"
            >
              {{ type.name }}
            </span>
          </div>
          <TeamEditor :pokemon="pokemon" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
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
