import { Page } from '@playwright/test';

export class SeatSelectionPage {
  constructor(private page: Page) {}

  async selectAvailableSeat() {
    await this.page.waitForSelector('[id^="seat-container-"]');

    const seats = await this.page.evaluate(() => {
      const seatElements = document.querySelectorAll('[id^="seat-container-"]');
      return Array.from(seatElements).map((seat) => {
        const computedStyle = window.getComputedStyle(seat);
        const pElement = seat.querySelector('p');
        const pColor = pElement ? window.getComputedStyle(pElement).color : null;

        return {
          id: seat.id,
          opacity: computedStyle.opacity,
          seatColor: pColor,
        };
      });
    });

    for (const seat of seats) {
      if (
        seat.opacity === '1' &&
        (seat.seatColor === 'rgb(66, 135, 245)' || seat.seatColor === 'rgb(0, 67, 193)')
      ) {
        await this.page.click(`#${seat.id}`);
        break;
      }
    }
  }

  async clickNextButton() {
    await this.page.click('#buttonNextView');
  }
}
