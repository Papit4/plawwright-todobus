import { Page } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillRegistrationForm(firstName: string, lastName: string, username: string, birthDate: string, gender: string, email: string, phone: string, password1: string,
    password2:string) {
    // Llenar los campos de Nombres y Apellidos
    await this.page.getByLabel('Nombres').fill(firstName);
    await this.page.getByLabel('Apellidos').fill(lastName);
    
    // Llenar campo de Usuario
    await this.page.getByLabel('Usuario').fill(username);
    
    // Llenar la fecha de nacimiento
    await this.page.getByPlaceholder('mm/dd/yyyy').fill(birthDate);
    
    // Seleccionar género
    await this.page.getByPlaceholder('Seleccione').click();
    await this.page.locator('li').filter({ hasText: new RegExp(`^${gender}$`) }).click(); 
    
    // Llenar el campo de correo electrónico
    await this.page.getByLabel('Correo electronico').fill(email);
    
    // Llenar el número de teléfono
    await this.page.locator('input[name="phone"]').fill(phone);
    
    // Llenar y repetir la contraseña
    await this.page.getByLabel('Tu contraseña').fill(password1);
    await this.page.getByLabel('Repita su contraseña').fill(password2);
  }
}
