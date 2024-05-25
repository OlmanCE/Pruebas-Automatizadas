import * as dotenv from 'dotenv';

dotenv.config();

export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  // Aquí puedes incluir cualquier otra configuración de plugins que necesites
  return config;
};
