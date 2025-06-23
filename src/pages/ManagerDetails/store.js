import { put, takeLatest, select } from 'redux-saga/effects'
import { fetch } from '@pro_boa/js'
import { oidcUserManager } from 'identity'
import { BASE_URL_WEB, defaultField, defaultOrderAsc, emptySearch, notification } from 'constants/'
import { openBannerAction } from 'components/Common/Banner/store'
import Text from './text.json'
import { fetchManagersAction } from 'pages/Manager/store'

const initialUserState = {
  error: false,
  Id: '',
  FirstName: '',
  LastName: '',
  Email: '',
  Photo: '',
  LastConnectionDate: '',
  Teams: [{
    Id: '',
    Name: '',
    Image: '',
    Description: '',
    ManagerName: '',
    ManagerId: '',
    LearnersCount: null,
    OrganizationId: ''
  }],
  AllTeams: [],
  HasActiveLicense: null
}

export const reducer = (state = initialUserState, { type, data }) => {
  switch (type) {
    case GET_MANAGER_DETAIL_SUCCESS:
      return {
        ...state,
        ...data
      }
    case GET_MANAGER_DETAIL_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_ALL_TEAMS_SUCCESS:
      return {
        ...state,
        AllTeams: data
      }
    case GET_ALL_TEAMS_FAILED:
      return {
        ...state,
        AllTeams: data
      }
    default:
      return state
  }
}

export const fetchManagerDetailsAction = (id) => ({ type: MANAGER_DETAIL_FETCH_REQUESTED, id })
export const fetchTeamsAction = (organizationId, rowsPerPage, skip, asc, field, search) => ({ type: TEAMS_FETCH_REQUESTED, organizationId, rowsPerPage, skip, asc, field, search })
export const addManagerToTeamAction = (teamId, managerId) => ({ type: ASSIGN_MANAGER_REQUESTED, teamId, managerId })
export const removeManagerAction = (managerId, hasTeams) => ({ type: REMOVE_MANAGER_REQUESTED, managerId, hasTeams })
export const removeManagerFromTeamAction = (teamId, managerId) => ({ type: REMOVE_MANAGER_TEAM_REQUESTED, teamId, managerId })

const getManagersSkip = ({ managers }) => managers.managersSkip
const getManagersRowPerPage = ({ managers }) => managers.managersRowPerPage

function * fetchManagerDetails ({ id }) {
  try {
    const response = yield fetch(queries.getManagerDetails(id), { userManager: oidcUserManager })
    yield put({ type: GET_MANAGER_DETAIL_SUCCESS, data: response })
  } catch (err) {
    yield put({ type: GET_MANAGER_DETAIL_FAILED, data: err })
  }
}

function * fetchTeams ({ organizationId, rowsPerPage, skip, asc, field = '', search = '' }) {
  try {
    const response = yield fetch(queries.getTeamsData(rowsPerPage, skip, asc, field, search), { userManager: oidcUserManager })
    yield put({ type: GET_ALL_TEAMS_SUCCESS, data: response?.Items })
  } catch (err) {
    yield put({ type: GET_ALL_TEAMS_FAILED, data: err })
  }
}

function * assignManager ({ teamId, managerId }) {
  const formatedBody = { teamId, userId: managerId }
  try {
    yield fetch(queries.assignManager, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formatedBody), nojson: true, userManager: oidcUserManager })
    yield put({ type: ASSIGN_MANAGER_SUCCESS })
    yield put(openBannerAction(Text.attachSuccess, notification.success))
    yield put(fetchManagerDetailsAction(managerId))
  } catch (err) {
    yield put({ type: ASSIGN_MANAGER_FAIL, data: err })
    yield put(openBannerAction(Text.attachFailed, notification.failed))
  }
}

