// cypress/integration/create_topic.spec.ts
import NewMessageTest from '../../fixtures/NewMessagesTests.json';
import { login, createNewMessage } from '../../support/utils';

describe('Create New Message', () => {
  //before(() => {
    //login();
  //});

  beforeEach(() => {
    // Realizar el login antes de cada caso de prueba
    login();
    //cy.visit('http://192.168.43.220/latest');
  });

  NewMessageTest.forEach((testCase, index) => {
    it(`Test Case ${index + 1}: ${testCase.valid ? 'Valid' : 'Invalid'} case (${testCase.errorMessage && true})` , () => {
      createNewMessage(testCase.users, testCase.title, testCase.body);
      if (testCase.valid) {
        cy.wait(10000); 
        cy.contains(testCase.title).should('be.visible'); //contains(testCase.title).should('be.visible');
      } 
      else {
         cy.wait(2000);
         cy.contains(testCase.errorMessage).should('be.visible');
         cy.reload();
      }
    });
  });

  afterEach(() => {
    cy.reload();
  })
});
