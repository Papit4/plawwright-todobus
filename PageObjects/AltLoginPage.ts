import { Page } from '@playwright/test';

export class AltLoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Método para ingresar el usuario
  async enterUsername(username: string) {
    await this.page.getByLabel('Ingresa tu usuario').fill(username);
  }

  // Método para ingresar la contraseña
  async enterPassword(password: string) {
    await this.page.getByLabel('Ingresa tu contrasena').fill(password);
  }

  // Método para hacer clic en el botón de ingresar
  async clickLoginButton() {
    await this.page.getByRole('button', { name: 'Ingresar' }).click();
  }

  // Método para obtener el mensaje de error si hay
  async getErrorMessage() {
    const errorMessage = await this.page.locator('role=status');
    return errorMessage.textContent();
  }
}
