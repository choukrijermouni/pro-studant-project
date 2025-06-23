/* global cy */
/// <reference types="cypress" />

import { affectLicenseUrl } from '../settings'

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

  it('should affect monthly license', () => {
    cy.intercept('POST', affectLicenseUrl).as('affectLicense')
    cy.get('[data-test="Mensuel-license-button"]').should('be.visible').click()
    cy.get('[data-test="license-agreement-checkbox"]').check()
    cy.get('[data-test="affect-license-button"]').click()
    cy.wait('@affectLicense').its('response.statusCode').should('eq', 200)
    cy.get('[data-test="Notification"]').should('be.visible').contains('succès')
  })

  it('should affect annual license with quantities', () => {
    cy.intercept('POST', affectLicenseUrl).as('affectLicense')
    cy.get('[data-test="Annuel-license-button"]').should('be.visible').click()
    cy.get('[data-test="quantity-select-list"]').click()
    cy.get('[data-test="quantity-select-list-suggestion-item"]').eq(2).click()
    cy.get('[data-test="affect-license-button"]').click()
    cy.wait('@affectLicense').its('response.statusCode').should('eq', 200)
    cy.get('[data-test="Notification"]').should('be.visible').contains('succès')
  })

  it('should affect trial license with quantities', () => {
    cy.intercept('POST', affectLicenseUrl).as('affectLicense')
    cy.get('[data-test="Essai-license-button"]').should('be.visible').click()
    cy.get('[data-test="quantity-select-list"]').click()
    cy.get('[data-test="quantity-select-list-suggestion-item"]').eq(1).click()
    cy.get('[data-test="affect-license-button"]').click()
    cy.wait('@affectLicense').its('response.statusCode').should('eq', 200)
    cy.get('[data-test="Notification"]').should('be.visible').contains('succès')
  })
})
