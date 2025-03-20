import { createRouter, createWebHistory } from "vue-router";
import { useTeamPokemonStore } from "@/stores/teamStore";
import PokemonsHome from "@/views/PokemonsHome.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "pokemon",
      component: PokemonsHome,
    },
    {
      path: "/team",
      name: "PokemonsTeam",
      component: () => import("@/views/PokemonsTeam.vue"),
    },
    {
      path: "/team/:id",
      name: "PokemonsDetails",
      component: () => import("@/views/PokemonDetails.vue"),
      beforeEnter: (to, from, next) => {
        const teamStore = useTeamPokemonStore();
        const id = Number(to.params.id);
        const pokemonExists = teamStore.teamPokemons.some((pokemon) => pokemon.id === id);
        if (pokemonExists) {
          next();
        } else {
          next({ name: "NotFound" });
        }
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

export default router;
