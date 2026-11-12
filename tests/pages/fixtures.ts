import { test as base } from '@playwright/test';
import { LoginPage } from './login.page';
import { InventoryPage } from './inventory.page';
import { CartPage } from './cart.page';

// Define los tipos de los fixtures nuevos
type MisFixtures = {
  inventoryPage: InventoryPage;
  cartPage: CartPage;
};

// Extiende el "test" base de Playwright con fixtures propios
export const test = base.extend<MisFixtures>({
  // Fixture que hace login automáticamente y entrega la página de inventario lista
  inventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.ir();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  // Fixture que entrega la página del carrito, ya lista
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
});

export { expect } from '@playwright/test';