/// <reference types="cypress" />

describe('My Account page', () => {
  before(() => {
    cy.visit('/')
    cy.wait(15000)
    cy.visit('/monCompte')
  })

  beforeEach(() => {
    cy.restoreLocalStorageCache()
  })

  afterEach(() => {
    cy.saveLocalStorageCache()
  })

  it('should last name test', () => {
    cy.wait(1000)
    cy.get('[data-test="last-name-input"]').clear()
    cy.get('[data-test="submit-button"]').click()
    cy.get('[data-test="last-name-input"]').should('have.css', 'border-color', 'rgb(233, 27, 75)')
    cy.get('[data-test="last-name-input"]').type('Yeager')
  })

  it('should email text', () => {
    cy.wait(1000)
    cy.get('[data-test="email-input"]').clear()
    cy.get('[data-test="email-input"]').type('erenkyojin@eldian.')
    cy.get('[data-test="last-name-input"]').click()
    cy.get('[data-test="email-input"]').should('have.css', 'border-color', 'rgb(233, 27, 75)')
    cy.contains('E-mail invalide')
    cy.get('[data-test="email-input"]').clear()
    cy.get('[data-test="email-input"]').type('maroc@pro_boa.com')
    cy.get('[data-test="last-name-input"]').click()
    cy.get('[data-test="email-input"]').should('have.css', 'border-color', 'rgb(233, 27, 75)')
    cy.contains('Email existe deja')
    cy.get('[data-test="email-input"]').clear()
    cy.get('[data-test="last-name-input"]').click()
    cy.get('[data-test="email-input"]').should('have.css', 'border-color', 'rgb(233, 27, 75)')
    cy.get('[data-test="email-input"]').type('erenkyojin@eldian.de')
    cy.wait(1000)
    cy.get('[data-test="first-name-input"]').clear()
    cy.get('[data-test="submit-button"]').click()
    cy.get('[data-test="first-name-input"]').should('have.css', 'border-color', 'rgb(233, 27, 75)')
    cy.get('[data-test="first-name-input"]').type('Eren')
    cy.wait(1000)
  })

  it('should first name test', () => {
    cy.wait(1000)
    cy.get('[data-test="first-name-input"]').clear()
    cy.get('[data-test="submit-button"]').click()
    cy.get('[data-test="first-name-input"]').should('have.css', 'border-color', 'rgb(233, 27, 75)')
    cy.get('[data-test="first-name-input"]').type('Eren')
    cy.wait(1000)
  })

  it('should test update infos', () => {
    cy.get('[data-test="submit-button"]').click()
    cy.get('[data-test="Notification"]').contains('succès')
    cy.wait(1000)
  })

  it('should password test', () => {
    cy.wait(1000)
    cy.get('[data-test="password-input"]').clear()
    cy.get('[data-test="password-submit-button"]').should('be.disabled')
    cy.wait(1000)
    cy.get('[data-test="password-input"]').type('123456')
    cy.get('[data-test="password-submit-button"]').should('be.enabled')
    cy.get('[data-test="password-submit-button"]').click()
    cy.get('[data-test="Notification"]').contains('succès')
    cy.wait(1000)
  })

  it('should logout test', () => {
    cy.get('[dataTest="logout-button"]').click()
    cy.wait(5000)
    cy.url().should('include', '/signout')
  })
})
