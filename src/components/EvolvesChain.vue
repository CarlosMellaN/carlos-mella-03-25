<template>
  <div class="p-4">
    <h2
      class="text-2xl font-bold text-center mb-6"
      :class="getNameTypeClass(pokemonTypes[0]?.name)"
    >
      Evolution Chain
    </h2>
    <div class="flex flex-col md:flex-row justify-around items-center gap-6">
      <div class="flex flex-col items-center transition-shadow">
        <img
          :src="pokemonStageOne?.imageFront"
          alt="image of pokemon"
          class="w-32 h-32 object-contain"
        />
        <p
          class="mt-2 text-lg font-semibold text-gray-800"
          :class="getNameTypeClass(pokemonTypes[0]?.name)"
        >
          {{ pokemonStageOne?.name }}
        </p>
      </div>
      <div class="flex flex-col items-center transition-shadow">
        <img
          :src="pokemonStageTwo?.imageFront"
          alt="image of pokemon"
          class="w-32 h-32 object-contain"
        />
        <p
          class="mt-2 text-lg font-semibold text-gray-800"
          :class="getNameTypeClass(pokemonTypes[0]?.name)"
        >
          {{ pokemonStageTwo?.name }}
        </p>
      </div>
      <div v-if="pokemonStageThree" class="flex flex-col items-center transition-shadow">
        <img
          :src="pokemonStageThree?.imageFront"
          alt="image of pokemon"
          class="w-32 h-32 object-contain"
        />
        <p
          class="mt-2 text-lg font-semibold text-gray-800"
          :class="getNameTypeClass(pokemonTypes[0]?.name)"
        >
          {{ pokemonStageThree?.name }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Pokemon } from "@/types/pokemonTypes";
import { getNameTypeClass } from "@/utils/pokemonBackGroundColors.ts";
defineProps<{
  pokemonStageOne: Pokemon | null;
  pokemonStageTwo: Pokemon | null;
  pokemonStageThree: Pokemon | null;
  pokemonTypes: Pokemon["types"];
}>();
</script>
