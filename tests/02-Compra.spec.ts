import { test, expect } from '@playwright/test';
import { SearchPage } from '../PageObjects/SearchPage';
import { FlightSelectionPage } from '../PageObjects/FlightSelectionPage';
import { SeatSelectionPage } from '../PageObjects/SeatSelectionPage';
import { PassengerFormPage } from '../PageObjects/PassengerFormPage';
import { RandomDataGenerator } from '../PageObjects/RandomDataGenerator';
import { PaymentPage } from '../PageObjects/PaymentPage';
import { PaymentGatewayPage } from '../PageObjects/PaymentGateWayPage';
import { AltLoginPage } from '../PageObjects/AltLoginPage';

test.beforeEach(async ({ page }) => {
    await page.goto('https://webtec.tornadobus.com/');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    const loginPage = new AltLoginPage(page);

    // Llenar los campos de usuario y contraseña con datos incorrectos
    await loginPage.enterUsername('castroperezenrique472@gmail.com');
   await loginPage.enterPassword('prueba');
    await loginPage.clickLoginButton()
});

test('Compra usuario logeado solo ida' , async ({ page }) => {
    const searchPage = new SearchPage(page);
    const flightSelectionPage = new FlightSelectionPage(page);
    const seatSelectionPage = new SeatSelectionPage(page);
    const passengerFormPage = new PassengerFormPage(page);
    const paymentpage = new PaymentPage(page);
    const gatewaypage = new PaymentGatewayPage(page);
    

    // Selección de origen y destino
    await searchPage.selectOrigin('Kansas City, KS, (KS - TBC');
    await searchPage.selectDestination('San Lucas, (MICH - Abarrotes-');
    // Establecer fechas de ida y vuelta
    await searchPage.setDepartureDate('Miércoles Octubre 23 of');

    // Establecer una fecha específica    
    await searchPage.searchTravel();

    // Aserción para asegurarse de que el modal esté visible
    const modal = page.locator('#modal-root div.sc-3aafa1c6-1.eQAEdj');
    await expect(modal).toBeVisible({ timeout: 5000 });  // Tiempo de espera máximo de 5 segundos para que el modal sea visible

    await searchPage.acceptModal();

    // Selección del primer vuelo y las conexiones
    await flightSelectionPage.selectFirstFlight();
    const totalConexiones = await flightSelectionPage.getConnectionCount();

    for (let i = 0; i <= totalConexiones + 1; i++) {
        if (i === 0) {
            // Seleccionar asiento para el primer vuelo
            await seatSelectionPage.selectAvailableSeat();
            await page.waitForTimeout(1000)
            await seatSelectionPage.clickNextButton();
        } else {
            console.log(`Conexión ${i}`);
            // Añadir tiempo de espera entre selecciones de asientos para evitar que el script se ejecute demasiado rápido
            await seatSelectionPage.selectAvailableSeat();
            await page.waitForTimeout(1000)
            await seatSelectionPage.clickNextButton();
        }

        // Espera explícita para evitar la ejecución demasiado rápida
        await page.waitForTimeout(1000);  // 1 segundo de espera antes de proceder al siguiente paso
    }
    await page.waitForTimeout(3000); 
    // Generar datos aleatorios para el pasajero
    const passengerData = RandomDataGenerator.generatePassengerData();

    // Llenar el formulario de registro de pasajeros con los métodos de PassengerFormPage
    await passengerFormPage.fillPassengerName(passengerData.name);
    await passengerFormPage.fillPassengerLastName(passengerData.lastName);
    await passengerFormPage.fillPassengerAge(passengerData.age);
    await passengerFormPage.selectPassengerGender(passengerData.gender);
    await passengerFormPage.fillPassengerPhone(passengerData.phone);
    await passengerFormPage.fillPassengerEmail(passengerData.email);

    // Aceptar términos y guardar detalles
    await passengerFormPage.acceptTermsAndConditions();
    await passengerFormPage.savePassengerDetails();

    // Verificar que el nombre y apellido aparecen correctamente en la página
    const fullName = `${passengerData.name} ${passengerData.lastName}`;
    // Aserción para verificar que el mensaje de éxito (toast) es visible
    await expect(page.locator('.toast-item-container')).toHaveText('Pasajero agregado');
    await expect(page.locator('.font-medium.cursor-pointer')).toHaveText(fullName);
    await paymentpage.selectDebitCardPayment()
    await gatewaypage.payWithDebitCard()
    await gatewaypage.confirmPurchase()
    await gatewaypage.verifyPaymentIframe()

});


