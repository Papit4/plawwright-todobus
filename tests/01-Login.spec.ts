import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjects/LoginPage';

test.beforeEach(async ({ page }) => {
  await page.goto('https://tornadobus.com?lang=es');


});


test('Ingresar correo y contraseña inexistentes', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Llenar los campos de usuario y contraseña con datos incorrectos
  await loginPage.enterUsername('prueba');
  await loginPage.enterPassword('prueba12');
  
  // Hacer clic en el botón de ingresar
  await loginPage.clickLoginButton();
  
  // Esperar que el mensaje de error aparezca en la página
  const errorMessage = await page.waitForSelector('role=status');

  // Asegurarse de que el mensaje de error contiene el texto correcto
  const errorText = await errorMessage.textContent();
  expect(errorText).toContain('Ups! el usuario y/o contraseña ingresada son incorrectos');
});

test('Validar mensajes de error al enviar campos vacíos', async ({ page }) => {

  // No llenar los campos de Usuario y Contraseña (dejar vacíos)
  
  // Hacer clic en el botón de ingresar sin llenar los campos
  await page.getByRole('button', { name: 'Ingresar' }).click();

  // Localizar los mensajes de error usando la clase CSS 'input-label-error'
  const errorMessages = page.locator('.input-label-error');

  // Obtener y loguear el texto de los mensajes de error
  const errorTextUsuario = await errorMessages.nth(0).textContent();
  const errorTextContrasena = await errorMessages.nth(1).textContent();

  // Loguear los mensajes en la consola para verificar el contenido
  console.log('Mensaje de error para Usuario:', errorTextUsuario);
  console.log('Mensaje de error para Contraseña:', errorTextContrasena);

  // Verificar que los mensajes de error sean visibles
  await expect(errorMessages.nth(0)).toBeVisible();
  await expect(errorMessages.nth(1)).toBeVisible();

  // Opcional: Validar el texto del mensaje de error, si lo necesitas
  await expect(errorMessages.nth(0)).toHaveText('* El campo es requerido');
  await expect(errorMessages.nth(1)).toHaveText('* El campo es requerido');
});



