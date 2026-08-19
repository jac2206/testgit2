import type { ICartService } from '../interfaces/cart-service.interface.js';
import type { IProductService } from '../interfaces/product-service.interface.js';
import type { CartItem } from '../models/cart-item.js';
import type { Product } from '../models/product.js';

export class CartService implements ICartService {
  private items: CartItem[] = [];

  constructor(private readonly productService: IProductService) {}

  async addProductById(productId: number): Promise<Product | undefined> {
    const product = await this.productService.getProductById(productId);

    if (!product) {
      return undefined;
    }

    const existingItem = this.items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
      return product;
    }

    this.items.push({ ...product, quantity: 1 });
    return product;
  }

  async getItems(): Promise<readonly CartItem[]> {
    return this.items;
  }

  async getTotal(): Promise<number> {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  async isEmpty(): Promise<boolean> {
    return this.items.length === 0;
  }
}
