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

        // Eliminar draft después de caso de prueba inválido
        cy.get('button#create-topic').then(($btn) => {
          if ($btn.find('span.d-button-label:contains("Open Draft")').length > 0) {
            cy.wrap($btn).click();
            cy.wait(2000); // Esperar unos segundos para que se abra el draft
            // Verificar si aparece el diálogo
            cy.contains('Close').click();
            // Verificar si aparece el diálogo
            cy.get('body').then(($body) => {
              if ($body.find('button:contains("Discard")').length > 0) {
                cy.contains('Discard').click();
                cy.wait(2000); // Esperar unos segundos para que se complete la eliminación
              } else {
                cy.wait(2000); // Esperar unos segundos para asegurar que se elimina el draft
              }
            });
          }
        });
      }
    });
  });
});
