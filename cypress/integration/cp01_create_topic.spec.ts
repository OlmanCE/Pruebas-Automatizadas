describe('CP01 - Create New Topic Test', () => {
    it('Should log in and create a valid new topic', () => {
      cy.visit('http://192.168.1.3/latest');
      cy.contains('Log In').click();
      cy.get('#login-account-name').type(Cypress.env('USERNAME'));
      cy.get('#login-account-password').type(Cypress.env('PASSWORD'));
      cy.get('.login-button').click(); // Asumiendo que el botón tiene una clase 'login-button'
  
      cy.contains('New Topic').should('be.visible').click();
      const validTitle = 'Este es un título correcto para el tema';
      cy.get('#reply-title').type(validTitle);
      const validContent = 'Este es un cuerpo válido para el contenido.';
      cy.get('textarea#ember70').type(validContent);
  
      // Uso de selectores más específicos y robustos
      cy.get('.category-input').within(() => {
        cy.get('summary').click();
        cy.get('[data-name="General"]').click();
        cy.get('summary').click();
        cy.get('[data-name="Staff"]').click();
      });
  
      cy.get('.btn-primary.create').click(); // Selector corregido
      cy.contains(validTitle).should('be.visible');
    });
  });
  