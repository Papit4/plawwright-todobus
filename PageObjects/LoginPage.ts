import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Método para ingresar el correo/usuario
  async enterUsername(username: string) {
    await this.page.getByLabel('Usuario', { exact: true }).fill(username);
  }

  // Método para ingresar la contraseña
  async enterPassword(password: string) {
    await this.page.getByLabel('Contraseña').fill(password);
  }

  // Método para hacer clic en el botón de ingresar
  async clickLoginButton() {
    await this.page.getByRole('button', { name: 'Ingresar' }).click();
  }

  // Método para obtener el mensaje de error
  async getErrorMessage() {
    const errorMessage = await this.page.waitForSelector('role=status');
    return errorMessage.textContent();
  }
}
