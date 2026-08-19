import type { Product } from '../models/product.js';

export interface IProductService {
  getProducts(): Promise<readonly Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
}
