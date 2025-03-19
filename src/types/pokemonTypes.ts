export interface Pokemon {
  name: string;
  id: number;
  url: string;
  imageFront: string;
  imageBack: string;
  cries: string;
  types: { name: string }[];
  height: number;
  weight: number;
  stats: { base_stat: number; stat: { name: string } }[];
}
