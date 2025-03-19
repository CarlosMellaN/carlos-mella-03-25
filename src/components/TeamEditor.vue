<template>
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
          v-html="
            isTeamFull && !isTeamPokemon(pokemon)
              ? 'Team is full,<br />remove a Pokémon<br /> from the team'
              : isTeamPokemon(pokemon)
              ? 'Remove from team'
              : 'Add to team'
          "
        ></span>
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useTeamPokemonStore } from "@/stores/teamStore";
import type { Pokemon } from "@/types/pokemonTypes";
import { HeartIcon as HeartIconOutline } from "@heroicons/vue/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/vue/24/solid";
defineProps<{ pokemon: Pokemon }>();

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
