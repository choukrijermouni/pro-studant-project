const LOCAL_STORAGE_MEMORY = {}

Cypress.Commands.add('saveLocalStorageCache', () => {
  Object.keys(window.localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = window.localStorage[key]
  })
})

Cypress.Commands.add('restoreLocalStorageCache', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    window.localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key])
  })
})
