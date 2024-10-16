import { Page, FrameLocator } from '@playwright/test';

export class PaymentGatewayPage {
  private page: Page;
  private iframeLocator: FrameLocator;
  
  constructor(page: Page) {
    this.page = page;
    // Localizar el iframe del pago
    this.iframeLocator = this.page.frameLocator('#modalPayNearMeContent iframe');
  }

  // Método para confirmar que estamos dentro del iframe de la pasarela de pago
    async verifyPaymentIframe() {
        await this.iframeLocator.locator('body').waitFor();  // Espera un elemento dentro del iframe
        console.log('Se ha accedido al iframe de la pasarela de pago.');
    }

  // Método que maneja la interacción hasta la confirmación
  async confirmPurchase() {
    await this.page.locator('.checkboxForm__box').click();
    await this.page.getByRole('button', { name: 'Confirmar compra' }).click();
  }

  // Método para hacer clic en el botón "Pagar con Tarjeta de Débito"
  async payWithDebitCard() {
    await this.page.locator('button:has-text("Pagar con Tarjeta de Débito")').click();
  }
}
