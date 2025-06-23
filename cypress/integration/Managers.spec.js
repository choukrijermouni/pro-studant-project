/// <reference types="cypress" />

describe('Managers page', () => {
  before(() => {
    cy.visit('/')
    cy.wait(15000)
    cy.visit('/managers')
  })

  beforeEach(() => {
    cy.restoreLocalStorageCache()
  })

  afterEach(() => {
    cy.saveLocalStorageCache()
  })

  it('should navigate to a manager profile', () => {
    cy.wait(5000)
    cy.get('[data-test="manager-card-0"]').click()
  })

  it('should check if the button disabled when no team is selected', () => {
    cy.get('[data-test="add-team-button"]').should('be.disabled')
    cy.wait(1000)
    cy.get('[data-test="searchable-select-list-add-team"]').type('test')
    cy.get('[data-test="suggestion-item"]').first().click()
    cy.get('[data-test="searchable-select-list-add-team"]').clear()
    cy.wait(1000)
    cy.get('[data-test="add-team-button"]').should('be.disabled')
  })

  it('should assert the assignment of team to manager', () => {
    cy.get('[data-test="searchable-select-list-add-team"]').clear()
    cy.get('[data-test="searchable-select-list-add-team"]').type('test')
    cy.wait(1000)
    cy.get('[data-test="suggestion-item"]').first().click()
    cy.wait(1000)
    cy.get('[data-test="add-team-button"]').click()
    cy.get('[data-test="Notification"]').should('be.visible').contains('succes')
    cy.get('[data-test="searchable-select-list-add-team"]').clear()
    cy.get('[data-test="icon-search-add-team"]').click()
  })

  it('should check if the drop down icon of searchable list of detach is working', () => {
    cy.get('[data-test="icon-search-remove-team"]').click()
    cy.wait(1000)
    cy.get('[data-test="suggestion-item"]').first().should('be.visible')
    cy.wait(3000)
    cy.get('[data-test="icon-search-remove-team"]').click()
  })

  it('should assert the detachment of team to manager', () => {
    cy.get('[data-test="searchable-select-list-remove-team"]').clear()
    cy.get('[data-test="searchable-select-list-remove-team"]').type('test')
    cy.wait(1000)
    cy.get('[data-test="suggestion-item"]').first().click()
    cy.wait(1000)
    cy.get('[data-test="remove-team-button"]').click()
    cy.get('[data-test="Notification"]').should('be.visible').contains('succes')
    cy.wait(1000)
  })

  it('should check if the drop down icon is working', () => {
    cy.get('[data-test="icon-round-down-add"]').click()
    cy.wait(1000)
    cy.get('[data-test="searchable-select-list-add-team"]').should('not.be.visible')
    cy.wait(3000)
    cy.get('[data-test="icon-round-up-add"]').click()
    cy.get('[data-test="searchable-select-list-add-team"]').should('be.visible')
  })

  it('should check if the drop down icon of searchable list of assign is working', () => {
    cy.get('[data-test="icon-search-add-team"]').click()
    cy.wait(1000)
    cy.get('[data-test="suggestion-item"]').first().should('be.visible')
    cy.wait(3000)
    cy.get('[data-test="icon-search-add-team"]').click()
  })

  it('should check if the modal is visible', () => {
    cy.contains('Retirer ce manager').click()
    cy.get('[datatest="modal-remove-manager"]').should('be.visible')
    cy.get('[data-test="remove-manager-confirm-button"]').click()
    cy.get('[data-test="Notification"]').should('be.visible').contains('succes')
  })
})
