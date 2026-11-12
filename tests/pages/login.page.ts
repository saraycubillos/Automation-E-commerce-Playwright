import { Page, Locator } from '@playwright/test';

// Clase que representa la página de login de SauceDemo
export class LoginPage {
  readonly page: Page;
  readonly inputUsuario: Locator;
  readonly inputPassword: Locator;
  readonly botonLogin: Locator;

  // Constructor que recibe la página y define los locators
  constructor(page: Page) {
    this.page = page;
    this.inputUsuario = page.locator('[data-test="username"]');
    this.inputPassword = page.locator('[data-test="password"]');
    this.botonLogin = page.locator('[data-test="login-button"]');
  }

  // Navega a la URL de login
  async ir() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // Ejecuta el login con usuario y contraseña
  async login(usuario: string, password: string) {
    await this.inputUsuario.fill(usuario);
    await this.inputPassword.fill(password);
    await this.botonLogin.click();
  }
}