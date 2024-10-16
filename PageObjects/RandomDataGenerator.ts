// RandomDataGenerator.ts
import { faker } from '@faker-js/faker';

export class RandomDataGenerator {
  static generatePassengerData() {
    return {
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int({ min: 25, max: 50 }).toString(),
      phone: faker.string.numeric(9), 
      email: faker.internet.email(),
      gender: faker.helpers.arrayElement(['Masculino', 'Femenino']),
    };
  }
}
