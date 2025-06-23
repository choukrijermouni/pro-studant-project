/* global cy */
/// <reference types="cypress" />

import { validateAffectationHistoryExcelFile } from '../utils'

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

  it('should navigate to the assignment history page ', () => {
    cy.get('[data-test="license-assignment-history"]').should('be.visible').click()
    cy.get('[data-test="affectation-history-data-table"]').should('be.visible')
  })
  it('should download the affectation history excel', () => {
    cy.get('[data-test="download-history-button"]').click()
    validateAffectationHistoryExcelFile()
  })
})