test('Compra usuario logeado, ida y vuelta' , async ({ page }) => {
    const searchPage = new SearchPage(page);
    const flightSelectionPage = new FlightSelectionPage(page);
    const seatSelectionPage = new SeatSelectionPage(page);
    const passengerFormPage = new PassengerFormPage(page);
    const paymentpage = new PaymentPage(page);
    const gatewaypage = new PaymentGatewayPage(page);
    
    await searchPage.selectRoundTrip()

    // Selección de origen y destino
    await searchPage.selectOrigin('Kansas City, KS, (KS - TBC');
    await searchPage.selectDestination('San Lucas, (MICH - Abarrotes-');
    
    // Establecer fechas de ida y vuelta
    await searchPage.setDepartureDate('Miércoles Octubre 23 of');
    await searchPage.setNumberpassenger()

    await searchPage.setReturnDate('Miércoles Octubre 30 of')

    // Establecer una fecha específica    
    await searchPage.searchTravel();

    // Aserción para asegurarse de que el modal esté visible
    const modal = page.locator('#modal-root div.sc-3aafa1c6-1.eQAEdj');
    await expect(modal).toBeVisible({ timeout: 5000 });  // Tiempo de espera máximo de 5 segundos para que el modal sea visible

    await searchPage.acceptModal();

    // Selección del primer vuelo y las conexiones
    await flightSelectionPage.selectFirstFlight();
    await flightSelectionPage.selectSecondFlight()
    const totalConexiones = await flightSelectionPage.getConnectionCount();

    for (let i = 0; i <= totalConexiones + 1; i++) {
        if (i === 0) {
            // Seleccionar asiento para el primer vuelo
            await seatSelectionPage.selectAvailableSeat();
            await page.waitForTimeout(1000)
            await seatSelectionPage.clickNextButton();
        } else {
            console.log(`Conexión ${i}`);
            // Añadir tiempo de espera entre selecciones de asientos para evitar que el script se ejecute demasiado rápido
            await seatSelectionPage.selectAvailableSeat();
            await page.waitForTimeout(1000)
            await seatSelectionPage.clickNextButton();
        }

        // Espera explícita para evitar la ejecución demasiado rápida
        await page.waitForTimeout(1000);  // 1 segundo de espera antes de proceder al siguiente paso
    }
    const totalConexiones2 = await flightSelectionPage.getConnectionCount();

    for (let i = 0; i <= totalConexiones2 ; i++) {
        if (i === 0) {
            // Seleccionar asiento para el primer vuelo
            await seatSelectionPage.selectAvailableSeat();
            await page.waitForTimeout(1000)
            await seatSelectionPage.clickNextButton();
        } else {
            console.log(`Conexión ${i}`);
            // Añadir tiempo de espera entre selecciones de asientos para evitar que el script se ejecute demasiado rápido
            await seatSelectionPage.selectAvailableSeat();
            await page.waitForTimeout(1000)
            await seatSelectionPage.clickNextButton();
        }

        // Espera explícita para evitar la ejecución demasiado rápida
        await page.waitForTimeout(1000);  // 1 segundo de espera antes de proceder al siguiente paso
    }
    await page.waitForTimeout(3000); 
    // Generar datos aleatorios para el pasajero
    const passengerData = RandomDataGenerator.generatePassengerData();

    // Llenar el formulario de registro de pasajeros con los métodos de PassengerFormPage
    await passengerFormPage.fillPassengerName(passengerData.name);
    await passengerFormPage.fillPassengerLastName(passengerData.lastName);
    await passengerFormPage.fillPassengerAge(passengerData.age);
    await passengerFormPage.selectPassengerGender(passengerData.gender);
    await passengerFormPage.fillPassengerPhone(passengerData.phone);
    await passengerFormPage.fillPassengerEmail(passengerData.email);

    // Aceptar términos y guardar detalles
    await passengerFormPage.acceptTermsAndConditions();
    await passengerFormPage.savePassengerDetails();

    // Verificar que el nombre y apellido aparecen correctamente en la página
    const fullName = `${passengerData.name} ${passengerData.lastName}`;
    // Aserción para verificar que el mensaje de éxito (toast) es visible
    await expect(page.locator('.toast-item-container')).toHaveText('Pasajero agregado');
    await expect(page.locator('.font-medium.cursor-pointer')).toHaveText(fullName);
    await paymentpage.selectDebitCardPayment()
    await gatewaypage.payWithDebitCard()
    await gatewaypage.confirmPurchase()
    await gatewaypage.verifyPaymentIframe()

});


test('Validación de campos requeridos en formulario de pasajero', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const flightSelectionPage = new FlightSelectionPage(page);
    const seatSelectionPage = new SeatSelectionPage(page);
    const passengerFormPage = new PassengerFormPage(page);

    // Selección de origen y destino
    await searchPage.selectOrigin('Kansas City, KS, (KS - TBC');
    await searchPage.selectDestination('San Lucas, (MICH - Abarrotes-');

    // Establecer fecha de ida
    await searchPage.setDepartureDate('Miércoles Octubre 23 of');
    
    // Ejecutar la búsqueda
    await searchPage.searchTravel();

    // Aserción para asegurarse de que el modal esté visible
    const modal = page.locator('#modal-root div.sc-3aafa1c6-1.eQAEdj');
    await expect(modal).toBeVisible({ timeout: 5000 });

    await searchPage.acceptModal();

    // Seleccionar el primer vuelo
    await flightSelectionPage.selectFirstFlight();
    const totalConexiones = await flightSelectionPage.getConnectionCount();

    // Seleccionar asientos para las conexiones
    for (let i = 0; i <= totalConexiones + 1; i++) {
        await seatSelectionPage.selectAvailableSeat();
        await page.waitForTimeout(1000);
        await seatSelectionPage.clickNextButton();
    }

    await page.waitForTimeout(2000); // Espera antes de continuar con el formulario de pasajeros

    // En este caso, no llenamos los campos, forzando la aparición de los mensajes de error
    await passengerFormPage.acceptTermsAndConditions(); // Aceptamos términos, pero no llenamos los campos
    await passengerFormPage.savePassengerDetails(); // Intentar guardar detalles

    // Recoger todos los elementos que contienen el texto "El campo es requerido"
    const errorMessages = await page.locator('p.sc-ce411525-3:has-text("* El campo es requerido")').all();

    // Validar que hay al menos 6 mensajes de error
    await expect(errorMessages.length).toBe(6);

    // Validar cada mensaje de error en el formulario
    for (const message of errorMessages) {
        await expect(message).toHaveText('* El campo es requerido');
    }

    console.log('Se validaron correctamente los mensajes de error para todos los campos requeridos');
});