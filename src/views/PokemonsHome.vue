<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 pt-8">
    <div
      v-for="pokemon in pokemonsList"
      :key="pokemon.name"
      class="rounded-lg shadow-md p-4 flex flex-col items-center transition-transform hover:scale-105"
      :class="getCardBackgroundClass(pokemon.types[0]?.name)"
    >
      <div class="bg-opacity-80 rounded-lg p-3 w-full flex justify-center">
        <img
          :src="pokemon.imageFront"
          alt="Imagen de pokemon"
          class="w-full max-w-xs object-contain h-48"
        />
      </div>
      <p
        class="text-lg font-bold mt-3 capitalize"
        :class="getTextColorClass(pokemon.types[0]?.name)"
      >
        {{ pokemon.name }}
      </p>
      <div class="flex flex-wrap gap-2 mt-2 justify-center">
        <span
          v-for="(type, index) in pokemon.types"
          :key="index"
          class="px-3 py-1 text-sm rounded-full font-medium"
          :class="getTypeClass(type.name)"
        >
          {{ type.name }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAllPokemons, getPokemon } from "../api/pokemonServices";
import { mapPokemonDetails } from "@/utils/pokemonBasics";
import type { Pokemon } from "@/types/pokemonTypes";

const pokemonsList = ref<Pokemon[] | null>(null);
const page = ref(1);
const totalPages = ref(15); // Puedes ajustar este valor según la cantidad total de Pokémon
const limit = ref(150); // Cantidad de Pokémon por página
const isLoading = ref(false);
const totalCount = ref(0);

const getOffset = (pageNum: number): number => {
  return (pageNum - 1) * limit.value;
};

const getCardBackgroundClass = (type) => {
  if (!type) return "bg-gray-200";

  const bgClasses = {
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
    dark: "bg-gray-700",
    steel: "bg-gray-300",
    fairy: "bg-pink-200",
    default: "bg-gray-200",
  };

  return bgClasses[type.toLowerCase()] || bgClasses.default;
};

// Función para determinar el color del texto según el tipo
const getTextColorClass = (type) => {
  if (!type) return "text-gray-800";

  // Solo para tipos oscuros necesitamos texto claro
  const darkTypes = ["dark", "dragon", "fighting"];
  return darkTypes.includes(type.toLowerCase()) ? "text-white" : "text-gray-800";
};

// Función para asignar colores a los badges de tipos
const getTypeClass = (type) => {
  const typeClasses = {
    fire: "bg-red-500 text-white",
    water: "bg-blue-500 text-white",
    grass: "bg-green-500 text-white",
    electric: "bg-yellow-400 text-black",
    psychic: "bg-pink-500 text-white",
    poison: "bg-purple-500 text-white",
    bug: "bg-lime-500 text-white",
    flying: "bg-indigo-300 text-black",
    fighting: "bg-red-700 text-white",
    normal: "bg-gray-400 text-white",
    ground: "bg-yellow-600 text-white",
    rock: "bg-yellow-800 text-white",
    ghost: "bg-purple-700 text-white",
    ice: "bg-blue-200 text-black",
    dragon: "bg-indigo-600 text-white",
    dark: "bg-gray-800 text-white",
    steel: "bg-gray-500 text-white",
    fairy: "bg-pink-300 text-black",
    default: "bg-gray-300 text-black",
  };

  return typeClasses[type.toLowerCase()] || typeClasses.default;
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
    console.log(pokemonDetails);
    pokemonsList.value = pokemonDetails;
  } catch (error) {
    console.error("Error al cargar los Pokémon:", error);
    pokemonsList.value = [];
  }
};

onMounted(() => {
  getPokemons(page.value);
});
</script>
<style scoped></style>
