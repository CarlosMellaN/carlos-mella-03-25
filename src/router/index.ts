import { createRouter, createWebHistory } from "vue-router";
import PokemonsHome from "@/views/PokemonsHome.vue";
// import PokemonsView from "../views/PokemonsView.vue";
// import PokemonsFavoritesView from "../views/PokemonsFavoritesView.vue"; // Ensure this file exists at the specified path

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "pokemon",
      component: PokemonsHome,
    },
  ],
});

export default router;
