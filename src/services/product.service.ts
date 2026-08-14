import type { IProductRepository } from '../interfaces/product-repository.interface.js';
import type { IProductService } from '../interfaces/product-service.interface.js';
import type { Product } from '../models/product.js';

export class ProductService implements IProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async getProducts(): Promise<readonly Product[]> {
    return await this.productRepository.getAll();
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return await this.productRepository.findById(id);
  }
}
