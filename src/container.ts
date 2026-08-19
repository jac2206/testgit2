import { asClass, createContainer, InjectionMode } from 'awilix';
import { ShopApp } from './app/shop-app.js';
import { ProductRepository } from './repositories/product.repository.js';
import { CartService } from './services/cart.service.js';
import { ProductService } from './services/product.service.js';

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  productRepository: asClass(ProductRepository).singleton(),
  productService: asClass(ProductService).singleton(),
  cartService: asClass(CartService).singleton(),
  shopApp: asClass(ShopApp).singleton()
});
