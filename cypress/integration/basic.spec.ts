describe('Basic Functionality Test', () => {
    it('Should visit the provided IP and check for key elements', () => {
      cy.visit('http://192.168.1.101//latest'); // URL de la página
  
      // Verificar que la página contiene el título "Discourse"
      cy.get('title').should('contain', 'Discourse');
  
      // Verificar que el botón de "Log In" está presente
      cy.contains('Log In').should('be.visible');
    });
  });
  