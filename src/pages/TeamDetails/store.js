import { put, select, takeLatest } from 'redux-saga/effects'
import { fetch } from '@pro_boa/js'
import { oidcUserManager } from 'identity'
import { BASE_URL_WEB, defaultOrderAsc, emptySearch, notification } from 'constants/'
import { openBannerAction } from 'components/Common/Banner/store'
import Text from './text.json'
import { TurnOffLoaderAction } from 'store/config'
import { fetchTeamsAction } from 'pages/Teams/store'

const initialTeamState = {
  error: false,
  count: 0,
  learners: [
    {
      Id: '',
      FirstName: '',
      LastName: '',
      CreationDate: '',
      LastConnectionDate: '',
      EndDate: ''
    }
  ],
  Managers: [],
  barChart: []

}

export const reducer = (state = initialTeamState, { type, data }) => {
  switch (type) {
    case GET_TEAM_LEARNER_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_TEAM_LEARNER_SUCCESS:
      return {
        ...state,
        learners: [
          ...state.learners,
          ...data.items
        ],
        learnersCount: data.count
      }
    case GET_TEAM_LEARNER_SUCCESS_RESET: {
      return {
        ...state,
        learners: data.items,
        learnersCount: data.count
      }
    }
    case GET_TEAM_MANAGER_SUCCESS:
      return {
        ...state,
        manager: data
      }
    case GET_TEAM_MANAGER_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_TEAM_BAR_CHART_SUCCESS: {
      return {
        ...state,
        barChart: data
      }
    }
    case GET_TEAM_BAR_CHART_FAILED: {
      return {
        ...state,
        error: data
      }
    }
    case GET_TEAM_DATA_SUCCESS: {
      return {
        ...state,
        ...data
      }
    }
    case GET_TEAM_DATA_FAILED: {
      return {
        ...state,
        error: data
      }
    }
    case GET_TEAM_RECAP_DATA_SUCCESS: {
      return {
        ...state,
        TeamLearningRecap: data
      }
    }
    case GET_TEAM_RECAP_DATA_FAILED: {
      return {
        ...state,
        error: data
      }
    }
    case GET_MANAGER_LIST_SUCCESS: {
      return {
        ...state,
        managersList: data
      }
    }
    case GET_MANAGER_LIST_FAILED: {
      return {
        ...state,
        error: data
      }
    }
    case GET_TEAM_LEARNERS_RECAP_SUCCESS: {
      return {
        ...state,
        teamLearnersRecap: data
      }
    }
    case GET_TEAM_LEARNERS_RECAP_FAILED: {
      return {
        ...state,
        error: data
      }
    }
    case SET_TEAM_LEARNERS_PAGINATION:
      return {
        ...state,
        teamLearnersSkip: data.skip,
        teamLearnersRowPerPage: data.rowsPerPage
      }
    default:
      return state
  }
}

const sortField = 'Name'
export const fetchTeamLearnersAction = (teamId, rowsPerPage, skip, asc, field, search) => ({ type: GET_TEAM_LEARNER_REQUESTED, teamId, rowsPerPage, skip, asc, field, search })
export const fetchTeamManagerAction = (teamId) => ({ type: GET_TEAM_MANAGER_REQUESTED, teamId })
export const fetchTeamBarChartAction = (teamId, dateType, startDate) => ({ type: GET_TEAM_BAR_CHART_REQUESTED, teamId, dateType, startDate })
export const fetchTeamAction = (teamId) => ({ type: GET_TEAM_DATA_REQUESTED, teamId })
export const updateTeamAction = (teamId, name, description, image) => ({ type: UPDATE_TEAM_DATA_REQUESTED, teamId, name, description, image })
export const getTeamRecapAction = (teamId) => ({ type: GET_TEAM_RECAP_DATA_REQUESTED, teamId })
export const detachManagerAction = (organizationId, teamId, managerId) => ({ type: DETACH_MANAGER_REQUESTED, organizationId, teamId, managerId })
export const getManagersListAction = () => ({ type: GET_MANAGER_LIST_REQUESTED })
export const assignManagerAction = (teamId, userId) => ({ type: ASSIGN_MANAGER_TO_TEAM_REQUESTED, teamId, userId })
export const getTeamLearnersRecapAction = (teamId) => ({ type: GET_TEAM_LEARNERS_RECAP_REQUESTED, teamId })
export const setTeamLearnersPagination = (skip, rowsPerPage) => ({ type: SET_TEAM_LEARNERS_PAGINATION, data: { skip, rowsPerPage } })

