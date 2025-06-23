/* global cy */
/// <reference types="cypress" />

import {
  assignManagerUrl,
  deleteTeamUrl,
  detachManagerUrl,
  inviteManagerUrl,
  updateTeamUrl
} from '../settings'

import { validateExcelFile } from '../utils'

describe('Team profile page', () => {
  let editTeam, inviteEmail
  before(() => {
    cy.fixture('editedTeamDetails').then(team => {
      editTeam = team
    })
    cy.fixture('invitedManagerEmail').then(email => {
      inviteEmail = email
    })
    cy.visit('/')
    cy.wait(10000)
    cy.visit('/equipes')
  })

  beforeEach(() => {
    cy.restoreLocalStorageCache()
  })

  afterEach(() => {
    cy.saveLocalStorageCache()
  })

  it('should assert at least one team is displayed and click the first one', () => {
    cy.get('[data-test="team-card"]').should('have.length.greaterThan', 0)
    cy.get('[data-test="team-card"]').first().click()
  })

  it('should assert the team name input error is displayed if the name is empty', () => {
    cy.get('[data-test="edit-team-button"]').click()
    cy.get('[data-test="edit-team-modal"]').should('be.visible')
    cy.get('[data-test="team-name-input"]').clear()
    cy.get('[data-test="save-button"]').click()
    cy.get('[data-test="team-name-input-error"]').should('be.visible')
  })

  it('should open  the edit team modal when the edit button is clicked', () => {
    cy.intercept('PUT', updateTeamUrl).as('updateTeam')
    cy.get('[data-test="team-name-input"]').clear().type(editTeam.name)
    cy.get('[data-test="team-description-input"]').clear().type(editTeam.description)
    cy.get('[data-test="team-icon"]').last().click()
    cy.get('[data-test="save-button"]').click()
    cy.wait('@updateTeam').its('response.statusCode').should('eq', 200)
    cy.get('[data-test="Notification"]').should('be.visible').contains('succes')
  })

  it('should assert the add manager component can be toggle', () => {
    cy.get('[data-test="add-manager-body"]').should('be.visible')
    cy.get('[data-test="add-manager-header"]').click()
    cy.get('[data-test="add-manager-body"]').should('not.be.visible')
    cy.get('[data-test="add-manager-header"]').click()
    cy.get('[data-test="add-manager-body"]').should('be.visible')
  })

  it('should assert the assignment of the manager to the team', () => {
    cy.intercept('POST', assignManagerUrl).as('assignManager')
    cy.get('[data-test="add-manager-body"]').should('be.visible')
    cy.get('[data-test="add-manager-select-icon"]').click()
    cy.get('[data-test="suggestion-item"]').first().click()
    cy.get('[data-test="add-manager-button"]').should('not.be.disabled')
    cy.get('[data-test="add-manager-button"]').click()
    cy.wait('@assignManager').its('response.statusCode').should('eq', 200)
    cy.get('[data-test="Notification"]').should('be.visible').contains('succes')
    cy.get('[data-test="manager-avatar"]').should('be.visible')
    cy.get('[data-test="add-manager-select-input"]').invoke('val').then(value => {
      cy.get('[data-test="manager-avatar"]').contains(value)
    })
  })

  it('should assert the detach manager component can be toggle', () => {
    cy.get('[data-test="detach-manager-body"]').should('be.visible')
    cy.get('[data-test="detach-manager-header"]').click()
    cy.get('[data-test="detach-manager-body"]').should('not.be.visible')
    cy.get('[data-test="detach-manager-header"]').click()
    cy.get('[data-test="detach-manager-body"]').should('be.visible')
  })

  it('should assert the detach of the manager to the team', () => {
    cy.intercept('DELETE', detachManagerUrl).as('detachManager')
    cy.get('[data-test="detach-manager-body"]').should('be.visible')
    cy.get('[data-test="detach-manager-button"]').should('be.disabled')
    cy.get('[data-test="detach-manager-select-icon"]').click()
    cy.get('[data-test="suggestion-item"]').first().click()
    cy.get('[data-test="detach-manager-button"]').should('not.be.disabled')
    cy.get('[data-test="detach-manager-button"]').click()
    cy.wait('@detachManager').its('response.statusCode').should('eq', 200)
    cy.get('[data-test="Notification"]').should('be.visible').contains('succes')
  })

  it('should assert the invite manager component can be toggle', () => {
    cy.get('[data-test="invite-manager-body"]').should('be.visible')
    cy.get('[data-test="invite-manager-header"]').click()
    cy.get('[data-test="invite-manager-body"]').should('not.be.visible')
    cy.get('[data-test="invite-manager-header"]').click()
    cy.get('[data-test="invite-manager-body"]').should('be.visible')
  })

  it('should assert the invite of the manager to the team', () => {
    cy.intercept('POST', inviteManagerUrl).as('inviteManager')
    cy.get('[data-test="invite-manager-body"]').should('be.visible')
    cy.get('[data-test="invite-manager-button"]').should('be.disabled')
    cy.get('[data-test="invite-manager-email-input"]').clear().type(inviteEmail.invalidEmail)
    cy.get('[data-test="invite-manager-button"]').should('not.be.disabled')
    cy.get('[data-test="invite-manager-button"]').click()
    cy.get('[data-test="manager-email-input-error"]').should('be.visible')
    cy.get('[data-test="invite-manager-email-input"]').clear().type(inviteEmail.validEmail)
    cy.get('[data-test="invite-manager-button"]').should('not.be.disabled')
    cy.get('[data-test="invite-manager-button"]').click()
    cy.wait('@inviteManager').its('response.statusCode').should('eq', 200)
    cy.get('[data-test="Notification"]').should('be.visible').contains('succee')
  })

  it('should download the team learners excel', () => {
    cy.get('[data-test="export-recap-to-excel-button"]').click()
    cy.get('[data-test="team-name"]').invoke('text').then(teamName => {
      validateExcelFile(teamName)
    })
  })

  it('should download the team recap excel', () => {
    cy.get('[data-test="export-learners-to-excel-button"]').click()
    cy.get('[data-test="team-name"]').invoke('text').then(teamName => {
      validateExcelFile(teamName)
    })
  })

  it('should delete a team', () => {
    cy.intercept('DELETE', deleteTeamUrl).as('deleteTeam')
    cy.get('[data-test="delete-team-button"]').click()
    cy.get('[data-test="delete-team-modal"]').should('be.visible')
    cy.get('[data-test="confirm-delete-team-button"]').click()
    cy.wait('@deleteTeam').its('response.statusCode').should('eq', 200)
    cy.get('[data-test="Notification"]').should('be.visible').contains('succès')
  })
})
