/* global cy */
/// <reference types="cypress" />

import { deleteLearnerFromTeamUrl, affectLearnerToTeamUrl } from '../settings'

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

  it('should assert the change team component can be toggle', () => {
    cy.get('[data-test="change-team-body"]').should('be.visible')
    cy.get('[data-test="change-team-header"]').click()
    cy.get('[data-test="change-team-body"]').should('not.be.visible')
    cy.get('[data-test="change-team-header"]').click()
    cy.get('[data-test="change-team-body"]').should('be.visible')
  })

  it('should assert the assign of the learner team', () => {
    cy.intercept('POST', affectLearnerToTeamUrl).as('affectLearnerToTeam')
    cy.get('[data-test="change-team-body"]').should('be.visible')
    cy.get('[data-test="change-team-select"]').click()
    cy.contains('Team 1').click()
    cy.get('[data-test="change-team-button"]').should('not.be.disabled')
    cy.get('[data-test="change-team-button"]').click()
    cy.wait('@affectLearnerToTeam').its('response.statusCode').should('eq', 200)
    cy.get('[data-test="Notification"]').should('be.visible').contains('succès')
    cy.get('[data-test="learner-team-name"]').should('be.visible')
    cy.get('[data-test="change-team-select"]').invoke('text').then(value => {
      cy.get('[data-test="learner-team-name"]').contains(value)
    })
  })

  it('should assert the change of the learner team', () => {
    cy.intercept('DELETE', deleteLearnerFromTeamUrl).as('deleteLearnerFromTeam')
    cy.intercept('POST', affectLearnerToTeamUrl).as('affectLearnerToTeam')
    cy.get('[data-test="change-team-body"]').should('be.visible')
    cy.get('[data-test="change-team-select"]').click()
    cy.contains('Team 2').click()
    cy.get('[data-test="change-team-button"]').should('not.be.disabled')
    cy.get('[data-test="change-team-button"]').click()
    cy.wait('@deleteLearnerFromTeam').its('response.statusCode').should('eq', 200)
    cy.wait('@affectLearnerToTeam').its('response.statusCode').should('eq', 200)
    cy.get('[data-test="Notification"]').should('be.visible').contains('succès')
    cy.get('[data-test="change-team-select"]').invoke('text').then(value => {
      cy.get('[data-test="learner-team-name"]').contains(value)
    })
  })
})