const getIsManager = ({ organizationProfile }) => organizationProfile.isManager
const getOrganizationId = ({ organization }) => organization.id
const getUserIdentity = ({ identity }) => identity.user
const getTeamsSkip = ({ teams }) => teams.teamsSkip
const getTeamsRowPerPage = ({ teams }) => teams.teamsRowPerPage

function * fetchTeamLearners ({ teamId, rowsPerPage, skip, asc, field = '', search = '' }) {
  try {
    const response = yield fetch(queries.getTeamLearners(teamId, rowsPerPage, skip, asc, field, search), { userManager: oidcUserManager })
    yield put({ type: GET_TEAM_LEARNER_SUCCESS_RESET, data: { items: response.Items, count: response.FilteredCount } })
  } catch (err) {
    yield put({ type: GET_TEAM_LEARNER_FAILED, data: err })
  }
}

function * fetchTeamManager ({ teamId }) {
  try {
    const response = yield fetch(queries.getTeamManager(teamId), { userManager: oidcUserManager })
    yield put({ type: GET_TEAM_MANAGER_SUCCESS, data: response.Items[0] })
  } catch (err) {
    yield put({ type: GET_TEAM_MANAGER_FAILED, data: err })
  }
}

function * fetchTeamBarChart ({ teamId, dateType, startDate }) {
  try {
    const response = yield fetch(queries.getTeamBarChart(teamId, dateType, startDate), { userManager: oidcUserManager })
    yield put({ type: GET_TEAM_BAR_CHART_SUCCESS, data: response })
  } catch (err) {
    yield put({ type: GET_TEAM_BAR_CHART_FAILED, data: err })
  }
}

function * fetchTeam ({ teamId }) {
  try {
    const response = yield fetch(queries.getTeam(teamId), { userManager: oidcUserManager })
    yield put({ type: GET_TEAM_DATA_SUCCESS, data: response })
    yield put(TurnOffLoaderAction())
  } catch (err) {
    yield put({ type: GET_TEAM_DATA_FAILED, data: err })
    yield put(TurnOffLoaderAction())
  }
}

function * updateTeam ({ organizationId, teamId, name, description, image }) {
  const isManager = yield select(getIsManager)
  const user = yield select(getUserIdentity)
  const teamsSkip = yield select(getTeamsSkip)
  const teamsRowPerPage = yield select(getTeamsRowPerPage)
  try {
    const body = {
      teamId,
      name,
      description,
      image
    }
    yield fetch(queries.updateTeam, { method: 'put', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), nojson: true, userManager: oidcUserManager })
    yield put({ type: UPDATE_TEAM_DATA_SUCCESS })
    yield put(openBannerAction(Text.updateTeamSuccess, Text.success))
    yield put(fetchTeamsAction(organizationId, teamsRowPerPage, teamsSkip, defaultOrderAsc, sortField, emptySearch, isManager ? user?.Id : null))
    yield put(fetchTeamAction(teamId))
  } catch (err) {
    yield put(openBannerAction(Text.updateTeamFailed, notification.failed))
    yield put({ type: UPDATE_TEAM_DATA_FAILED, data: err })
  }
}

function * getTeamRecap ({ teamId }) {
  try {
    const response = yield fetch(queries.getTeamRecap(teamId), { userManager: oidcUserManager })
    yield put({ type: GET_TEAM_RECAP_DATA_SUCCESS, data: response })
  } catch (err) {
    yield put({ type: GET_TEAM_RECAP_DATA_FAILED, data: err })
  }
}

