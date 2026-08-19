import type { Product } from './product.js';

export interface CartItem extends Product {
  quantity: number;
}
