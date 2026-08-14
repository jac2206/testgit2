import type { ICartService } from '../interfaces/cart-service.interface.js';
import type { IProductService } from '../interfaces/product-service.interface.js';
import { reader, showCart, showProducts } from '../utils/console.js';

export class ShopApp {
  constructor(
    private readonly cartService: ICartService,
    private readonly productService: IProductService
  ) {}

  async run(): Promise<void> {
    let active = true;

    while (active) {
      this.showMenu();
      const option = await reader.question('Selecciona una opción: ');

      switch (option.trim()) {
        case '1':
          showProducts(await this.productService.getProducts());
          break;
        case '2':
          await this.addProduct();
          break;
        case '3':
          await this.showCurrentCart();
          break;
        case '4':
          active = !(await this.finishPurchase());
          break;
        case '5':
          console.log('¡Hasta pronto!');
          active = false;
          break;
        default:
          console.log('Opción no válida. Intenta de nuevo.');
      }
    }

    reader.close();
  }

  private showMenu(): void {
    console.log('\n=== TIENDA ===');
    console.log('1. Ver productos');
    console.log('2. Agregar producto al carrito');
    console.log('3. Ver carrito');
    console.log('4. Finalizar compra');
    console.log('5. Salir');
  }

  private async addProduct(): Promise<void> {
    showProducts(await this.productService.getProducts());
    const response = await reader.question('\nEscribe el número del producto: ');
    const product = await this.cartService.addProductById(Number(response));

    if (!product) {
      console.log('Producto no válido. Intenta de nuevo.');
      return;
    }

    console.log(`${product.name} fue agregado al carrito.`);
  }

  private async showCurrentCart(): Promise<void> {
    const items = await this.cartService.getItems();
    const total = await this.cartService.getTotal();
    showCart(items, total);
  }

  private async finishPurchase(): Promise<boolean> {
    if (await this.cartService.isEmpty()) {
      console.log('No puedes finalizar una compra con el carrito vacío.');
      return false;
    }

    await this.showCurrentCart();
    console.log('\n¡Gracias por tu compra!');
    return true;
  }
}
