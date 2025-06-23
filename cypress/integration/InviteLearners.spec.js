/* global cy */
/// <reference types="cypress" />

describe('Learner profile page', () => {
  before(() => {
    cy.visit('/')
    cy.wait(5000)
  })

  beforeEach(() => {
    cy.restoreLocalStorageCache()
  })

  afterEach(() => {
    cy.saveLocalStorageCache()
  })

  it('should invite one learners without license', () => {
    cy.get('[data-test="invite-learners-textArea"]').clear().type('test@test.com')
    cy.get('[data-test="open-invite-modal-modal-button"]').click()
    cy.get('[data-test="confirm-invite-button"]').click()
    cy.get('[data-test="close-modal-button"]').click()
  })
  it('should invite one learners without license to a team', () => {
    cy.get('[data-test="invite-learners-textArea"]').clear().type('testToTeam@test.com')
    cy.get('[data-test="open-invite-modal-modal-button"]').click()
    cy.get('[data-test="teams-select-list"]').should('be.visible')
    cy.get('[data-test="teams-select-list-icon"]').should('be.visible').click()
    cy.get('[data-test="suggestion-item"]').first().click()
    cy.get('[data-test="confirm-invite-button"]').click()
    cy.get('[data-test="close-modal-button"]').click()
  })
  it('should display error message if an email is repeated', () => {
    cy.get('[data-test="invite-learners-textArea"]').clear().type('test@test.com{enter}')
    cy.get('[data-test="invite-learners-textArea"]').type('test@test.com')
    cy.get('[data-test="invite-learners-textArea-error-message"]').should('be.visible')
    cy.get('[data-test="open-invite-modal-modal-button"]').should('be.disabled')
  })
  it('should invite multiple learners without license', () => {
    cy.get('[data-test="invite-learners-textArea"]').clear().type('testwithout1@test.com{enter}')
    cy.get('[data-test="invite-learners-textArea"]').type('testwithout2@test.com')
    cy.get('[data-test="open-invite-modal-modal-button"]').click()
    cy.get('[data-test="confirm-invite-button"]').click()
    cy.get('[data-test="close-modal-button"]').click()
  })
  it('should invite multiple learners without license to a team', () => {
    cy.get('[data-test="invite-learners-textArea"]').clear().type('testwithout1@test.com{enter}')
    cy.get('[data-test="invite-learners-textArea"]').type('testwithout2@test.com')
    cy.get('[data-test="open-invite-modal-modal-button"]').click()
    cy.get('[data-test="teams-select-list"]').should('be.visible')
    cy.get('[data-test="teams-select-list-icon"]').should('be.visible').click()
    cy.get('[data-test="suggestion-item"]').first().click()
    cy.get('[data-test="confirm-invite-button"]').click()
    cy.get('[data-test="close-modal-button"]').click()
  })
  it('should invite multiple learners with trial license', () => {
    cy.get('[data-test="invite-learners-textArea"]').clear().type('testtrial1@test.com{enter}')
    cy.get('[data-test="invite-learners-textArea"]').type('testtrial2@test.com')
    cy.get('[data-test="open-invite-modal-modal-button"]').click()
    cy.get('[data-test="trial-license-button"]').click()
    cy.get('[data-test="confirm-invite-button"]').click()
    cy.get('[data-test="close-modal-button"]').click()
  })
  it('should invite multiple learners with annual license', () => {
    cy.get('[data-test="invite-learners-textArea"]').clear().type('testannual1@test.com{enter}')
    cy.get('[data-test="invite-learners-textArea"]').type('testannual2@test.com')
    cy.get('[data-test="open-invite-modal-modal-button"]').click()
    cy.get('[data-test="annual-license-button"]').click()
    cy.get('[data-test="confirm-invite-button"]').click()
    cy.get('[data-test="close-modal-button"]').click()
  })
  it('should invite multiple learners with monthly license', () => {
    cy.get('[data-test="invite-learners-textArea"]').clear().type('testmonthly1@test.com{enter}')
    cy.get('[data-test="invite-learners-textArea"]').type('testmonthly2@test.com')
    cy.get('[data-test="open-invite-modal-modal-button"]').click()
    cy.get('[data-test="monthly-license-button"]').click()
    cy.get('[data-test="confirm-invite-button"]').click()
    cy.get('[data-test="close-modal-button"]').click()
  })
})
