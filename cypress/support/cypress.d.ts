/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
      xpath(selector: string, options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<Subject>;
    }
  }
  