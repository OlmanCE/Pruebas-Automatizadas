import { use } from "chai";

export const login = () => {
  //cy.visit('http://192.168.1.3/latest');
  cy.visit('http://192.168.43.220/latest');
  cy.contains('Log In').click();
  cy.get('#login-account-name').type('user');
  cy.wait(1000);
  //cy.get('#login-account-password').type('HWvTMd6Hha@I');
  cy.get('#login-account-password').type('pwJ.Su5rQmNr');
  cy.wait(8000);
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

export const createNewMessage = (users: string, title: string, body: string) => {
  //--------------------------Abrir el panel de nuevo mensaje---------------------------------
  cy.get('button.sidebar-section-header-button[title="Create a personal message"]').click()
  cy.wait(4000); 

  cy.get('body').then($body => {
    if ($body.find('button:contains("Discard")').length > 0) {
      cy.get('button:contains("Discard")').click();
    }
  });
  //--------------------------Ingresar titulo---------------------------------
  if(title == '212'){  //Si el titulo debe de tener mas de 212 caracteres
    title = 'a'.repeat(212) + 'b'
  }
  cy.get('input[id="reply-title"]').invoke('val',title).trigger('input');
  //--------------------------Ingresar cuerpo del mensaje---------------------------------
  if(body == '32000'){ //Si el cuerpo debe de tener mas de 32000 caracteres
    body = '1234567890'.repeat(3200) + '1'
  }
  cy.get('textarea[aria-label="Type here. Use Markdown, BBCode, or HTML to format. Drag or paste images."]')
  .invoke('val',body).trigger('input'); 

  cy.get('body').then($body => {
    if ($body.find('button:contains("Ignore")').length > 0) {
      cy.get('button:contains("Ignore")').click();
    }
  });
  //--------------------------Ingresar usuario---------------------------------
  if(users == "discobot"){
    cy.get('div.ember-view.users-input').click()
    cy.get('input.ember-text-field.ember-view.filter-input').type(users)
    cy.wait(4000);
    cy.get('body').then($body => {
      if ($body.find('button:contains("Ignore")').length > 0) {
        cy.get('button:contains("Ignore")').click();
        cy.get('div.ember-view.users-input').click()
        cy.get('input.ember-text-field.ember-view.filter-input').type(users)
        cy.wait(4000);
      }
    });
    cy.get('li.select-kit-row.email-group-user-chooser-row.is-highlighted.ember-view[data-name="discobot"]').click();
    cy.wait(4000);
  }
  else if(users == ""){
    cy.wait(4000);
    cy.get('body').then($body => {
      if ($body.find('button:contains("Ignore")').length > 0) {
        cy.get('button:contains("Ignore")').click();      
      }
    });
  }
  else{
    cy.get('div.ember-view.users-input').click()
    cy.get('input.ember-text-field.ember-view.filter-input').type(users)
    cy.wait(4000);
    cy.get('body').then($body => {
      if ($body.find('button:contains("Ignore")').length > 0) {
        cy.get('button:contains("Ignore")').click();      
        cy.get('div.ember-view.users-input').click()
        cy.get('input.ember-text-field.ember-view.filter-input').type(users)
        cy.wait(4000);
      }
    });
    return    
  }
  cy.wait(4000);
  cy.get('body').then($body => {
    if ($body.find('button:contains("Ignore")').length > 0) {
      cy.get('button:contains("Ignore")').click();      
    }
  });
  cy.get('button.btn.btn-icon-text.btn-primary.create').click();
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
