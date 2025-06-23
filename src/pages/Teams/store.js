import { put, debounce, takeLatest, select } from 'redux-saga/effects'
import { fetch } from '@pro_boa/js'
import { oidcUserManager } from 'identity'
import { BASE_URL_WEB, defaultOrderAsc, DMYDateFormat, emptySearch, notification } from 'constants/'
import { TeamDetailsNeutralPath, TeamsPath } from 'Routes'
import { push } from 'connected-react-router'
import { exportTeamsToExcel, isExpired } from 'helpers'
import Text from './text.json'
import { TurnOffLoaderAction, TurnOnLoaderAction } from 'store/config'
import { openBannerAction } from 'store/notification'
import moment from 'moment'

const initialUserState = {
  error: false,
  count: 0,
  TeamsWithNoManagers: 0,
  TeamsWithNoLearners: 0,
  Total: 0,
  data: [],
  list: [],
  allTeams: []
}

export const reducer = (state = initialUserState, { type, data }) => {
  switch (type) {
    case GET_TEAMS_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_TEAMS_RESET_SUCCESS:
      return {
        ...state,
        ...data
      }
    case GET_TEAMS_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          ...data.data
        ]
      }
    case ADD_TEAM_FAILED:
      return {
        ...state,
        error: data
      }
    case ADD_TEAM_SUCCESS:
      return {
        ...state,
        ...data
      }
    case DELETE_TEAM_FAILED:
      return {
        ...state,
        error: data
      }
    case DELETE_TEAM_SUCCESS:
      return {
        ...state,
        ...data
      }
    case GET_TEAM_BY_ID_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_TEAM_BY_ID_SUCCESS:
      return {
        ...state,
        selectedTeam: data
      }
    case LIST_TEAMS_FETCH_SUCCESS:
      return {
        ...state,
        list: data
      }
    case GET_ALL_TEAMS_SUCCESS:
      return {
        ...state,
        allTeams: data
      }
    case GET_ALL_TEAMS_FAILED:
      return {
        ...state,
        error: data
      }
    case SET_TEAMS_PAGINATION:
      return {
        ...state,
        teamsSkip: data.skip,
        teamsRowPerPage: data.rowsPerPage
      }
    default:
      return state
  }
}

const sortField = 'Name'
export const fetchTeamsAction = (organizationId, rowsPerPage, skip, asc, field, search, managerId) => ({ type: TEAMS_FETCH_REQUESTED, organizationId, rowsPerPage, skip, asc, field, search, managerId })
export const addTeamAction = (name, description, image) => ({ type: ADD_TEAM_REQUESTED, name, description, image })
export const deleteTeamAction = (teamId) => ({ type: DELETE_TEAM_REQUESTED, teamId })
export const fetchTeamAction = (team) => ({ type: GET_TEAM_BY_ID_REQUESTED, team })
export const downloadTeamReportAction = (teamId, fileName) => ({ type: DOWNLOAD_TEAMS_REPORT_REQUESTED, teamId, fileName })
export const fetchListTeamsAction = () => ({ type: LIST_TEAMS_FETCH_REQUESTED })
export const fetchAllTeamsAction = (managerId) => ({ type: GET_ALL_TEAMS_REQUESTED, managerId })
export const setTeamsPagination = (skip, rowsPerPage) => ({ type: SET_TEAMS_PAGINATION, data: { skip, rowsPerPage } })

const getIsManager = ({ organizationProfile }) => organizationProfile.isManager
const getOrganizationId = ({ organization }) => organization.id
const getUserIdentity = ({ identity }) => identity.user
const getTeamsSkip = ({ teams }) => teams.teamsSkip
const getTeamsRowPerPage = ({ teams }) => teams.teamsRowPerPage

