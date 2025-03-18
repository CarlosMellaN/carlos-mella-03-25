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
          <div class="flex flex-wrap gap-2">
            <span
              class="px-3 py-1 text-sm rounded-full font-medium cursor-pointer group relative"
              @click="!isTeamFull || isTeamPokemon(pokemon) ? toggleTeam(pokemon) : null"
            >
              <component
                class="block size-6 transition-colors duration-300"
                aria-hidden="true"
                :is="isTeamPokemon(pokemon) ? HeartIconSolid : HeartIconOutline"
                :class="[
                  isTeamPokemon(pokemon) ? 'text-red-500' : 'text-gray-400',
                  isTeamFull && !isTeamPokemon(pokemon) ? 'opacity-50 cursor-not-allowed' : '',
                ]"
              />
              <span
                class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-stone-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
              >
                {{
                  isTeamFull && !isTeamPokemon(pokemon)
                    ? "Equipo lleno, elimina un Pokémon del equipo"
                    : isTeamPokemon(pokemon)
                    ? "Sacar del equipo"
                    : "Agregar al equipo"
                }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useTeamPokemonStore } from "@/stores/teamStore";
import { HeartIcon as HeartIconOutline } from "@heroicons/vue/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/vue/24/solid";
import type { Pokemon } from "@/types/pokemonTypes";

const getCardBackgroundClass = (type: string) => {
  if (!type) return "bg-gray-100";

  const bgClasses: { [key: string]: string } = {
    fire: "bg-red-100",
    water: "bg-blue-100",
    grass: "bg-green-100",
    electric: "bg-yellow-100",
    psychic: "bg-pink-100",
    poison: "bg-purple-100",
    bug: "bg-lime-100",
    flying: "bg-indigo-100",
    fighting: "bg-red-200",
    normal: "bg-gray-200",
    ground: "bg-yellow-200",
    rock: "bg-yellow-200",
    ghost: "bg-purple-200",
    ice: "bg-blue-100",
    dragon: "bg-indigo-200",
    fairy: "bg-pink-200",
    default: "bg-gray-200",
  };

  return bgClasses[type.toLowerCase()] || bgClasses.default;
};

const getTypeClass = (type: string) => {
  const typeClasses: { [key: string]: string } = {
    fire: "bg-red-500 text-white",
    water: "bg-blue-500 text-white",
    grass: "bg-green-500 text-white",
    electric: "bg-yellow-400 text-white",
    psychic: "bg-pink-500 text-white",
    poison: "bg-purple-500 text-white",
    bug: "bg-lime-500 text-white",
    flying: "bg-indigo-300 text-white",
    fighting: "bg-red-700 text-white",
    normal: "bg-gray-400 text-white",
    ground: "bg-yellow-600 text-white",
    rock: "bg-yellow-800 text-white",
    ghost: "bg-purple-700 text-white",
    ice: "bg-blue-200 text-white",
    dragon: "bg-indigo-600 text-white",
    fairy: "bg-pink-300 text-white",
    default: "bg-gray-300 text-white",
  };

  return typeClasses[type.toLowerCase()] || typeClasses.default;
};

const getNameTypeClass = (type: string) => {
  const typeClasses: { [key: string]: string } = {
    fire: "text-red-500",
    water: "text-blue-500",
    grass: "text-green-500",
    electric: "text-yellow-400",
    psychic: "text-pink-500",
    poison: "text-purple-500",
    bug: "text-lime-500",
    flying: "text-indigo-300",
    fighting: "text-red-700",
    normal: "text-gray-400",
    ground: "text-yellow-600",
    rock: "text-yellow-800",
    ghost: "text-purple-700",
    ice: "text-blue-200",
    dragon: "text-indigo-600",
    fairy: "text-pink-300",
    default: "text-gray-300",
  };

  return typeClasses[type.toLowerCase()] || typeClasses.default;
};
const teamPokemon = useTeamPokemonStore();
const isTeamPokemon = computed(
  () => (pokemon: Pokemon) => teamPokemon.isInTeamPokemons(pokemon.name)
);
const isTeamFull = computed(() => teamPokemon.teamPokemons.length >= 6);
const toggleTeam = (pokemon: Pokemon) => {
  if (isTeamPokemon.value(pokemon)) {
    teamPokemon.removeTeamPokemons(pokemon.name);
  } else {
    teamPokemon.addTeamPokemons(pokemon);
  }
};
</script>
