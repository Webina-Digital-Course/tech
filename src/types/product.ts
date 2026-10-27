export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  aspectRatio: 'standard' | 'tall';
  inCart: boolean;
  image: string;
  imageDescription: string;
}