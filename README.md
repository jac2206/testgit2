# Mini sistema de compras

Ejercicio de consola hecho con TypeScript. Permite consultar un catálogo, agregar productos a un carrito, ver el total y finalizar la compra.

También usa **inyección de dependencias** con Awilix: en lugar de que una clase cree directamente lo que necesita, el contenedor crea y entrega esas dependencias.

## Requisitos

- Node.js 18 o superior.

## Crear un proyecto Node + TypeScript desde cero

En una carpeta nueva, ejecuta estos comandos:

```bash
npm init -y
npm install awilix
npm install -D typescript tsx @types/node
npx tsc --init
```

Después crea la carpeta `src` y el archivo principal, por ejemplo `src/index.ts`. En el archivo `package.json` agrega estos scripts:

```json
"scripts": {
  "dev": "tsx src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

- `npm run dev`: ejecuta TypeScript directamente durante el desarrollo.
- `npm run build`: convierte los archivos `.ts` a JavaScript en la carpeta `dist`.
- `npm start`: ejecuta el proyecto ya compilado.

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Para compilar el proyecto y ejecutarlo como JavaScript:

```bash
npm run build
npm start
```

## Estructura

```text
src/
├── data/       # Catálogo inicial
├── interfaces/ # Contratos que usan las dependencias
├── models/     # Tipos Product y CartItem
├── repositories/ # product.repository.ts: acceso al catálogo
├── services/   # cart.service.ts y product.service.ts
├── utils/      # Lectura y salida por consola
├── app/        # shop-app.ts: flujo y menú
├── container.ts # Registro de dependencias con Awilix
└── index.ts    # Punto de entrada
```

## Inyección de dependencias con Awilix

El archivo `src/container.ts` es el lugar donde se conectan las clases:

```ts
container.register({
  productRepository: asClass(ProductRepository).singleton(),
  productService: asClass(ProductService).singleton(),
  cartService: asClass(CartService).singleton(),
  shopApp: asClass(ShopApp).singleton()
});
```

`ProductService` recibe `productRepository`; `CartService` recibe `productService`; y `ShopApp` recibe `cartService` y `productService`. Las clases dependen de los contratos `IProductRepository`, `IProductService` e `ICartService`, no de implementaciones concretas. Esto evita crear dependencias con `new` dentro de las clases, facilita cambiar implementaciones y hace las pruebas más simples. `singleton()` indica que Awilix reutiliza una sola instancia durante la ejecución.

> Las interfaces solo existen durante el desarrollo con TypeScript. En ejecución, Awilix usa los nombres de los parámetros y registros (`productRepository`, `productService` y `cartService`) para inyectar las implementaciones.

## Flujo de la aplicación

```text
index.ts
   │ resuelve la aplicación con Awilix
   ▼
ShopApp
   ├── muestra el menú y espera la opción del usuario
   ├── usa ProductService para consultar productos
   └── usa CartService para agregar, mostrar y finalizar la compra
            │
            ▼
       ProductService
            │
            ▼
       ProductRepository
            │
            ▼
         catálogo
```

Al escoger **Agregar producto**, el flujo es: `ShopApp` → `CartService` → `ProductService` → `ProductRepository`. Si el producto existe, `CartService` lo agrega al carrito y lo devuelve a la aplicación.

## Operaciones asíncronas

Todos los contratos del repositorio y los servicios devuelven `Promise`. Por eso la aplicación usa `async` y `await`:

```ts
const products = await this.productService.getProducts();
const product = await this.cartService.addProductById(productId);
```

El catálogo actual está en memoria y responde de inmediato, pero esta estructura permite reemplazar el repositorio después por una base de datos o una API sin cambiar el flujo de la aplicación.

## Menú

1. Ver productos.
2. Agregar producto al carrito.
3. Ver carrito y total.
4. Finalizar compra.
5. Salir.
