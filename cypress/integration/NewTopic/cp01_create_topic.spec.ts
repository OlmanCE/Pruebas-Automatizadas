describe('Create New Topic Test', () => {
  const baseUrl = 'http://192.168.1.3/latest';
  const username = 'user';
  const password = 'HWvTMd6Hha@I';

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.contains('Log In').click();
    cy.get('#login-account-name').type(username);
    cy.get('#login-account-password').type(password);
    cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/button[1]/span').click();
  });

  const testCases = [
    {
      title: 'Este es un título correcto para el tema',
      content: 'Este es un cuerpo válido para el contenido, además puede contener imágenes, links, elementos de listas, e incluso HTML.',
      categories: ['General', 'Staff', 'Site Feedback'],
      valid: true
    },
    {
      title: 'A',
      content: 'Hola',
      categories: ['General'],
      valid: false
    },
    {
      title: 'Título largo'.repeat(25),
      content: 'Contenido largo'.repeat(1000),
      categories: ['General', 'Staff'],
      valid: true
    },
    // Agrega más casos de prueba según sea necesario
  ];

  testCases.forEach((testCase, index) => {
    it(`Should create new topic - Case ${index + 1}`, () => {
      cy.contains('New Topic').should('be.visible').click();
      cy.get('input[id="reply-title"]').type(testCase.title);
      cy.get('textarea[id="ember72"]').type(testCase.content);

      testCase.categories.forEach(category => {
        cy.get('.category-input summary').click();
        cy.get(`div[role="menuitemradio"][data-name="${category}"]`).click();
      });

      cy.get('.btn-primary.create').click();

      if (testCase.valid) {
        cy.contains(testCase.title).should('be.visible');
      } else {
        cy.contains('There was an error').should('be.visible');
      }
      cy.wait(6000);
    });
  });
});
