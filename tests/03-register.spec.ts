import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../PageObjects/Register';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
  await page.goto('https://webtec.tornadobus.com/register?lang=es');

});

test('Registro de cuenta con datos aleatorios', async ({ page }) => {
    const registration = new RegistrationPage(page);
  
    // Generar datos de prueba usando Faker
    const firstName = faker.name.firstName();          // Nombre aleatorio
    const lastName = faker.name.lastName();            // Apellido aleatorio
    const username = faker.internet.userName();        // Usuario aleatorio
    const birthDate = faker.date.birthdate({ min: 18, max: 50, mode: 'age' }).toISOString().split('T')[0]; // Fecha de nacimiento aleatoria
    const gender = 'Male';            
    const email = faker.internet.email();              // Correo electrónico aleatorio
    const phone = faker.phone.number({ style: 'national' });     // Número de teléfono aleatorio
    const password = faker.internet.password({length:6});       // Contraseña aleatoria
    //const password2= faker.internet.password({length:6})
  
    // Llenar el formulario de registro usando Faker
    await registration.fillRegistrationForm(
      firstName,     // Nombres
      lastName,      // Apellidos
      username,      // Usuario
      birthDate,     // Fecha de nacimiento
      gender === 'Male' ? 'Male' : 'Female', // Género
      email,         // Correo electrónico
      phone,         // Teléfono
      password,
      password       // Contraseña
    );
    await page.getByRole('button', { name: 'Iniciar sesion' }).click();
    // Verificar que el modal de confirmación contiene el texto esperado
  const confirmationModal = page.locator('[id="headlessui-dialog-panel-\\:rc\\:"]');
  
  // Verifica que el modal es visible
  await expect(confirmationModal).toBeVisible();
  
  // Verificar el contenido de texto del modal
  await expect(confirmationModal).toContainText('Registro Exitoso');
  await expect(confirmationModal).toContainText('Se ha enviado un correo de confirmación a tu correo electrónico.');
  await expect(confirmationModal).toContainText('Por favor, revisa tu bandeja de entrada.');
  


  });


  test('Validar mensaje de error cuando el nombre está vacío', async ({ page }) => {
    const registration = new RegistrationPage(page);
  
    // Generar datos de prueba
    const lastName = faker.name.lastName();
    const username = faker.internet.userName();
    const birthDate = faker.date.birthdate({ min: 24, max: 50, mode: 'age' }).toISOString().split('T')[0];
    const gender = 'Male';
    const email = faker.internet.email();
    const phone = faker.phone.number({ style: 'national' });
    const password = faker.internet.password({length:6});
  
    // Llenar el formulario dejando el campo "Nombres" vacío
    await registration.fillRegistrationForm('', lastName, username, birthDate, gender, email, phone, password, password);
    
    // Verificar que el mensaje de error aparece para "Nombres"
    const errorMessage = page.locator('.sc-ce411525-3.esfwJc').first();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('* El campo es requerido');
  });
  
  test('Validar mensaje de error cuando el apellido está vacío', async ({ page }) => {
    const registration = new RegistrationPage(page);
  
    // Generar datos de prueba
    const firstName = faker.name.firstName();
    const username = faker.internet.userName();
    const birthDate = faker.date.birthdate({ min: 24, max: 50, mode: 'age' }).toISOString().split('T')[0];
    const gender = 'Male';
    const email = faker.internet.email();
    const phone = faker.phone.number({ style: 'national' });
    const password = faker.internet.password({length:6});
  
    // Llenar el formulario dejando el campo "Apellidos" vacío
    await registration.fillRegistrationForm(firstName, '', username, birthDate, gender, email, phone, password, password);
      
    // Verificar que el mensaje de error aparece para "Apellidos"
    const errorMessage = page.locator('.sc-ce411525-3.esfwJc'); // El segundo mensaje de error para "Apellidos"
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('* El campo es requerido');
  });
 

test('Validar mensaje de error cuando el usuario está vacío', async ({ page }) => {
  const registration = new RegistrationPage(page);

  // Generar datos de prueba
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const birthDate = faker.date.birthdate({ min: 24, max: 50, mode: 'age' }).toISOString().split('T')[0];
  const gender = 'Male';
  const email = faker.internet.email();
  const phone = faker.phone.number({ style: 'national' });
  const password = faker.internet.password({ length: 6 });

  // Llenar el formulario dejando el campo "Usuario" vacío
  await registration.fillRegistrationForm(firstName, lastName, '', birthDate, gender, email, phone, password, password);


  // Verificar que el mensaje de error aparece para "Usuario"
  const errorMessage = page.locator('.sc-ce411525-3.esfwJc').first();
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('* El campo es requerido');
});

test('Validar mensaje de error cuando el correo electrónico está vacío', async ({ page }) => {
  const registration = new RegistrationPage(page);

  // Generar datos de prueba
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const username = faker.internet.userName();
  const birthDate = faker.date.birthdate({ min: 24, max: 50, mode: 'age' }).toISOString().split('T')[0];
  const gender = 'Male';
  const phone = faker.phone.number({ style: 'national' });
  const password = faker.internet.password({ length: 6 });

  // Llenar el formulario dejando el campo "Correo electrónico" vacío
  await registration.fillRegistrationForm(firstName, lastName, username, birthDate, gender, '', phone, password, password);

  // Verificar que el mensaje de error aparece para "Correo electrónico"
  const errorMessage = page.locator('.sc-ce411525-3.esfwJc').first();
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('* El campo es requerido');
});

test('Validar mensaje de error cuando el teléfono está vacío', async ({ page }) => {
  const registration = new RegistrationPage(page);

  // Generar datos de prueba
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const username = faker.internet.userName();
  const birthDate = faker.date.birthdate({ min: 24, max: 50, mode: 'age' }).toISOString().split('T')[0];
  const gender = 'Male';
  const email = faker.internet.email();
  const password = faker.internet.password({ length: 6 });

  // Llenar el formulario dejando el campo "Teléfono" vacío
  await registration.fillRegistrationForm(firstName, lastName, username, birthDate, gender, email, '', password, password);

  // Verificar que el mensaje de error aparece para "Teléfono"
  const errorMessage = page.locator('.sc-ce411525-3.esfwJc').first();
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('* El campo es requerido');
});

test('Validar mensaje de error cuando la contraseña está vacía', async ({ page }) => {
  const registration = new RegistrationPage(page);

  // Generar datos de prueba
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const username = faker.internet.userName();
  const birthDate = faker.date.birthdate({ min: 24, max: 50, mode: 'age' }).toISOString().split('T')[0];
  const gender = 'Male';
  const email = faker.internet.email();
  const phone = faker.phone.number({ style: 'national' });

  // Llenar el formulario dejando el campo "Contraseña" vacío
  await registration.fillRegistrationForm(firstName, lastName, username, birthDate, gender, email, phone, '', '');

  // Verificar que el mensaje de error aparece para "Contraseña"
  const errorMessage = page.locator('.sc-ce411525-3.esfwJc').first();
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('* El campo es requerido');
});
