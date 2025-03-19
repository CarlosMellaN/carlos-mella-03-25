import type { Pokemon } from "@/types/pokemonTypes";

export function mapPokemonDetails(pokemonData: any): Pokemon {
  const mappedPokemon = {
    name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
    id: pokemonData.id,
    url: pokemonData.species?.url || "",
    imageFront: pokemonData.sprites?.front_default || "",
    imageBack: pokemonData.sprites?.back_default || "",
    cries: pokemonData.cries.latest,
    types: pokemonData.types.map((type: { type: { name: string } }) => ({
      name: type.type.name,
    })),
    height: pokemonData.height,
    weight: pokemonData.weight,
    stats: pokemonData.stats.map((stat: { base_stat: number; stat: { name: string } }) => ({
      base_stat: stat.base_stat,
      stat: { name: stat.stat.name },
    })),
  };

  return mappedPokemon;
}
