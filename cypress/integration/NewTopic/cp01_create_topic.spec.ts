
describe('CP01 - Create New Topic Test', () => {
  it('Should log in and create a valid new topic', () => {
    // Visitar la página de Discourse
    cy.visit('http://192.168.1.3/latest');

    // Hacer clic en el botón de "Log In"
    cy.contains('Log In').click();

    // Ingresar el nombre de usuario y la contraseña
    cy.get('#login-account-name').type('user');
    cy.get('#login-account-password').type('HWvTMd6Hha@I');

    // Hacer clic en el botón de iniciar sesión usando el XPath obteniud
    cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/button[1]/span').click();

    // Esperar que el botón "New Topic" esté visible y hacer clic en él
    cy.contains('New Topic').should('be.visible').click();

    // Validar el título del tema con longitud válida (entre 15 y 255 caracteres)
    const validTitle = 'Este es un título correcto para el tema';
    cy.get('input[id="reply-title"]').type(validTitle);

    // Validar el contenido del tema con longitud válida (entre 20 y 32000 caracteres)
    const validContent = 'Este es un cuerpo válido para el contenido, además puede contener imágenes, links, elementos de listas, e incluso HTML.';
    cy.get('textarea[id="ember71"]').type(validContent);



    // Validar etiquetas válidas
    // Abrir el desplegable de categorías y seleccionar etiquetas válidas
    cy.get('.category-input summary').click(); // Abrir el desplegable de categorías

    // Seleccionar la categoría "General"
    cy.get('div[role="menuitemradio"][data-name="General"]').click();

    // Seleccionar la categoría "Staff"
    cy.get('.category-input summary').click(); // Volver a abrir el desplegable de categorías
    cy.get('div[role="menuitemradio"][data-name="Staff"]').click();

    // Seleccionar la categoría "Site Feedback"
    cy.get('.category-input summary').click(); // Volver a abrir el desplegable de categorías
    cy.get('div[role="menuitemradio"][data-name="Site Feedback"]').click();


    // Enviar el nuevo tema
    cy.get('.btn-primary.create').click();

    // Validar que el tema se ha creado correctamente (puedes ajustar esto según el comportamiento esperado)
    cy.contains(validTitle).should('be.visible');
  });
});
