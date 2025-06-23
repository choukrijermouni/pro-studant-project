import { takeLatest, put } from 'redux-saga/effects'
import { fetch } from '@pro_boa/js'
import { oidcUserManager } from 'identity'
import { BASE_URL_WEB } from 'constants/'

const initialState = {
  error: false,
  userRole: [],
  organizationLicenseTypes: [],
  subscriptionCycleType: [],
  datePart: [],
  functions: [],
  categories: [],
  emailTypes: []
}

export const reducer = (state = initialState, { type, data }) => {
  switch (type) {
    case GET_ORGANIZATION_LICENSE_TYPE_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_ORGANIZATION_LICENSE_TYPE_SUCCESS:
      return {
        ...state,
        organizationLicenseTypes: data
      }
    case GET_USER_ROLE_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_USER_ROLE_SUCCESS:
      return {
        ...state,
        userRole: data
      }
    case GET_SUBSCRIPTION_CYCLE_TYPE_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_SUBSCRIPTION_CYCLE_TYPE_SUCCESS:
      return {
        ...state,
        subscriptionCycleType: data
      }
    case GET_DATE_PART_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_DATE_PART_SUCCESS:
      return {
        ...state,
        datePart: data
      }
    case GET_FUNCTIONS_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_FUNCTIONS_SUCCESS:
      return {
        ...state,
        functions: data
      }
    case GET_CATEGORIES_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: data
      }
    case GET_EMAIL_TYPE_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_EMAIL_TYPE_SUCCESS:
      return {
        ...state,
        emailTypes: data
      }
    default:
      return state
  }
}

export const fetchUserRolesAction = () => ({ type: GET_USER_ROLE_REQUESTED })
export const fetchOrganizationLicenseTypesAction = () => ({ type: GET_ORGANIZATION_LICENSE_TYPE_REQUESTED })
export const fetchSubscriptionCycleTypeAction = () => ({ type: GET_SUBSCRIPTION_CYCLE_TYPE_REQUESTED })
export const fetchDatePartAction = () => ({ type: GET_DATE_PART_REQUESTED })
export const fetchFunctionsAction = () => ({ type: GET_FUNCTIONS_REQUESTED })
export const fetchCategoriesAction = () => ({ type: GET_CATEGORIES_REQUESTED })
export const fetchEmailTypesAction = () => ({ type: GET_EMAIL_TYPE_REQUESTED })

function * fetchUserRoles () {
  try {
    const response = yield fetch(queries.getUserRole, { userManager: oidcUserManager })
    yield put({ type: GET_USER_ROLE_SUCCESS, data: response })
  } catch (err) {
    yield put({ type: GET_USER_ROLE_FAILED, data: err })
  }
}
function * fetchOrganizationLicenseTypes () {
  try {
    const response = yield fetch(queries.getOrganizationLicenseType, { userManager: oidcUserManager })
    yield put({ type: GET_ORGANIZATION_LICENSE_TYPE_SUCCESS, data: response })
  } catch (err) {
    yield put({ type: GET_ORGANIZATION_LICENSE_TYPE_FAILED, data: err })
  }
}
function * fetchSubscriptionCycleType () {
  try {
    const response = yield fetch(queries.getSubscriptionCycleType, { userManager: oidcUserManager })
    yield put({ type: GET_SUBSCRIPTION_CYCLE_TYPE_SUCCESS, data: response })
  } catch (err) {
    yield put({ type: GET_SUBSCRIPTION_CYCLE_TYPE_FAILED, data: err })
  }
}
function * fetchDatePart () {
  try {
    const response = yield fetch(queries.getDatePart, { userManager: oidcUserManager })
    yield put({ type: GET_DATE_PART_SUCCESS, data: response })
  } catch (err) {
    yield put({ type: GET_DATE_PART_FAILED, data: err })
  }
}
function * fetchFunctions () {
  try {
    const response = yield fetch(queries.getFunctions, { userManager: oidcUserManager })
    yield put({ type: GET_FUNCTIONS_SUCCESS, data: response })
  } catch (err) {
    yield put({ type: GET_FUNCTIONS_FAILED, data: err })
  }
}
function * fetchCategories () {
  try {
    const response = yield fetch(queries.getCategories, { userManager: oidcUserManager })
    yield put({ type: GET_CATEGORIES_SUCCESS, data: response.Items })
  } catch (err) {
    yield put({ type: GET_CATEGORIES_FAILED, data: err })
  }
}
function * fetchEmailType () {
  try {
    const response = yield fetch(queries.getEmailType, { userManager: oidcUserManager })
    yield put({ type: GET_EMAIL_TYPE_SUCCESS, data: response })
  } catch (err) {
    yield put({ type: GET_EMAIL_TYPE_FAILED, data: err })
  }
}

