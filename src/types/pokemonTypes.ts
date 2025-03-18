export interface Pokemon {
  name: string;
  url: string;
  imageFront: string;
  imageBack: string;
  types: { name: string }[];
  height: number;
  weight: number;
}
