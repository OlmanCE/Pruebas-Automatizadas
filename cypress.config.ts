import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implementar los event listeners de Node, de ser necesario
    },
    specPattern: 'cypress/integration/**/*.ts', // Ruta a archivos de pruebas
    supportFile: 'cypress/support/e2e.ts', // Archivo de soporte
  },
});
