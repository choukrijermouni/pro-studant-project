const path = require('path')

export const validateExcelFile = (teamName) => {
  const downloadsFolder = Cypress.config('downloadsFolder')
  const downloadedFilename = path.join(downloadsFolder, `Suivi ${teamName}.xlsx`)
  cy.readFile(downloadedFilename, 'binary', { timeout: 15000 })
    .should((buffer) => {
      expect(buffer.length).to.be.gt(100)
    })
}

export const validateAffectationHistoryExcelFile = () => {
  const downloadsFolder = Cypress.config('downloadsFolder')
  const downloadedFilename = path.join(downloadsFolder, 'Historique d\'affectation.xlsx')
  cy.readFile(downloadedFilename, 'binary', { timeout: 15000 })
    .should((buffer) => {
      expect(buffer.length).to.be.gt(100)
    })
}
