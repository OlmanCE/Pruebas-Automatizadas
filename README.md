# Proyecto de Automatización de Pruebas con Cypress para Discourse Bitnami

## Descripción

Este proyecto utiliza Cypress para la automatización de pruebas de caja negra en página web generada localmente de Discourse Bitnami. El objetivo es asegurar la funcionalidad y estabilidad de la plataforma a través de pruebas automatizadas que simulan el comportamiento del usuario final.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) (generalmente se instala con Node.js)
- [Cypress](https://www.cypress.io/) (versión 13.0.0 o superior)
- Tener una máquina virtual con la instancia de bitnami y levantar el servidor localmente

## Instalación

1. Clona este repositorio en tu máquina local:
    ```bash
    git clone https://github.com/OlmanCE/Pruebas-Automatizadas
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd Pruebas-Automatizadas
    ```
3. Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

## Configuración

Antes de ejecutar las pruebas, necesitas configurar la URL de tu instancia local de Discourse Bitnami. edita los archivos con la dirección que te brinde la maquina virtual

1. Además tienes que colocar las credenciales que te de la maquina virtual
    ```bash
    cy.get('#login-account-password').type('YOUR_PASSWORD');
    ```
 2. De igual forma acá
    ```bash
    config.env.password = "YOUR_PASSWORD";
    ```
## Run

1. Para iniciar cypress
    ```bash
    npx cypress open
    ```
    Eliges E2E Testing y selecionas un navegador
   
   Ahora puedes elegir los test existentes
