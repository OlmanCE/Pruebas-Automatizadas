import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.username = "user";
      config.env.password = "HWvTMd6Hha@I";

      return config;
    },
    // Otros parámetros de configuración pueden ir aquí
    specPattern: 'cypress/integration/**/*.ts', // Ajusta el patrón de búsqueda de archivos de prueba
  },
});