function * removeManagerTeam ({ teamId, managerId }) {
  const formatedBody = { teamId, managerId }
  try {
    yield fetch(queries.removeManagerTeam, { method: 'delete', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formatedBody), nojson: true, userManager: oidcUserManager })
    yield put({ type: REMOVE_MANAGER_TEAM_SUCCESS })
    yield put(openBannerAction(Text.detachSuccess, notification.success))
    yield put(fetchManagerDetailsAction(managerId))
  } catch (err) {
    yield put({ type: REMOVE_MANAGER_TEAM_FAIL, data: err })
    yield put(openBannerAction(Text.detachFailed, notification.failed))
  }
}

function * removeManager ({ managerId, hasTeams }) {
  const managersSkip = yield select(getManagersSkip)
  const managersRowPerPage = yield select(getManagersRowPerPage)
  const formatedBody = {
    managerId,
    fromTeams: hasTeams
  }
  try {
    yield fetch(queries.removeManager, { method: 'delete', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formatedBody), nojson: true, userManager: oidcUserManager })
    yield put({ type: REMOVE_MANAGER_SUCCESS })
    yield put(openBannerAction(Text.detachSuccess, Text.success))
    yield put(fetchManagersAction(managersRowPerPage, managersSkip, defaultOrderAsc, defaultField, emptySearch))
  } catch (err) {
    yield put({ type: REMOVE_MANAGER_FAIL, data: err })
  }
}

export function * managerDetailsRootSaga () {
  yield takeLatest(MANAGER_DETAIL_FETCH_REQUESTED, fetchManagerDetails)
  yield takeLatest(TEAMS_FETCH_REQUESTED, fetchTeams)
  yield takeLatest(ASSIGN_MANAGER_REQUESTED, assignManager)
  yield takeLatest(REMOVE_MANAGER_REQUESTED, removeManager)
  yield takeLatest(REMOVE_MANAGER_TEAM_REQUESTED, removeManagerTeam)
}

const queries = {
  getManagerDetails: (id) => `${BASE_URL_WEB}/Manager/${id}`,
  assignManager: `${BASE_URL_WEB}/Manager/assign`,
  removeManager: `${BASE_URL_WEB}/Manager/fromOrganization`,
  removeManagerTeam: `${BASE_URL_WEB}/Manager/fromTeam`,
  getTeamsData: (take, skip, asc, field, search) => `${BASE_URL_WEB}/Team?Take=${take}${skip ? `&Skip=${skip}` : ''}${asc ? `&OrderedByAsc=${asc}` : ''}${field ? `&OrderBy=${field}` : ''}${search ? `&Search=${search}` : ''}`
}

const GET_MANAGER_DETAIL_SUCCESS = 'GET_MANAGER_DETAIL_SUCCESS'
const GET_MANAGER_DETAIL_FAILED = 'GET_MANAGER_DETAIL_FAILED'
const MANAGER_DETAIL_FETCH_REQUESTED = 'MANAGER_DETAIL_FETCH_REQUESTED'
const TEAMS_FETCH_REQUESTED = 'TEAMS_FETCH_REQUESTED'
const GET_ALL_TEAMS_SUCCESS = 'GET_TEAMS_ALL_SUCCESS'
const GET_ALL_TEAMS_FAILED = 'GET_TEAMS_ALL_FAILED'
const ASSIGN_MANAGER_REQUESTED = 'ASSIGN_MANAGER_REQUESTED'
const ASSIGN_MANAGER_SUCCESS = 'ASSIGN_MANAGER_SUCCESS'
const ASSIGN_MANAGER_FAIL = 'ASSIGN_MANAGER_FAIL'
const REMOVE_MANAGER_REQUESTED = 'REMOVE_MANAGER_REQUESTED'
const REMOVE_MANAGER_SUCCESS = 'REMOVE_MANAGER_SUCCESS'
const REMOVE_MANAGER_FAIL = 'REMOVE_MANAGER_FAIL'
const REMOVE_MANAGER_TEAM_REQUESTED = 'REMOVE_MANAGER_TEAM_REQUESTED'
const REMOVE_MANAGER_TEAM_SUCCESS = 'REMOVE_MANAGER_TEAM_SUCCESS'
const REMOVE_MANAGER_TEAM_FAIL = 'REMOVE_MANAGER_TEAM_FAIL'
