// cypress/integration/create_topic.spec.ts
import NewMessageTest from '../../fixtures/NewMessagesTests.json';
import { login, createNewMessage } from '../../support/utils';

describe('Create New Message', () => {

  beforeEach(() => {
    // Realizar el login antes de cada caso de prueba
    login();
  });

  NewMessageTest.forEach((testCase, index) => {
    it(`Test Case ${index + 1}: ${testCase.valid ? 'Valid' : 'Invalid'} case (${testCase.errorMessage})` , () => {
      createNewMessage(testCase.users, testCase.title, testCase.body);
      cy.wait(4000);
      cy.get('body').then($body => {
        if ($body.find('button:contains("Ignore")').length > 0) {
          cy.get('button:contains("Ignore")').click();      
        }
      });
      if (testCase.valid) {
        cy.wait(10000); 
        cy.contains(testCase.title).should('be.visible'); 
      } 
      else {
         cy.wait(2000);
         cy.contains(testCase.errorMessage).should('be.visible');
         cy.reload();
      }
    });
  });

  // afterEach(() => {
  //   cy.reload();
  // })
});