function * detachManager ({ organizationId, teamId, managerId }) {
  const isManager = yield select(getIsManager)
  const user = yield select(getUserIdentity)
  const teamsSkip = yield select(getTeamsSkip)
  const teamsRowPerPage = yield select(getTeamsRowPerPage)
  try {
    const body = {
      organizationId,
      teamId,
      managerId
    }
    yield fetch(queries.detachManager, { method: 'delete', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), nojson: true, userManager: oidcUserManager })
    yield put({ type: DETACH_MANAGER_SUCCESS })
    yield put(openBannerAction(Text.detachSuccess, Text.success))
    yield put(fetchTeamsAction(organizationId, teamsRowPerPage, teamsSkip, defaultOrderAsc, sortField, emptySearch, isManager ? user?.Id : null))
    yield put(fetchTeamAction(teamId))
  } catch (err) {
    yield put({ type: DETACH_MANAGER_FAILED, data: err })
  }
}

function * getManagersList () {
  try {
    const response = yield fetch(queries.getManagersList, { userManager: oidcUserManager })
    yield put({ type: GET_MANAGER_LIST_SUCCESS, data: response })
  } catch (err) {
    yield put({ type: GET_MANAGER_LIST_FAILED, data: err })
  }
}

function * assignManager ({ teamId, userId }) {
  const isManager = yield select(getIsManager)
  const user = yield select(getUserIdentity)
  const organizationId = yield select(getOrganizationId)
  const teamsSkip = yield select(getTeamsSkip)
  const teamsRowPerPage = yield select(getTeamsRowPerPage)
  try {
    const body = {
      teamId,
      userId
    }
    yield fetch(queries.assignManager, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), nojson: true, userManager: oidcUserManager })
    yield put({ type: ASSIGN_MANAGER_TO_TEAM_SUCCESS })
    yield put(openBannerAction(Text.attachSuccess, Text.success))
    yield put(fetchTeamsAction(organizationId, teamsRowPerPage, teamsSkip, defaultOrderAsc, sortField, emptySearch, isManager ? user?.Id : null))
    yield put(fetchTeamAction(teamId))
  } catch (err) {
    yield put({ type: ASSIGN_MANAGER_TO_TEAM_FAILED, data: err })
  }
}

function * getTeamLearnersRecap ({ teamId }) {
  try {
    const response = yield fetch(queries.getTeamLearnersRecap(teamId), { userManager: oidcUserManager })
    yield put({ type: GET_TEAM_LEARNERS_RECAP_SUCCESS, data: response.Items })
  } catch (err) {
    yield put({ type: GET_TEAM_LEARNERS_RECAP_FAILED, data: err })
  }
}

export function * teamDetailsRootSaga () {
  yield takeLatest(GET_TEAM_LEARNER_REQUESTED, fetchTeamLearners)
  yield takeLatest(GET_TEAM_MANAGER_REQUESTED, fetchTeamManager)
  yield takeLatest(GET_TEAM_BAR_CHART_REQUESTED, fetchTeamBarChart)
  yield takeLatest(GET_TEAM_DATA_REQUESTED, fetchTeam)
  yield takeLatest(UPDATE_TEAM_DATA_REQUESTED, updateTeam)
  yield takeLatest(GET_TEAM_RECAP_DATA_REQUESTED, getTeamRecap)
  yield takeLatest(DETACH_MANAGER_REQUESTED, detachManager)
  yield takeLatest(GET_MANAGER_LIST_REQUESTED, getManagersList)
  yield takeLatest(ASSIGN_MANAGER_TO_TEAM_REQUESTED, assignManager)
  yield takeLatest(GET_TEAM_LEARNERS_RECAP_REQUESTED, getTeamLearnersRecap)
}

const queries = {
  getTeamLearners: (teamId, take, skip, asc, field, search) => `${BASE_URL_WEB}/Learner?TeamId=${teamId}&Take=${take}&Skip=${skip}&OrderedByAsc=${asc}&OrderBy=${field}&Search=${search}`,
  getTeamManager: (teamId) => `${BASE_URL_WEB}/Manager?TeamId=${teamId}`,
  getTeam: (teamId) => `${BASE_URL_WEB}/Team/${teamId}`,
  updateTeam: `${BASE_URL_WEB}/Team/update`,
  getTeamBarChart: (userId, dateType, startDate) => `${BASE_URL_WEB}/Organization/totalView?UserId=${userId}&DateType=${dateType}&ProgressDate.DateTime=${startDate}`,
  getTeamRecap: (teamId) => `${BASE_URL_WEB}/Export/progressions?TeamId=${teamId}`,
  detachManager: `${BASE_URL_WEB}/Manager/fromTeam`,
  getManagersList: `${BASE_URL_WEB}/Manager/list`,
  assignManager: `${BASE_URL_WEB}/Manager/assign`,
  getTeamLearnersRecap: (teamId) => `${BASE_URL_WEB}/Learner?TeamId=${teamId}&Take=0`
}

