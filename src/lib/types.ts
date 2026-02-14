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
  imageUrls: string[];
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

// User type for local auth
export type User = {
  id: string;
  displayName: string;
  email: string;
  password?: string; // Only stored for local auth simulation
  avatarUrl?: string;
}
