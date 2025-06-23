/// <reference types="cypress" />

import { creatTeamUrl } from '../settings'

describe('Teams page', () => {
  let defaultTeam, costumeTeam
  before(() => {
    cy.fixture('defaultTeamDetails').then(team => {
      defaultTeam = team
    })
    cy.fixture('costumeTeamDetails').then(team => {
      costumeTeam = team
    })
    cy.visit('/')
    cy.wait(5000)
    cy.visit('/equipes')
  })

  beforeEach(() => {
    cy.restoreLocalStorageCache()
  })

  afterEach(() => {
    cy.saveLocalStorageCache()
    cy.visit('/equipes')
  })

  it('should assert the creat team button is disabled when the team name is empty', () => {
    cy.get('[data-test="team-name-input"]').clear()
    cy.get('[data-test="create-team-button"]').should('be.disabled')
    cy.wait(1000)
  })
  it('should assert the creat team button is enabled when the team name is not empty', () => {
    cy.get('[data-test="team-name-input"]').clear().type('test')
    cy.wait(1000)
    cy.get('[data-test="create-team-button"]').should('not.be.disabled')
    cy.wait(1000)
  })

  it('should create a team with name , default icon', () => {
    cy.intercept('POST', creatTeamUrl).as('creatTeam')
    cy.get('[data-test="team-name-input"]').clear().type(defaultTeam.name)
    cy.wait(1000)
    cy.get('[data-test="create-team-button"]').click()
    cy.wait('@creatTeam').its('response.statusCode').should('eq', 200)
    cy.wait(3000)
  })

  it('should create a team with name , costume icon', () => {
    cy.intercept('POST', creatTeamUrl).as('creatTeam')
    cy.get('[data-test="team-avatar-3"]').click()
    cy.wait(1000)
    cy.get('[data-test="team-name-input"]').clear().type(costumeTeam.name)
    cy.wait(1000)
    cy.get('[data-test="create-team-button"]').click()
    cy.wait('@creatTeam').its('response.statusCode').should('eq', 200)
    cy.wait(3000)
  })

  it('should create a team with name , description , default icon', () => {
    cy.intercept('POST', creatTeamUrl).as('creatTeam')
    cy.get('[data-test="team-name-input"]').clear().type(defaultTeam.name)
    cy.wait(1000)
    cy.get('[data-test="team-description-input"]').type(defaultTeam.description)
    cy.wait(1000)
    cy.get('[data-test="create-team-button"]').click()
    cy.wait('@creatTeam').its('response.statusCode').should('eq', 200)
    cy.wait(3000)
  })

  it('should create a team with name , description , costume icon', () => {
    cy.intercept('POST', creatTeamUrl).as('creatTeam')
    cy.get('[data-test="team-avatar-2"]').click()
    cy.get('[data-test="team-name-input"]').clear().type(costumeTeam.name)
    cy.wait(1000)
    cy.get('[data-test="team-description-input"]').type(costumeTeam.description)
    cy.wait(1000)
    cy.get('[data-test="create-team-button"]').click()
    cy.wait('@creatTeam').its('response.statusCode').should('eq', 200)
    cy.wait(3000)
  })
})
