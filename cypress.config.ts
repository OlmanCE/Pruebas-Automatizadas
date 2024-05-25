import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Cargar configuración del archivo de plugins
      require('./plugins/index').default(on, config);
    },
    specPattern: 'cypress/integration/**/*.ts', // Ruta a archivos de pruebas
    supportFile: 'cypress/support/e2e.ts', // Archivo de soporte
  },
});
