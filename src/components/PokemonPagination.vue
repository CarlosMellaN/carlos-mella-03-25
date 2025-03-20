<template>
  <div class="mt-8 flex flex-col items-center">
    <nav class="relative z-0 inline-flex rounded-md shadow-lg" aria-label="Pagination">
      <button
        @click="changePage(page - 1)"
        :disabled="page === 1"
        class="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors duration-200"
        :class="page === 1 ? 'text-gray-400' : 'text-red-600'"
      >
        <ChevronLeftIcon class="size-5" aria-hidden="true" />
      </button>
      <template v-for="pageNum in totalPages" :key="pageNum">
        <button
          @click="changePage(pageNum)"
          :class="[
            'relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors duration-200',
            page === pageNum
              ? 'z-10 bg-red-400 text-white border-red-200 hover:bg-red-700'
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
        :class="page === totalPages ? 'text-gray-400' : 'text-red-600'"
      >
        <ChevronRightIcon class="size-5" aria-hidden="true" />
      </button>
    </nav>
  </div>
</template>
<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";
defineProps<{
  page: number;
  limit: number;
  totalPages: number;
  changePage: (page: number) => void;
  getOffset: (page: number) => number;
}>();
</script>
