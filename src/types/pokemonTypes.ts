export interface Pokemon {
  name: string;
  id: number;
  url: string;
  imageFront: string;
  imageBack: string;
  types: { name: string }[];
  height: number;
  weight: number;
}
