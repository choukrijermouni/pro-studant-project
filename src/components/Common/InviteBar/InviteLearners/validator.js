import { fetch } from '@pro_boa/js'
import { BASE_URL_WEB } from 'constants/'
import { oidcUserManager } from 'identity'
import { debounce } from 'lodash'
import Text from './text.json'

const errors = {
  Required: 'Required',
  FormatInvalid: 'FormatInvalid',
  EmailsDuplicated: 'EmailsDuplicated',
  EmailsNonValid: 'EmailsNonValid',
  EmailsAlreadyExist: 'EmailsAlreadyExist',
  Error: 'Error'
}

const emailDuplicated = (emails = []) => emails.filter((email, index) => emails.indexOf(email) !== index)

const validateDuplicate = (emails = []) => {
  const duplicatedEmails = emailDuplicated(emails)
  return duplicatedEmails.length ? [...new Set(duplicatedEmails)] : null
}

const testEmail = (email = '') => (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(email))

const endPoint = `${BASE_URL_WEB}/User/exists`

export default debounce(async (emails = '', setErrors) => {
  try {
    if (emails === '') {
      setErrors(null)
      return
    }

    const listOfEmails = emails.split('\n').map(element => element.trim()).filter(element => element !== '')

    if (listOfEmails.length === 0) {
      setErrors(Text.ErrorValidationEmails[errors.Required])
      return
    }

    const hasDuplicates = validateDuplicate(listOfEmails)
    if (hasDuplicates !== null) {
      setErrors(`${Text.ErrorValidationEmails[errors.EmailsDuplicated]}: ${hasDuplicates.join(', ')}`)
      return
    }

    const incorrect = listOfEmails.some(email => testEmail(email))
    if (incorrect) {
      const incorrectEmails = listOfEmails.filter(email => testEmail(email))
      setErrors(`${Text.ErrorValidationEmails[errors.EmailsNonValid]}: ${incorrectEmails.join(', ')}`)
      return
    }

    const response = await fetch(endPoint, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(listOfEmails), userManager: oidcUserManager })
    if (response.length) {
      setErrors(`${Text.ErrorValidationEmails[errors.EmailsAlreadyExist]}: ${response.join(', ')}`)
      return
    }

    setErrors(null)
    return null
  } catch (err) {
    setErrors(Text.ErrorValidationEmails[errors.Error])
    return err
  }
}, 500)
