import { test, expect } from './pages/fixtures';

const productos = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt'
];

for (const nombreProducto of productos) {
  // Ya no instancias LoginPage ni haces login manualmente - el fixture ya lo hizo
  test(`debería agregar ${nombreProducto} al carrito`, async ({ page, inventoryPage, cartPage }) => {
    // Verifica que la página de productos cargó
    await expect(page.getByText('Products')).toBeVisible();

    // Guarda el precio del producto en el PLP
    const precioEnPLP = await inventoryPage.obtenerPrecio(nombreProducto);

    // Verifica que el precio del PLP no sea null
    if (!precioEnPLP) {
      throw new Error('No se pudo obtener el precio del producto en el PLP');
    }

    // Agrega el producto al carrito
    await inventoryPage.agregarAlCarrito(nombreProducto);

    // Verifica que el contador del carrito muestra "1"
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Navega al carrito
    await page.locator('.shopping_cart_link').click();

    // Verifica nombre y precio en el carrito
    await expect(cartPage.nombreProducto(nombreProducto)).toBeVisible();
    await expect(cartPage.precioProducto(nombreProducto)).toHaveText(precioEnPLP);
  });
}