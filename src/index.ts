import type { ShopApp } from './app/shop-app.js';
import { container } from './container.js';
import { reader } from './utils/console.js';

const app = container.resolve<ShopApp>('shopApp');

app.run().catch((error: unknown) => {
  console.error('Ocurrió un error inesperado:', error);
  reader.close();
});
