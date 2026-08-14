import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import type { CartItem } from '../models/cart-item.js';
import type { Product } from '../models/product.js';

export const reader = createInterface({ input, output });

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(value);
}

export function showProducts(products: readonly Product[]): void {
  console.log('\n--- PRODUCTOS ---');
  products.forEach((product) => {
    console.log(`${product.id}. ${product.name} - ${formatCurrency(product.price)}`);
  });
}

export function showCart(items: readonly CartItem[], total: number): void {
  console.log('\n--- CARRITO ---');

  if (items.length === 0) {
    console.log('El carrito está vacío.');
    return;
  }

  items.forEach((item) => {
    const subtotal = item.price * item.quantity;
    console.log(`${item.name} x${item.quantity} - ${formatCurrency(subtotal)}`);
  });
  console.log(`Total: ${formatCurrency(total)}`);
}
