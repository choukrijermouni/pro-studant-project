/// <reference types="cypress" />

describe('My Account page', () => {
  before(() => {
    cy.visit('/')
    cy.wait(15000)
  })

  beforeEach(() => {
    cy.restoreLocalStorageCache()
    cy.visit('/')
    cy.wait(5000)
  })

  afterEach(() => {
    cy.saveLocalStorageCache()
  })

  it('last connection scenario', () => {
    cy.get('[data-test="card-last-connection"]').should('be.visible')
    cy.get('[data-test="card-last-connection"]').first().click()
    cy.wait(1000)
  })

  it('should select no licence user card', () => {
    cy.get('[data-test="no-licence-user-card"]').should('exist')
    cy.get('[data-test="no-licence-user-card"]').first().click()
    cy.wait(3000)
  })

  it('should select no licence user card button', () => {
    cy.get('[data-test="no-licence-user-card"]').should('exist')
    cy.get('[data-test="no-licence-user-card-button"]').first().click()
    cy.wait(3000)
  })

  it('should select last affected users licence', () => {
    cy.get('[data-test="last-assign-user-card"]').should('be.visible')
    cy.get('[data-test="last-assign-user-card"]').first().click()
    cy.wait(3000)
  })

  it('should select last affected users licence', () => {
    cy.visit('/apprenants')
    cy.wait(5000)
    cy.get('[data-test="learner-card"]').should('be.visible')
    cy.get('[data-test="learner-card"]').first().click()
    cy.wait(3000)
  })

  it('should select last affected users licence', () => {
    cy.visit('/equipes')
    cy.wait(5000)
    cy.get('[data-test="team-card"]').should('be.visible')
    cy.get('[data-test="team-card"]').first().click()
    cy.wait(3000)
    cy.get('[data-test="learner-card"]').should('be.visible')
    cy.get('[data-test="learner-card"]').first().click()
    cy.wait(3000)
  })

  it('should select last affected users licence', () => {
    cy.visit('/rapports')
    cy.wait(5000)
    cy.get('[data-test="learner-card"]').should('be.visible')
    cy.get('[data-test="learner-card"]').first().click()
    cy.wait(3000)
  })

  it('should select no licence invited user card', () => {
    cy.get('[data-test="invited-user-card"]').should('be.visible')
    cy.get('[data-test="invited-user-card"]').first().click()
    cy.wait(3000)
  })

  it('should select no licence invited user card', () => {
    cy.visit('/apprenants')
    cy.wait(5000)
    cy.get('[data-test="invited-user-card"]').should('be.visible')
    cy.get('[data-test="invited-user-card"]').first().click()
    cy.wait(3000)
  })

  it('should select last affected invited users ', () => {
    cy.visit('/equipes')
    cy.wait(5000)
    cy.get('[data-test="team-card"]').should('be.visible')
    cy.get('[data-test="team-card"]').first().click()
    cy.wait(3000)
    cy.get('[data-test="invited-user-card"]').should('be.visible')
    cy.get('[data-test="invited-user-card"]').first().click()
    cy.wait(3000)
  })
})
