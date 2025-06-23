import { put, debounce, takeLatest, select } from 'redux-saga/effects'
import { fetch } from '@pro_boa/js'
import { oidcUserManager } from 'identity'
import { BASE_URL_WEB, notification, defaultOrderAsc, defaultManagerSortField, emptySearch } from 'constants/'
import { openBannerAction } from 'components/Common/Banner/store'
import Text from './text.json'
import { TurnOffLoaderAction, TurnOnLoaderAction } from 'store/config'

const initialUserState = {
  error: false,
  Count: 0,
  Items: [],
  FilteredCount: 0,
  searchResults: [],
  invitedManager: {
    InvitationId: null,
    InvitationEmail: null
  }
}

export const reducer = (state = initialUserState, { type, data }) => {
  switch (type) {
    case GET_MANAGERS_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_MANAGERS_SUCCESS:
      return {
        ...state,
        FilteredCount: data.FilteredCount,
        Count: data.Total,
        Items: [
          ...data.Items
        ]
      }
    case RESET_AND_SET_MANAGERS_SUCCESS:
      return {
        ...state,
        FilteredCount: data.FilteredCount,
        Count: data.Total,
        Items: data.Items
      }
    case MANAGER_AFFECT_TO_TEAM_SUCCESS:
      return {
        ...state,
        ...data
      }
    case MANAGER_AFFECT_TO_TEAM_FAILED:
      return {
        ...state,
        error: data
      }
    case MANAGER_DELETE_FROM_TEAM_SUCCESS:
      return {
        ...state,
        ...data
      }
    case MANAGER_DELETE_FROM_TEAM_FAILED:
      return {
        ...state,
        error: data
      }
    case INVITE_MANAGER_TO_TEAM_SUCCESS:
      return {
        ...state,
        ...data
      }
    case INVITE_MANAGER_TO_TEAM_FAILED:
      return {
        ...state,
        error: data
      }
    case SET_INVITED_MANAGER_DATA:
      return {
        ...state,
        invitedManager: data
      }
    case SET_MANAGERS_PAGINATION:
      return {
        ...state,
        managersSkip: data.skip,
        managersRowPerPage: data.rowsPerPage
      }
    default:
      return state
  }
}

export const fetchManagersAction = (rowsPerPage, skip, asc, field, search) => ({ type: MANAGERS_FETCH_REQUESTED, rowsPerPage, skip, asc, field, search })
export const affectManagerToTeamAction = (managerId, teamId) => ({ type: MANAGER_AFFECT_TO_TEAM_REQUESTED, managerId, teamId })
export const deleteManagerFromTeamAction = (managerId, teamId) => ({ type: MANAGER_DELETE_FROM_TEAM_REQUESTED, managerId, teamId })
export const inviteManagerToTeamAction = (email, teamId) => ({ type: INVITE_MANAGER_TO_TEAM_REQUESTED, email, teamId })
export const setInvitedManagerInfo = (managerData) => ({ type: SET_INVITED_MANAGER_DATA, data: managerData })
export const setManagersPagination = (skip, rowsPerPage) => ({ type: SET_MANAGERS_PAGINATION, data: { skip, rowsPerPage } })

const getManagersSkip = ({ managers }) => managers.managersSkip
const getManagersRowPerPage = ({ managers }) => managers.managersRowPerPage

function * fetchManagers ({ rowsPerPage, skip, asc, field, search }) {
  try {
    const response = yield fetch(queries.getManagersData(rowsPerPage, skip, asc, field, search), { userManager: oidcUserManager })
    yield put({ type: GET_MANAGERS_SUCCESS, data: response })
    yield put(TurnOffLoaderAction())
  } catch (err) {
    yield put({ type: GET_MANAGERS_FAILED, data: err })
    yield put(TurnOffLoaderAction())
  }
}

function * affectManagerToTeam ({ userId, teamId }) {
  yield put(TurnOnLoaderAction())
  try {
    const body = {
      teamId,
      userId
    }
    const response = yield fetch(queries.affectManagerToTeam, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), nojson: true, userManager: oidcUserManager })
    yield put({ type: MANAGER_AFFECT_TO_TEAM_SUCCESS, data: response })
    yield put(TurnOffLoaderAction())
  } catch (err) {
    yield put({ type: MANAGER_AFFECT_TO_TEAM_FAILED, data: err })
    yield put(TurnOffLoaderAction())
  }
}

