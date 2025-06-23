import { debounce, put, takeLatest, select } from 'redux-saga/effects'
import { fetch } from '@pro_boa/js'
import { oidcUserManager } from 'identity'
import { BASE_URL_WEB, defaultField, emptySearch, notification, defaultAdminsOrderAsc } from 'constants/'
import { openBannerAction } from 'components/Common/Banner/store'
import Text from './text.json'
import { TurnOffLoaderAction, TurnOnLoaderAction } from 'store/config'

const initialUserState = {
  error: false,
  count: 0,
  data: []
}

export const reducer = (state = initialUserState, { type, data }) => {
  switch (type) {
    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        ...data
      }
    case GET_ADMINS_FAILED:
      return {
        ...state,
        error: data
      }
    case ADD_ADMINS_SUCCESS:
      return {
        ...state,
        ...data
      }
    case ADD_ADMINS_FAILED:
      return {
        ...state,
        error: data
      }
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        ...data
      }
    case DELETE_ADMIN_FAILED:
      return {
        ...state,
        error: data
      }
    case INVITE_ADMIN_SUCCESS:
      return {
        ...state,
        ...data
      }
    case INVITE_ADMIN_FAILED:
      return {
        ...state,
        error: data
      }
    case CANCEL_ADMIN_INVITATION_SUCCEEDED:
      return {
        ...state,
        ...data
      }
    case CANCEL_ADMIN_INVITATION_FAILED:
      return {
        ...state,
        error: data
      }
    case SET_ADMINS_PAGINATION:
      return {
        ...state,
        adminsSkip: data.skip,
        adminsRowPerPage: data.rowsPerPage
      }
    default:
      return state
  }
}

export const fetchAdminsAction = (rowsPerPage, skip, asc, field, search) => ({ type: ADMINS_FETCH_REQUESTED, rowsPerPage, skip, asc, field, search })
export const addAdminAction = (firstName, lastName, email, phone) => ({ type: ADD_ADMINS_REQUESTED, firstName, lastName, email, phone })
export const deleteAdminAction = (adminId) => ({ type: DELETE_ADMIN_REQUESTED, adminId })
export const inviteAdminAction = (email) => ({ type: INVITE_ADMIN_REQUESTED, email })
export const cancelAdminInvitationAction = (invitationId) => ({ type: CANCEL_ADMIN_INVITATION_REQUESTED, invitationId })
export const setAdminsPagination = (skip, rowsPerPage) => ({ type: SET_ADMINS_PAGINATION, data: { skip, rowsPerPage } })

const getAdminsSkip = ({ admins }) => admins.adminsSkip
const getAdminsRowPerPage = ({ admins }) => admins.adminsRowPerPage

function * fetchAdmins ({ rowsPerPage, skip, asc, field, search }) {
  try {
    const response = yield fetch(queries.getAdmins(rowsPerPage, skip, asc, field, search), { userManager: oidcUserManager })
    yield put({ type: GET_ADMINS_SUCCESS, data: { data: response.Items, count: response.FilteredCount } })
    yield put(TurnOffLoaderAction())
  } catch (err) {
    yield put({ type: GET_ADMINS_FAILED, data: err })
    yield put(TurnOffLoaderAction())
  }
}

function * addAdminToTeam ({ firstName, lastName, email, phone }) {
  try {
    const body = {
      firstName,
      lastName,
      email,
      phone
    }
    yield fetch(queries.addAdmin, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), nojson: true, userManager: oidcUserManager })
    yield put({ type: ADD_ADMINS_SUCCESS })
    yield put(openBannerAction(Text.addAdminSuccess, notification.success))
  } catch (err) {
    yield put({ type: ADD_ADMINS_FAILED, data: err })
    yield put(openBannerAction(Text.addAdminError, notification.failed))
  }
}

function * deleteAdmin ({ adminId }) {
  const adminsSkip = yield select(getAdminsSkip)
  const adminsRowPerPage = yield select(getAdminsRowPerPage)
  try {
    const body = {
      adminId
    }
    const response = yield fetch(queries.deleteAdmin, { method: 'delete', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), nojson: true, userManager: oidcUserManager })
    yield put({ type: DELETE_ADMIN_SUCCESS, data: response })
    yield put(openBannerAction(Text.deleteAdminSuccess, notification.success))
    yield put(TurnOffLoaderAction())
    yield put(fetchAdminsAction(adminsRowPerPage, adminsSkip, defaultAdminsOrderAsc, defaultField, emptySearch))
  } catch (err) {
    yield put({ type: DELETE_ADMIN_FAILED, data: err })
    yield put(openBannerAction(Text.deleteAdminFailed, notification.failed))
  }
}

