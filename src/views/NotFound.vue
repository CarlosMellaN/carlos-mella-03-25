<template>
  <div class="flex flex-col justify-center items-center p-8">
    <img src="@/assets/pokemon_logo.svg" alt="Pokémon not found" class="w-48 h-48 mb-3" />
    <h1 class="text-4xl font-bold text-gray-800 mb-4">¡Oops!</h1>
    <p class="text-lg text-gray-600 mb-4">
      The Pokémon you're looking for is not on your team or doesn't exist.
    </p>
    <router-link
      to="/"
      class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
    >
      Back to home
    </router-link>
  </div>
</template>
<script setup lang="ts"></script>
