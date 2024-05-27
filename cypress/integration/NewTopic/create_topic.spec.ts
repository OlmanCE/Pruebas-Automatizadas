// cypress/integration/create_topic.spec.ts
import testCases from '../../fixtures/testCases.json';
import { login, createNewTopic, goToTopicsView } from '../../support/utils';

describe('Create New Topic Test', () => {
  beforeEach(() => {
    // Realizar el login antes de cada caso de prueba
    login();
    goToTopicsView();
  });

  testCases.forEach((testCase, index) => {
    it(`Test Case ${index + 1}: ${testCase.valid ? 'Valid' : 'Invalid'} case`, () => {
      createNewTopic(testCase.title, testCase.content, testCase.categories);
      if (testCase.valid) {
        cy.wait(8000); 
        cy.contains(testCase.title).should('be.visible');
        cy.log('Topic created successfully');
      } else {
        cy.wait(2000);
        cy.contains(testCase.errorMessage).should('be.visible');
        cy.reload();
      }
    });
  });
});
