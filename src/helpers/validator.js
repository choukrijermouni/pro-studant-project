import Text from './text.json'
import { fetch } from '@pro_boa/js'
import { BASE_URL_WEB } from 'constants/'
import { oidcUserManager } from 'identity'

const queries = {
  userExist: (email) => `${BASE_URL_WEB}/User/emailregistered/${email}`,
  managerExist: (email) => `${BASE_URL_WEB}/User/exist?email=${email}`
}

const emailExist = async (email) => {
  const response = await fetch(queries.userExist(email), { userManager: oidcUserManager })
  return response
}

const managerExist = async (email) => {
  const response = await fetch(queries.managerExist(email), { userManager: oidcUserManager })
  return response
}

export const validateGenral = values => {
  const errors = {}
  if (!values.FirstName) {
    errors.FirstName = Text.required
  }
  if (!values.LastName) {
    errors.LastName = Text.required
  }
  if (!/^\+?[0-9]+$/.test(values.Phone)) {
    errors.Phone = Text.required
  }
  if (!values.Email) {
    errors.Email = Text.required
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
    errors.Email = Text.emailIncorrect
  }
  return errors
}

export const validateAdmin = async (values, email, isInvited) => {
  const errors = {}
  const exist = values.email && !isInvited ? await emailExist(values.email) : false
  if (!values.firstName) {
    errors.firstName = Text.required
  }
  if (!values.lastName) {
    errors.lastName = Text.required
  }
  if (values.phone) {
    if (!/^\+?[0-9]+$/.test(values.phone)) {
      errors.phone = Text.PhoneIncorrect
    }
  }
  if (!values.email) {
    errors.email = Text.required
  } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(values.email)) {
    errors.email = Text.emailIncorrect
  } else if (exist) {
    if (email !== values.email) {
      errors.email = Text.emailExist
    }
  }
  return errors
}

export const validateLogin = values => {
  const errors = {}
  if (!values.email) {
    errors.email = Text.required
  }
  if (!values.password) {
    errors.password = Text.required
  }
  return errors
}

export const validatePassword = values => {
  const errors = {}
  if (!values.password) {
    errors.password = Text.required
  } else if (values.password.length < 6) {
    errors.password = Text.passwordIncorrect
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = Text.confirmation
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = Text.passwordNotMatch
  }
  return errors
}

export const validateAdress = values => {
  const errors = {}
  if (!values.company) {
    errors.company = Text.required
  }
  if (!values.firstName) {
    errors.firstName = Text.required
  }
  if (!values.lastName) {
    errors.lastName = Text.required
  }
  if (!values.vatNumber) {
    errors.vatNumber = Text.required
  }
  if (!values.addressLine1) {
    errors.addressLine1 = Text.required
  }
  if (!values.city) {
    errors.city = Text.required
  }
  if (!values.postalCode) {
    errors.postalCode = Text.required
  }
  if (!values.country) {
    errors.country = Text.required
  }
  return errors
}

export const validateEmail = values => {
  const errors = {}
  if (!values.email) {
    errors.email = Text.required
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = Text.emailIncorrect
  }
  return errors
}

export const validateInviteManagerEmail = async values => {
  const errors = {}
  const isRegistred = values.inviteEmail ? await managerExist(values.inviteEmail) : false
  if (values.inviteEmail) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.inviteEmail)) {
      errors.inviteEmail = Text.emailIncorrect
    } else if (isRegistred) {
      errors.inviteEmail = Text.userNotRegistred
    }
  }
  return errors
}

export const validateLearner = async values => {
  const errors = {}
  const exist = values.email ? await emailExist(values.email) : false
  const requiredFields = ['firstName', 'lastName', 'email']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = Text.required
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = Text.emailIncorrect
  } else if (exist) {
    errors.email = Text.emailExist
  }
  return errors
}
