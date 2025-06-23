/// <reference types="cypress" />

describe('My Account page', () => {
  before(() => {
    cy.visit('/')
    cy.wait(15000)
  })

  beforeEach(() => {
    cy.restoreLocalStorageCache()
  })

  afterEach(() => {
    cy.saveLocalStorageCache()
  })

  it('should select managers', () => {
    cy.get('[data-test="radio-button-manager"]').click()
    cy.wait(1000)
  })

  it('should select learners', () => {
    cy.get('[data-test="card-last-connection"]').first().click()
    cy.wait(1000)
  })

  it('should select teams', () => {
    cy.get('[data-test="team-card"]').first().click()
    cy.wait(1000)
  })

  it('should select manager avatar', () => {
    cy.get('[data-test="manager-avatar"]').first().click()
    cy.wait(1000)
  })
})
