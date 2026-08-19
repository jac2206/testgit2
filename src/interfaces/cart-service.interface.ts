import type { CartItem } from '../models/cart-item.js';
import type { Product } from '../models/product.js';

export interface ICartService {
  addProductById(productId: number): Promise<Product | undefined>;
  getItems(): Promise<readonly CartItem[]>;
  getTotal(): Promise<number>;
  isEmpty(): Promise<boolean>;
}
