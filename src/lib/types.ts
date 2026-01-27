import type { ImagePlaceholder } from './placeholder-images';

export type Seller = {
  id: string;
  name: string;
  story: string;
  avatarId: ImagePlaceholder['id'];
  joined: string;
};

export type ProductCategory = 'Pottery' | 'Jewelry' | 'Textiles' | 'Woodwork' | 'Other';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageIds: ImagePlaceholder['id'][];
  sellerId: string;
  category: ProductCategory;
  rating: number;
  reviewCount: number;
};

export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
};