function * fetchTeams ({ organizationId, rowsPerPage, skip, asc, field = '', search = '', managerId }) {
  try {
    const response = yield fetch(queries.getTeamsData(rowsPerPage, skip, asc, field, search, managerId), { userManager: oidcUserManager })
    const formattedDataUsers = response.Items.map(order => ({ id: order.Id, ...order }))
    yield put({
      type: GET_TEAMS_RESET_SUCCESS,
      data: {
        data: formattedDataUsers,
        count: response.FilteredCount,
        TeamsWithNoManagers: response.TeamsWithNoManagers,
        TeamsWithNoLearners: response.TeamsWithNoLearners,
        Total: response.Total
      }
    })
    yield put(TurnOffLoaderAction())
  } catch (err) {
    yield put({ type: GET_TEAMS_FAILED, data: err })
    yield put(TurnOffLoaderAction())
  }
}
function * fetchAllTeams ({ managerId }) {
  try {
    const response = yield fetch(queries.getAllTeams(managerId), { userManager: oidcUserManager })
    yield put({
      type: GET_ALL_TEAMS_SUCCESS,
      data: response
    })
  } catch (err) {
    yield put({ type: GET_ALL_TEAMS_FAILED, data: err })
  }
}
function * fetchTeam ({ team }) {
  try {
    yield put({ type: GET_TEAM_BY_ID_SUCCESS, data: team })
  } catch (err) {
    yield put({ type: GET_TEAM_BY_ID_FAILED, data: err })
  }
}

function * addTeam ({ name, description, image }) {
  yield put(TurnOnLoaderAction())
  try {
    const body = {
      name,
      description,
      image
    }
    const response = yield fetch(queries.addTeam, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), userManager: oidcUserManager })
    yield put({ type: ADD_TEAM_SUCCESS })
    yield put(push(`${TeamDetailsNeutralPath}/${response.TeamId}`))
    yield put(TurnOffLoaderAction())
  } catch (err) {
    yield put({ type: ADD_TEAM_FAILED, data: err })
    yield put(TurnOffLoaderAction())
  }
}

function * deleteTeam ({ teamId }) {
  const isManager = yield select(getIsManager)
  const user = yield select(getUserIdentity)
  const organizationId = yield select(getOrganizationId)
  const teamsSkip = yield select(getTeamsSkip)
  const teamsRowPerPage = yield select(getTeamsRowPerPage)
  yield put(TurnOnLoaderAction())
  try {
    yield put(push(`${TeamsPath}`))
    yield fetch(queries.deleteTeam(teamId), { method: 'delete', headers: { 'Content-Type': 'application/json' }, nojson: true, userManager: oidcUserManager })
    yield put({ type: DELETE_TEAM_SUCCESS })
    yield put(TurnOffLoaderAction())
    yield put(openBannerAction(Text.deleteTeamSuccess, notification.success))
    yield put(fetchTeamsAction(organizationId, teamsRowPerPage, teamsSkip, defaultOrderAsc, sortField, emptySearch, isManager ? user?.Id : null))
  } catch (err) {
    yield put({ type: DELETE_TEAM_FAILED, data: err })
    yield put(TurnOffLoaderAction())
    yield put(openBannerAction(Text.deleteTeamFailed, notification.failed))
  }
}

function * downloadTeamReport ({ teamId, fileName }) {
  yield put(TurnOnLoaderAction())
  try {
    const response = yield fetch(queries.exportTeamsReport(teamId), { userManager: oidcUserManager })
    const formattedData = response.map(user => {
      const formattedUser = {
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        SubscriptionEndDate: user.SubscriptionEndDate
          ? isExpired(user.SubscriptionEndDate)
              ? Text.withoutSubscription
              : moment(user.SubscriptionEndDate).format(DMYDateFormat)
          : Text.withoutSubscription,
        Team: user.TeamName || Text.withoutTeams,
        Total: user.Total
      }
      const formattedUserCourse = user.Courses.map(course => ({
        Course: course.Course,
        Duration: course.Duration,
        CompletionPercentage: `${course.CompletionPercentage}%`,
        CompletionDuration: course.CompletionDuration,
        LastAccessedDate: moment(course.LastAccessedDate).format(DMYDateFormat)
      }))
      formattedUser.Courses = formattedUserCourse
      return formattedUser
    })
    exportTeamsToExcel(formattedData, fileName)
    yield put({ type: DOWNLOAD_TEAMS_REPORT_SUCCESS })
    yield put(TurnOffLoaderAction())
  } catch (err) {
    yield put({ type: DOWNLOAD_TEAMS_REPORT_FAILED, data: err })
    yield put(TurnOffLoaderAction())
  }
}

function * fetchListTeams () {
  try {
    const response = yield fetch(queries.getListTeams, { userManager: oidcUserManager })
    yield put({ type: LIST_TEAMS_FETCH_SUCCESS, data: response })
  } catch (err) {
    yield put({ type: LIST_TEAMS_FETCH_FAILED, data: err })
  }
}

