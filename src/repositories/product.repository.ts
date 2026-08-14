import { catalog } from '../data/catalog.js';
import type { IProductRepository } from '../interfaces/product-repository.interface.js';
import type { Product } from '../models/product.js';

export class ProductRepository implements IProductRepository {
  async getAll(): Promise<readonly Product[]> {
    return catalog;
  }

  async findById(id: number): Promise<Product | undefined> {
    return catalog.find((product) => product.id === id);
  }
}
