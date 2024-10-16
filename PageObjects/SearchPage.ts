import { Page } from '@playwright/test';

export class SearchPage {
  constructor(private page: Page) {}

  async selectOrigin(origin: string) {
    await this.page.getByPlaceholder('Tu origen').click();
    await this.page.locator('li').filter({ hasText: origin }).click();
  }

  async selectDestination(destination: string) {
    await this.page.locator('li').filter({ hasText: destination }).click();
  }

  async searchTravel() {
    await this.page.locator('#button-search-travel').click();
  }

  async acceptModal() {
    const modal = this.page.locator('#modal-root div.sc-3aafa1c6-1.eQAEdj');
    await modal.waitFor({ state: 'visible' });
    await this.page.getByRole('button', { name: 'Aceptar' }).click();
  }

  async selectRoundTrip() {
    await this.page.getByLabel('Ida y vuelta').check();
  }

  async setDepartureDate(departureDate: string) {
    await this.page.locator('#initDate').click();
    await this.page.getByLabel(`Choose ${departureDate}`).click(); // Ejemplo: 'Choose Miércoles Octubre 23 of'
  }

  async setReturnDate(returnDate: string) {
    await this.page.locator('input[name="endDate"].input-date-search-travel').click();
    await this.page.getByLabel(`Choose ${returnDate}`).click(); // Ejemplo: 'Choose Miércoles Octubre 30 of'
  }

  async setNumberpassenger()
  {
    await this.page.locator('#numericInput').click();

  }
}

