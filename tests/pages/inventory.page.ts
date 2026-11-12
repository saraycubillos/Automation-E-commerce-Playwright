import { Page, Locator } from '@playwright/test';

// Clase que representa el listado de productos (PLP)
export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Localiza la tarjeta de un producto específico por nombre
  tarjetaProducto(nombreProducto: string): Locator {
    return this.page.locator('[data-test="inventory-item"]')
      .filter({ hasText: nombreProducto });
  }

  // Obtiene el precio de un producto específico
  async obtenerPrecio(nombreProducto: string): Promise<string | null> {
  return this.page.locator('[data-test="inventory-item"]')
    .filter({ hasText: nombreProducto })
    .locator('[data-test="inventory-item-price"]')
    .textContent();
}

  // Agrega un producto específico al carrito
  async agregarAlCarrito(nombreProducto: string) {
    await this.tarjetaProducto(nombreProducto)
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }
}