function * deleteManagerFromTeam ({ managerId, teamId }) {
  yield put(TurnOnLoaderAction())
  try {
    const body = {
      teamId,
      managerId
    }
    const response = yield fetch(queries.deleteManagerFromTeam, { method: 'delete', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), nojson: true, userManager: oidcUserManager })
    yield put({ type: MANAGER_DELETE_FROM_TEAM_SUCCESS, data: response })
    yield put(TurnOffLoaderAction())
  } catch (err) {
    yield put({ type: MANAGER_DELETE_FROM_TEAM_FAILED, data: err })
    yield put(TurnOffLoaderAction())
  }
}

function * inviteManagerToTeam ({ email, teamId }) {
  const managersSkip = yield select(getManagersSkip)
  const managersRowPerPage = yield select(getManagersRowPerPage)
  yield put(TurnOnLoaderAction())
  try {
    const body = {
      email,
      teamId
    }
    yield fetch(queries.inviteManager, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), nojson: true, userManager: oidcUserManager })
    yield put({ type: INVITE_MANAGER_TO_TEAM_SUCCESS })
    yield put(openBannerAction(Text.inviteManagerSuccess, notification.success))
    yield put(TurnOffLoaderAction())
    yield put(fetchManagersAction(managersRowPerPage, managersSkip, defaultOrderAsc, defaultManagerSortField, emptySearch))
  } catch (err) {
    yield put({ type: INVITE_MANAGER_TO_TEAM_FAILED, data: err })
    yield put(openBannerAction(Text.inviteManagerFail, notification.failed))
    yield put(TurnOffLoaderAction())
  }
}

export function * managersRootSaga () {
  yield debounce(500, MANAGERS_FETCH_REQUESTED, fetchManagers)
  yield takeLatest(MANAGER_AFFECT_TO_TEAM_REQUESTED, affectManagerToTeam)
  yield takeLatest(MANAGER_DELETE_FROM_TEAM_REQUESTED, deleteManagerFromTeam)
  yield takeLatest(INVITE_MANAGER_TO_TEAM_REQUESTED, inviteManagerToTeam)
}

const queries = {
  getManagersData: (take, skip, asc, field, search) => `${BASE_URL_WEB}/Manager?Take=${take}&Skip=${skip}&OrderedByAsc=${asc}&OrderBy=${field}&Search=${search}`,
  affectManagerToTeam: `${BASE_URL_WEB}/Manager/assign`,
  inviteManager: `${BASE_URL_WEB}/Manager/invite`,
  deleteManagerFromTeam: `${BASE_URL_WEB}/Manager`
}

const GET_MANAGERS_SUCCESS = 'GET_MANAGERS_SUCCESS'
const GET_MANAGERS_FAILED = 'GET_MANAGERS_FAILED'
const MANAGERS_FETCH_REQUESTED = 'MANAGERS_FETCH_REQUESTED'
const MANAGER_AFFECT_TO_TEAM_REQUESTED = 'MANAGER_AFFECT_TO_TEAM_REQUESTED'
const MANAGER_AFFECT_TO_TEAM_SUCCESS = 'MANAGER_AFFECT_TO_TEAM_SUCCESS'
const MANAGER_AFFECT_TO_TEAM_FAILED = 'MANAGER_AFFECT_TO_TEAM_FAILED'
const MANAGER_DELETE_FROM_TEAM_REQUESTED = 'MANAGER_DELETE_FROM_TEAM_REQUESTED'
const MANAGER_DELETE_FROM_TEAM_SUCCESS = 'MANAGER_DELETE_FROM_TEAM_SUCCESS'
const MANAGER_DELETE_FROM_TEAM_FAILED = 'MANAGER_DELETE_FROM_TEAM_FAILED'
const INVITE_MANAGER_TO_TEAM_REQUESTED = 'INVITE_ADMIN_TO_TEAM_REQUESTED'
const INVITE_MANAGER_TO_TEAM_SUCCESS = 'INVITE_ADMIN_TO_TEAM_SUCCESS'
const INVITE_MANAGER_TO_TEAM_FAILED = 'INVITE_ADMIN_TO_TEAM_FAILED'
const RESET_AND_SET_MANAGERS_SUCCESS = 'RESET_AND_SET_MANAGERS_SUCCESS'
const SET_INVITED_MANAGER_DATA = 'SET_INVITED_MANAGER_DATA'
const SET_MANAGERS_PAGINATION = 'SET_MANAGERS_PAGINATION'
