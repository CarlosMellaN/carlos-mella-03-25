<template>
  <Disclosure as="nav" class="bg-red-500" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-red-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <router-link to="/">
            <div class="flex shrink-0 items-center">
              <img class="h-8 w-auto" src="@/assets/pokemon_logo.svg" alt="Your Company" />
            </div>
          </router-link>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                :class="[
                  item.href === route.path
                    ? 'bg-red-700 text-white'
                    : 'text-white hover:bg-red-700 hover:text-white',
                  'rounded-md px-3 py-2 text-sm font-medium',
                ]"
                :aria-current="item.href === route.path ? 'page' : undefined"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="router-link"
          :to="item.href"
          :class="[
            item.href === route.path
              ? 'bg-red-900 text-white'
              : 'text-white hover:bg-red-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
          :aria-current="item.href === route.path ? 'page' : undefined"
        >
          {{ item.name }}
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router"; // Importa useRoute de Vue Router

const route = useRoute(); // Obtén la ruta actual

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Equipo", href: "/team", current: false },
];
</script>
