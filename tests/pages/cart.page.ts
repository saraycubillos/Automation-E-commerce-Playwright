///Crea la clase CartPage (para la página del carrito) con un método nombreProducto() que devuelva el locator del nombre del producto, y un método precioProducto() que devuelva su precio. Luego intégrala al test para que también verifique, usando el patrón de clases, que el nombre y precio coinciden entre el PLP y el carrito (como hacíamos antes, pero ahora con POM).///
import { Page, Locator } from '@playwright/test';
export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Localiza el ítem del carrito por nombre de producto
  private itemProducto(nombreProducto: string): Locator {
    return this.page.locator('[data-test="inventory-item"]')
      .filter({ hasText: nombreProducto });
  }

  nombreProducto(nombreProducto: string): Locator {
    return this.itemProducto(nombreProducto).locator('[data-test="inventory-item-name"]');
  }

  precioProducto(nombreProducto: string): Locator {
    return this.itemProducto(nombreProducto).locator('[data-test="inventory-item-price"]');
  }
}