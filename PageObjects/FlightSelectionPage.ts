import { Page } from '@playwright/test';

export class FlightSelectionPage {
  constructor(private page: Page) {}

  async selectFirstFlight() {
    const travelItemContainer = this.page.locator('article.travel-item-container').first();
    await travelItemContainer.waitFor({ state: 'visible' });
    const botonSeleccionar = travelItemContainer.locator('button:has-text("Seleccionar")');
    await botonSeleccionar.click();
  }

  async selectSecondFlight() {

    await this.page.getByRole('button', { name: 'Seleccionar' }).click();

  }


  async getConnectionCount(): Promise<number> {
    const conexiones = this.page.locator('.chip-connection-travel p');
    return conexiones.count();
  }
}
