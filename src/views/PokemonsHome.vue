<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 pt-8 pb-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
  >
    <div
      v-for="pokemon in pokemonsList"
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
        <div class="flex justify-end items-center mt-4">
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
  <div class="mt-8 flex flex-col items-center">
    <nav class="relative z-0 inline-flex rounded-md shadow-lg" aria-label="Pagination">
      <button
        @click="changePage(page - 1)"
        :disabled="page === 1"
        class="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors duration-200"
        :class="page === 1 ? 'text-gray-400' : 'text-indigo-600'"
      >
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <template v-for="pageNum in totalPages" :key="pageNum">
        <button
          @click="changePage(pageNum)"
          :class="[
            'relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors duration-200',
            page === pageNum
              ? 'z-10 bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50',
          ]"
        >
          {{ pageNum }}
        </button>
      </template>
      <button
        @click="changePage(page + 1)"
        :disabled="page === totalPages"
        class="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors duration-200"
        :class="page === totalPages ? 'text-gray-400' : 'text-indigo-600'"
      >
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </nav>
    <div class="text-sm text-gray-600 mt-4 bg-gray-50 px-4 py-2 rounded-md shadow-sm">
      Mostrando <span class="font-medium">{{ getOffset(page) + 1 }}</span> a
      <span class="font-medium">{{ Math.min(getOffset(page) + limit, TOTAL_POKEMON) }}</span> de
      <span class="font-medium">{{ TOTAL_POKEMON }}</span> Pokémon
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { getAllPokemons, getPokemon } from "../api/pokemonServices";
import { mapPokemonDetails } from "@/utils/pokemonBasics";
import { useTeamPokemonStore } from "@/stores/teamStore";
import { HeartIcon as HeartIconOutline } from "@heroicons/vue/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/vue/24/solid";
import type { Pokemon } from "@/types/pokemonTypes";

const TOTAL_POKEMON = 150;
const pokemonsList = ref<Pokemon[] | null>(null);
const page = ref(1);
const totalPages = computed(() => {
  return Math.min(6, Math.ceil(TOTAL_POKEMON / limit.value));
});
const limit = ref(25); // Cantidad de Pokémon por página
const isLoading = ref(false);
const totalCount = ref(0);

const changePage = (newPage: number) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    page.value = newPage;
  }
};

const getOffset = (pageNum: number): number => {
  return (pageNum - 1) * limit.value;
};

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

const getPokemons = async (pageNum: number) => {
  try {
    isLoading.value = true;
    pokemonsList.value = null;
    const offset = getOffset(pageNum);
    const data = await getAllPokemons(limit.value, offset);
    // console.log(data);
    if (data.count !== totalCount.value) {
      totalCount.value = data.count;
      totalPages.value = Math.ceil(data.count / limit.value);
    }

    const basicPokemons = data.results.map((pokemon: { name: string; url: string }) => ({
      name: pokemon.name,
      url: pokemon.url,
    }));
    const pokemonDetails = await Promise.all(
      basicPokemons.map(async (pokemon: { name: string; url: string }) => {
        const details = await getPokemon(pokemon.name);
        return mapPokemonDetails(details);
      })
    );
    // console.log(pokemonDetails);
    pokemonsList.value = pokemonDetails;
  } catch (error) {
    console.error("Error al cargar los Pokémon:", error);
    pokemonsList.value = [];
  }
};

onMounted(() => {
  getPokemons(page.value);
});

watch(page, (newPage) => {
  getPokemons(newPage);
});
</script>
<style scoped></style>