function * inviteAdmin ({ email }) {
  const adminsSkip = yield select(getAdminsSkip)
  const adminsRowPerPage = yield select(getAdminsRowPerPage)
  yield put(TurnOnLoaderAction())
  try {
    yield fetch(queries.inviteAdmin(email), { method: 'post', headers: { 'Content-Type': 'application/json' }, nojson: true, userManager: oidcUserManager })
    yield put({ type: INVITE_ADMIN_SUCCESS })
    yield put(openBannerAction(Text.inviteAdminSuccess, notification.success))
    yield put(TurnOffLoaderAction())
    yield put(fetchAdminsAction(adminsRowPerPage, adminsSkip, defaultAdminsOrderAsc, defaultField, emptySearch))
  } catch (err) {
    yield put({ type: INVITE_ADMIN_FAILED, data: err })
    yield put(openBannerAction(Text.inviteAdminFail, notification.failed))
    yield put(TurnOffLoaderAction())
  }
}

function * cancelAdminInvitation ({ invitationId }) {
  const adminsSkip = yield select(getAdminsSkip)
  const adminsRowPerPage = yield select(getAdminsRowPerPage)
  try {
    yield fetch(queries.deleteInvitation(invitationId), { method: 'delete', headers: { 'Content-Type': 'application/json' }, nojson: true, userManager: oidcUserManager })
    yield put({ type: CANCEL_ADMIN_INVITATION_SUCCEEDED })
    yield put(openBannerAction(Text.cancelLeanerInvitationSuccess, notification.success))
    yield put(fetchAdminsAction(adminsRowPerPage, adminsSkip, defaultAdminsOrderAsc, defaultField, emptySearch))
  } catch (err) {
    yield put({ type: CANCEL_ADMIN_INVITATION_FAILED, data: err })
    yield put(openBannerAction(Text.cancelLeanerInvitationError, notification.failed))
  }
}

export function * AdminsRootSaga () {
  yield debounce(500, ADMINS_FETCH_REQUESTED, fetchAdmins)
  yield takeLatest(ADD_ADMINS_REQUESTED, addAdminToTeam)
  yield takeLatest(DELETE_ADMIN_REQUESTED, deleteAdmin)
  yield takeLatest(INVITE_ADMIN_REQUESTED, inviteAdmin)
  yield takeLatest(CANCEL_ADMIN_INVITATION_REQUESTED, cancelAdminInvitation)
}

const queries = {
  getAdminCount: `${BASE_URL_WEB}/Admin`,
  getAdmins: (take, skip, asc, field, search) => `${BASE_URL_WEB}/Admin?Take=${take}&Skip=${skip}&OrderedByAsc=${asc}&OrderBy=${field}&Search=${search}`,
  addAdmin: `${BASE_URL_WEB}/Admin`,
  deleteAdmin: `${BASE_URL_WEB}/Admin/fromOrganization`,
  inviteAdmin: (email) => `${BASE_URL_WEB}/Admin/invite/${email}`,
  deleteInvitation: (invitationId) => `${BASE_URL_WEB}/Organization/invitation/${invitationId}`
}

const ADMINS_FETCH_REQUESTED = 'ADMINS_FETCH_REQUESTED'
const GET_ADMINS_SUCCESS = 'GET_ADMINS_SUCCESS'
const GET_ADMINS_FAILED = 'GET_ADMINS_FAILED'
const ADD_ADMINS_REQUESTED = 'ADD_ADMINS_REQUESTED'
const ADD_ADMINS_SUCCESS = 'ADD_ADMINS_SUCCESS'
const ADD_ADMINS_FAILED = 'ADD_ADMINS_FAILED'
const INVITE_ADMIN_REQUESTED = 'INVITE_ADMIN_REQUESTED'
const INVITE_ADMIN_SUCCESS = 'INVITE_ADMIN_SUCCESS'
const INVITE_ADMIN_FAILED = 'INVITE_ADMIN_FAILED'
const DELETE_ADMIN_REQUESTED = 'DELETE_ADMIN_REQUESTED'
const DELETE_ADMIN_SUCCESS = 'DELETE_ADMIN_SUCCESS'
const DELETE_ADMIN_FAILED = 'DELETE_ADMIN_FAILED'
const CANCEL_ADMIN_INVITATION_REQUESTED = 'CANCEL_ADMIN_INVITATION_REQUESTED'
const CANCEL_ADMIN_INVITATION_SUCCEEDED = 'CANCEL_ADMIN_INVITATION_SUCCEEDED'
const CANCEL_ADMIN_INVITATION_FAILED = 'CANCEL_ADMIN_INVITATION_FAILED'
const SET_ADMINS_PAGINATION = 'SET_ADMINS_PAGINATION'
