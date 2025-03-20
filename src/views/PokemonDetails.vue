<template>
  <div
    v-if="pokemon"
    class="grid grid-cols-1 pt-8 lg:mt-4 pb-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 rounded-lg shadow-md p-4"
    :class="getCardBackgroundClass(pokemon.types[0]?.name)"
  >
    <div class="flex justify-between items-center mb-1">
      <div class="flex items-center gap-2">
        <p class="text-lg font-bold capitalize" :class="getNameTypeClass(pokemon.types[0]?.name)">
          {{ pokemon.name }}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <button @click="playCry(pokemon)">
          <PlayIcon class="size-6 text-indigo-400" aria-hidden="true" />
        </button>
        <TeamEditor :pokemon="pokemon" />
        <span
          class="text-gray font-bold opacity-70"
          :class="getNameTypeClass(pokemon.types[0]?.name)"
        >
          #{{ pokemon.id }}
        </span>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-4 mb-4">
      <div
        class="bg-opacity-80 rounded-lg p-3 flex justify-center items-center flex-1 flex-col gap-4 order-1 md:order-2"
      >
        <div class="w-full flex justify-center gap-2">
          <span
            v-for="(type, index) in pokemon.types"
            :key="index"
            class="px-3 py-1 text-sm rounded-full font-medium"
            :class="getTypeClass(type.name)"
          >
            {{ type.name }}
          </span>
        </div>
        <img
          :src="pokemon.imageFront"
          alt="Imagen de pokemon"
          class="w-full max-w-xs object-contain h-48"
        />
        <div class="w-full flex justify-center gap-2">
          <span
            class="px-3 py-1 text-sm font-black"
            :class="getNameTypeClass(pokemon.types[0]?.name)"
          >
            height: {{ pokemon.height }}
          </span>
          <span
            class="px-3 py-1 text-sm font-black"
            :class="getNameTypeClass(pokemon.types[0]?.name)"
          >
            weight: {{ pokemon.weight }}
          </span>
        </div>
        <div class="w-full max-w-lg mx-auto">
          <p class="text-sm text-gray-600">
            {{ pokemonSpecies?.description }}
          </p>
        </div>
      </div>
      <div class="w-full max-w-lg mx-auto flex-1 order-2 md:order-1">
        <PokemonChart :stats="pokemon.stats" />
      </div>
    </div>
    <div class="border-t border-gray-300 my-4"></div>
    <EvolvesChain
      class="mt-2"
      v-if="pokemonStageOne || pokemonStageTwo || pokemonStageThree"
      :pokemonStageOne="pokemonStageOne"
      :pokemonStageTwo="pokemonStageTwo"
      :pokemonStageThree="pokemonStageThree"
      :pokemonTypes="pokemon.types"
    />
  </div>
  <div v-else>
    <p>Cargando Pokémon...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { PlayIcon } from "@heroicons/vue/20/solid";
import { useRoute } from "vue-router";
import { getPokemon, getPokemonSpecies, getEvolutionChainLink } from "@/api/pokemonServices";
import { mapPokemonDetails, mapPokemonSpecies, mapEvolutionChain } from "@/utils/pokemonBasics";
import {
  getNameTypeClass,
  getTypeClass,
  getCardBackgroundClass,
} from "@/utils/pokemonBackGroundColors.ts";
import type { Pokemon, PokemonSpecies } from "@/types/pokemonTypes";
import PokemonChart from "@/components/PokemonChart.vue";
import EvolvesChain from "@/components/EvolvesChain.vue";
import TeamEditor from "@/components/TeamEditor.vue";

const pokemon = ref<Pokemon | null>(null);
const pokemonSpecies = ref<PokemonSpecies | null>(null);
const route = useRoute();
const id = route.params.id.toString();
const pokemonStageOne = ref<Pokemon | null>(null);
const pokemonStageTwo = ref<Pokemon | null>(null);
const pokemonStageThree = ref<Pokemon | null>(null);

onMounted(async () => {
  try {
    const pokemonDetails = await getPokemon(id);
    pokemon.value = mapPokemonDetails(pokemonDetails);

    const pokemonSpeciesDetails = await getPokemonSpecies(id);
    pokemonSpecies.value = mapPokemonSpecies(pokemonSpeciesDetails);

    const idEvolutionChain = pokemonSpeciesDetails.evolution_chain.url.split("/").slice(-2)[0];
    const evolutionChain = await getEvolutionChainLink(idEvolutionChain);
    evolutionChain.value = mapEvolutionChain(evolutionChain);

    const pokemonInitial = await getPokemon(evolutionChain.value.evolveInitial);
    pokemonStageOne.value = mapPokemonDetails(pokemonInitial);
    const pokemonNext = await getPokemon(evolutionChain.value.evolveNext);
    pokemonStageTwo.value = mapPokemonDetails(pokemonNext);
    const pokemonFinal = await getPokemon(evolutionChain.value.evolveFinal);
    pokemonStageThree.value = mapPokemonDetails(pokemonFinal);
  } catch (error) {
    console.error("Error al cargar el Pokémon:", error);
  }
});

const playCry = (pokemon: Pokemon) => {
  const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`;
  const audio = new Audio(cryUrl);
  audio.play();
};
</script>