const GET_TEAM_LEARNER_REQUESTED = 'GET_TEAM_LEARNER_REQUESTED'
const GET_TEAM_LEARNER_SUCCESS = 'GET_TEAM_LEARNER_SUCCESS'
const GET_TEAM_LEARNER_FAILED = 'GET_TEAM_LEARNER_FAILED'
const GET_TEAM_LEARNER_SUCCESS_RESET = 'GET_TEAM_LEARNER_SUCCESS_RESET'
const GET_TEAM_MANAGER_REQUESTED = 'GET_TEAM_MANAGER_REQUESTED'
const GET_TEAM_MANAGER_SUCCESS = 'GET_TEAM_MANAGER_SUCCESS'
const GET_TEAM_MANAGER_FAILED = 'GET_TEAM_MANAGER_FAILED'
const GET_TEAM_BAR_CHART_REQUESTED = 'GET_TEAM_BAR_CHART_REQUESTED'
const GET_TEAM_BAR_CHART_SUCCESS = 'GET_TEAM_BAR_CHART_SUCCESS'
const GET_TEAM_BAR_CHART_FAILED = 'GET_TEAM_BAR_CHART_FAILED'
const GET_TEAM_DATA_REQUESTED = 'GET_TEAM_DATA_REQUESTED'
const GET_TEAM_DATA_SUCCESS = 'GET_TEAM_DATA_SUCCESS'
const GET_TEAM_DATA_FAILED = 'GET_TEAM_DATA_FAILED'
const UPDATE_TEAM_DATA_REQUESTED = 'UPDATE_TEAM_DATA_REQUESTED'
const UPDATE_TEAM_DATA_SUCCESS = 'UPDATE_TEAM_DATA_SUCCESS'
const UPDATE_TEAM_DATA_FAILED = 'UPDATE_TEAM_DATA_FAILED'
const GET_TEAM_RECAP_DATA_REQUESTED = 'GET_TEAM_RECAP_DATA_REQUESTED'
const GET_TEAM_RECAP_DATA_SUCCESS = 'GET_TEAM_RECAP_DATA_SUCCESS'
const GET_TEAM_RECAP_DATA_FAILED = 'GET_TEAM_RECAP_DATA_FAILED'
const DETACH_MANAGER_REQUESTED = 'DETACH_MANAGER_REQUESTED'
const DETACH_MANAGER_SUCCESS = 'DETACH_MANAGER_SUCCESS'
const DETACH_MANAGER_FAILED = 'DETACH_MANAGER_FAILED'
const GET_MANAGER_LIST_REQUESTED = 'GET_MANAGER_LIST_REQUESTED'
const GET_MANAGER_LIST_SUCCESS = 'GET_MANAGER_LIST_SUCCESS'
const GET_MANAGER_LIST_FAILED = 'GET_MANAGER_LIST_FAILED'
const ASSIGN_MANAGER_TO_TEAM_REQUESTED = 'ASSIGN_MANAGER_TO_TEAM_REQUESTED'
const ASSIGN_MANAGER_TO_TEAM_SUCCESS = 'ASSIGN_MANAGER_TO_TEAM_SUCCESS'
const ASSIGN_MANAGER_TO_TEAM_FAILED = 'ASSIGN_MANAGER_TO_TEAM_FAILED'
const GET_TEAM_LEARNERS_RECAP_REQUESTED = 'GET_TEAM_LEARNERS_RECAP_REQUESTED'
const GET_TEAM_LEARNERS_RECAP_SUCCESS = 'GET_TEAM_LEARNERS_RECAP_SUCCESS'
const GET_TEAM_LEARNERS_RECAP_FAILED = 'GET_TEAM_LEARNERS_RECAP_FAILED'
const SET_TEAM_LEARNERS_PAGINATION = 'SET_TEAM_LEARNERS_PAGINATION'
