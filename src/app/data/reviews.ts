import { Product } from './product';

export interface ProductDetailsResponse {
  product: Product;
  reviews: Review[];
}

export interface Review {
  id: number;
  product_id: number;
  user_name: string;
  comment: string;
  rating: number;
  created_at: string;
}
