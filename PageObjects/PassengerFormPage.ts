import { Page } from '@playwright/test';

export class PassengerFormPage {
  constructor(private page: Page) {}

  async fillPassengerName(name: string) {
    await this.page.getByLabel('Nombre del pasajero').fill(name);
  }

  async fillPassengerLastName(lastName: string) {
    await this.page.getByLabel('Primer apellido').fill(lastName);
  }

  async fillPassengerAge(age: string) {
    await this.page.getByLabel('Edad').fill(age);
  }

  async selectPassengerGender(gender: string) {
    await this.page.getByPlaceholder('Seleccione').click();
    await this.page.locator('li').filter({ hasText: gender }).click();
  }

  async fillPassengerPhone(phone: string) {
    await this.page.locator('input[name="cellphone"]').fill(phone);
  }

  async fillPassengerEmail(email: string) {
    await this.page.getByLabel('Correo electrónico').fill(email);
  }

  async acceptTermsAndConditions() {
    await this.page.locator('.w-full > .sc-44500183-1 > .checkboxForm__box').click();
  }

  async savePassengerDetails() {
    await this.page.getByRole('button', { name: 'Guardar' }).click();
  }
}