export function * teamsRootSaga () {
  yield debounce(500, TEAMS_FETCH_REQUESTED, fetchTeams)
  yield takeLatest(ADD_TEAM_REQUESTED, addTeam)
  yield takeLatest(DELETE_TEAM_REQUESTED, deleteTeam)
  yield takeLatest(GET_TEAM_BY_ID_REQUESTED, fetchTeam)
  yield takeLatest(DOWNLOAD_TEAMS_REPORT_REQUESTED, downloadTeamReport)
  yield takeLatest(LIST_TEAMS_FETCH_REQUESTED, fetchListTeams)
  yield takeLatest(GET_ALL_TEAMS_REQUESTED, fetchAllTeams)
}

const queries = {
  getTeamsData: (take, skip, asc, field, search, managerId) => `${BASE_URL_WEB}/Team?take=${take}${managerId ? `&ManagerId=${managerId}&` : ''}${skip ? `&Skip=${skip}` : ''}${asc ? `&OrderedByAsc=${asc}` : ''}${field ? `&OrderBy=${field}` : ''}${search ? `&Search=${search}` : ''}`,
  addTeam: `${BASE_URL_WEB}/Team/team`,
  deleteTeam: (teamId) => `${BASE_URL_WEB}/Team/${teamId}`,
  exportTeamsReport: (teamId) => `${BASE_URL_WEB}/Export/progressions?OrderBy=LastAccessedDate${teamId ? `&teamId=${teamId}` : ''}`,
  getListTeams: `${BASE_URL_WEB}/Team/list`,
  getAllTeams: (managerId) => `${BASE_URL_WEB}/Team/?Take=0${managerId ? `&ManagerId=${managerId}` : ''}`
}

const GET_TEAMS_SUCCESS = 'GET_TEAMS_SUCCESS'
const GET_TEAMS_FAILED = 'GET_TEAMS_FAILED'
const GET_TEAMS_RESET_SUCCESS = 'GET_TEAMS_RESET_SUCCESS'
const TEAMS_FETCH_REQUESTED = 'TEAMS_FETCH_REQUESTED'
const ADD_TEAM_SUCCESS = 'ADD_TEAM_SUCCESS'
const ADD_TEAM_FAILED = 'ADD_TEAM_FAILED'
const ADD_TEAM_REQUESTED = 'ADD_TEAM_REQUESTED'
const DELETE_TEAM_SUCCESS = 'DELETE_TEAM_SUCCESS'
const DELETE_TEAM_FAILED = 'DELETE_TEAM_FAILED'
const DELETE_TEAM_REQUESTED = 'DELETE_TEAM_REQUESTED'
const GET_TEAM_BY_ID_SUCCESS = 'GET_TEAM_BY_ID_SUCCESS'
const GET_TEAM_BY_ID_FAILED = 'GET_TEAM_BY_ID_FAILED'
const GET_TEAM_BY_ID_REQUESTED = 'GET_TEAM_BY_ID_REQUESTED'
const DOWNLOAD_TEAMS_REPORT_REQUESTED = 'DOWNLOAD_TEAMS_REPORT_REQUESTED'
const DOWNLOAD_TEAMS_REPORT_SUCCESS = 'DOWNLOAD_TEAMS_REPORT_SUCCESS'
const DOWNLOAD_TEAMS_REPORT_FAILED = 'DOWNLOAD_TEAMS_REPORT_FAILED'
const LIST_TEAMS_FETCH_SUCCESS = 'LIST_TEAMS_FETCH_SUCCESS'
const LIST_TEAMS_FETCH_FAILED = 'LIST_TEAMS_FETCH_FAILED'
const LIST_TEAMS_FETCH_REQUESTED = 'LIST_TEAMS_FETCH_REQUESTED'
const GET_ALL_TEAMS_REQUESTED = 'GET_ALL_TEAMS_REQUESTED'
const GET_ALL_TEAMS_SUCCESS = 'GET_ALL_TEAMS_SUCCESS'
const GET_ALL_TEAMS_FAILED = 'GET_ALL_TEAMS_FAILED'
const SET_TEAMS_PAGINATION = 'SET_TEAMS_PAGINATION'
