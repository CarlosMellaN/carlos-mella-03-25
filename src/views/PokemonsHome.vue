<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 pt-8 pb-16 md:mb-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
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
        <TeamEditor :pokemon="pokemon" />
      </div>
    </div>
  </div>
  <PokemonPagination
    :page="page"
    :limit="limit"
    :totalPages="totalPages"
    :changePage="changePage"
    :getOffset="getOffset"
    class="mb-8"
  />
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { getAllPokemons, getPokemon } from "../api/pokemonServices";
import { mapPokemonDetails } from "@/utils/pokemonBasics";
import TeamEditor from "@/components/TeamEditor.vue";
import { getCardBackgroundClass, getNameTypeClass } from "@/utils/pokemonBackGroundColors.ts";
import type { Pokemon } from "@/types/pokemonTypes";
import PokemonPagination from "@/components/PokemonPagination.vue";

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
