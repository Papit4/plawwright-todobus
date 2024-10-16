import { Page } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}

  // Método para seleccionar el método de pago "Tarjetas de Crédito"
  async selectCreditCardPayment() {
    await this.page.locator('label').filter({ hasText: 'Tarjetas de Crédito' }).click();
  }

  // Método para seleccionar el método de pago "Tarjetas de Débito"
  async selectDebitCardPayment() {
    await this.page.locator('label').filter({ hasText: 'Tarjetas de Débito' }).click();
  }

  // Método para seleccionar el método de pago "Efectivo, Apple Pay, Google Pay, PayPal, Venmo"
  async selectCashPayment() {
    await this.page.locator('label').filter({ hasText: 'Efectivo, Apple Pay, Google Pay, Paypal, Venmo' }).click();
  }

  // Método para seleccionar "Compra ahora y paga después" - Affirm
  async selectAffirmPayment() {
    await this.page.locator('label').filter({ hasText: 'Affirm' }).click();
  }

  // Método para seleccionar "Compra ahora y paga después" - Afterpay
  async selectAfterpayPayment() {
    await this.page.locator('label').filter({ hasText: 'Afterpay' }).click();
  }

  // Método para aplicar un cupón de descuento
  async applyCoupon(couponCode: string) {
    await this.page.getByPlaceholder('Código').fill(couponCode);
    await this.page.getByRole('button', { name: 'Aplicar' }).click();
  }

  // Método para confirmar el pago (suposición de que hay un botón final)
  async confirmPayment() {
    await this.page.getByRole('button', { name: 'Continuar' }).click(); // Modificar este selector si es necesario
  }
}
