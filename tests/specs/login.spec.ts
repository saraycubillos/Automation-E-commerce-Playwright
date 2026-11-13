import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

// Casos de login inválido: usuario, contraseña y mensaje esperado
const casosInvalidos = [
  {
    descripcion: 'usuario bloqueado',
    usuario: 'locked_out_user',
    password: 'secret_sauce',
    mensajeEsperado: 'Sorry, this user has been locked out'
  },
  {
    descripcion: 'usuario no existente',
    usuario: 'incorrect_creditials',
    password: 'secret_sauce',
    mensajeEsperado: 'Username and password do not match any user in this service'
  },
  {
    descripcion: 'campos de login vacíos',
    usuario: '',
    password: '',
    mensajeEsperado: 'Username is required'
  },
];

// Bucle que genera un test por cada caso
for (const caso of casosInvalidos) {
  test(`no debería permitir login con ${caso.descripcion}`, async ({ page }) => {
    // Crea la instancia de la página de login
    const loginPage = new LoginPage(page);

    // Navega e intenta el login con los datos del caso
    await loginPage.ir();
    await loginPage.login(caso.usuario, caso.password);

    // Verifica que aparece el mensaje de error esperado
    await expect(loginPage.mensajeError).toContainText(caso.mensajeEsperado);
  });
}