export function * referentialRootSaga () {
  yield takeLatest(GET_USER_ROLE_REQUESTED, fetchUserRoles)
  yield takeLatest(GET_ORGANIZATION_LICENSE_TYPE_REQUESTED, fetchOrganizationLicenseTypes)
  yield takeLatest(GET_SUBSCRIPTION_CYCLE_TYPE_REQUESTED, fetchSubscriptionCycleType)
  yield takeLatest(GET_DATE_PART_REQUESTED, fetchDatePart)
  yield takeLatest(GET_FUNCTIONS_REQUESTED, fetchFunctions)
  yield takeLatest(GET_CATEGORIES_REQUESTED, fetchCategories)
  yield takeLatest(GET_EMAIL_TYPE_REQUESTED, fetchEmailType)
}

const queries = {
  getUserRole: `${BASE_URL_WEB}/Referential/userRole`,
  getOrganizationLicenseType: `${BASE_URL_WEB}/Referential/organizationLicenseTypes`,
  getSubscriptionCycleType: `${BASE_URL_WEB}/Referential/subscriptionCycleType`,
  getDatePart: `${BASE_URL_WEB}/Referential/datePart`,
  getFunctions: `${BASE_URL_WEB}/Referential/functions`,
  getCategories: `${BASE_URL_WEB}/Category`,
  getEmailType: `${BASE_URL_WEB}/Referential/mailEventTypes`
}

const GET_ORGANIZATION_LICENSE_TYPE_SUCCESS = 'GET_ORGANIZATION_LICENSE_TYPE_SUCCESS'
const GET_ORGANIZATION_LICENSE_TYPE_FAILED = 'GET_ORGANIZATION_LICENSE_TYPE_FAILED'
const GET_ORGANIZATION_LICENSE_TYPE_REQUESTED = 'GET_ORGANIZATION_LICENSE_TYPE_REQUESTED'
const GET_USER_ROLE_SUCCESS = 'GET_USER_ROLE_SUCCESS'
const GET_USER_ROLE_FAILED = 'GET_USER_ROLE_FAILED'
const GET_USER_ROLE_REQUESTED = 'GET_USER_ROLE_REQUESTED'
const GET_SUBSCRIPTION_CYCLE_TYPE_SUCCESS = 'GET_SUBSCRIPTION_CYCLE_TYPE_SUCCESS'
const GET_SUBSCRIPTION_CYCLE_TYPE_FAILED = 'GET_SUBSCRIPTION_CYCLE_TYPE_FAILED'
const GET_SUBSCRIPTION_CYCLE_TYPE_REQUESTED = 'GET_SUBSCRIPTION_CYCLE_TYPE_REQUESTED'
const GET_DATE_PART_SUCCESS = 'GET_DATE_PART_SUCCESS'
const GET_DATE_PART_FAILED = 'GET_DATE_PART_FAILED'
const GET_DATE_PART_REQUESTED = 'GET_DATE_PART_REQUESTED'
const GET_FUNCTIONS_SUCCESS = 'GET_FUNCTIONS_SUCCESS'
const GET_FUNCTIONS_FAILED = 'GET_FUNCTIONS_FAILED'
const GET_FUNCTIONS_REQUESTED = 'GET_FUNCTIONS_REQUESTED'
const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS'
const GET_CATEGORIES_FAILED = 'GET_CATEGORIES_FAILED'
const GET_CATEGORIES_REQUESTED = 'GET_CATEGORIES_REQUESTED'
const GET_EMAIL_TYPE_SUCCESS = 'GET_EMAIL_TYPE_SUCCESS'
const GET_EMAIL_TYPE_FAILED = 'GET_EMAIL_TYPE_FAILED'
const GET_EMAIL_TYPE_REQUESTED = 'GET_EMAIL_TYPE_REQUESTED'
