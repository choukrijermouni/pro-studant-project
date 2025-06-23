/* global cy */
/// <reference types="cypress" />

import { removeLearnerUrl } from '../settings'

describe('Learner profile page', () => {
  before(() => {
    cy.visit('/')
    cy.wait(10000)
    cy.visit('/apprenants')
  })

  beforeEach(() => {
    cy.restoreLocalStorageCache()
  })

  afterEach(() => {
    cy.saveLocalStorageCache()
  })

  it('should assert at least one learner is displayed and click the first one', () => {
    cy.get('[data-test="learner-card"]').should('have.length.greaterThan', 0)
    cy.get('[data-test="learner-card"]').first().click()
  })

  it('should delete the learner after the modal is opened', () => {
    cy.intercept('DELETE', removeLearnerUrl).as('removeLearner')
    cy.get('[data-test="remove-learner-button"]').click()
    cy.get('[data-test="remove-learner-modal"]').should('be.visible')
    cy.get('[data-test="confirm-remove-learner"]').click()
    cy.wait('@removeLearner').its('response.statusCode').should('eq', 200)
    cy.get('[data-test="Notification"]').should('be.visible').contains('succès')
  })
})
