import type { Product } from '../models/product.js';

export interface IProductRepository {
  getAll(): Promise<readonly Product[]>;
  findById(id: number): Promise<Product | undefined>;
}
