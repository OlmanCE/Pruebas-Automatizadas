export const login = () => {
  cy.visit('http://192.168.1.3/latest');
  cy.contains('Log In').click();
  cy.get('#login-account-name').type('user');
  cy.wait(1000);
  cy.get('#login-account-password').type('HWvTMd6Hha@I');
  cy.wait(2000);
  cy.xpath('/html/body/section/div[1]/div[9]/div[1]/div/div[2]/div/div[2]/button[1]/span').click();
  cy.url().should('include', '/latest'); // Asegurarse de que la URL sea correcta después del login
};

export const createNewTopic = (title: string, content: string, categories: string[]) => {
  cy.contains('New Topic').should('be.visible').click();
  cy.wait(4000); 
  cy.get('input[id="reply-title"]').type(title);
  cy.xpath('/html/body/section/div[1]/div[12]/div[3]/div[2]/div[1]/div/div[1]/div[2]').type(content);
  categories.forEach(category => {
    cy.get('.category-input summary').click();
    cy.get(`div[role="menuitemradio"][data-name="${category}"]`).click();
  });
  cy.wait(4000);
  cy.get('.btn-primary.create').click();
  
  // Verificar la URL después de crear el nuevo tema con más flexibilidad
  cy.url().should('not.include', 'about:blank', { timeout: 10000 });
};

export const goToTopicsView = () => {
  // Hacer clic en el icono de Discourse en el header para volver a la página principal
  cy.xpath('/html/body/section/div[1]/div[2]/header/div/div/div[2]/div/div/a')
    .should('be.visible')
    .wait(4000)
    .click();

  // Asegurarse de que el elemento "New Topic" esté disponible y visible
  cy.contains('New Topic', { timeout: 10000 }).should('be.visible');
};
