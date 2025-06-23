import { put, debounce, takeLatest, select, all, take } from 'redux-saga/effects'
import { fetch } from '@pro_boa/js'
import { oidcUserManager } from 'identity'
import { push } from 'connected-react-router'
import { LearnerProfileNeutralPath } from 'Routes'
import {
  BASE_URL_WEB,
  defaultLearnersField,
  defaultLearnersOrderAsc,
  defaultSkip,
  defaultTake,
  emptySearch,
  notification,
  OrganizationLicenseTypeEnum
} from 'constants/'
import { exportLearnersInfoToExcel, exportLearnersToExcel, exportOrganizationsLearningHoursHelper } from 'helpers'
import { openBannerAction } from 'components/Common/Banner/store'
import Text from './text.json'
import { TurnOffLoaderAction, TurnOnLoaderAction } from 'store/config'
import {
  fetchLicenseInfoAction,
  fetchOrganizationAction,
  fetchOrganizationLearnersAction,
  fetchOrganizationNewCoursesAction,
  GET_ORGANIZATION_LEARNERS_REST_SUCCESS,
  GET_ORGANIZATION_LEARNERS_SUCCESS,
  GET_ORGANIZATION_SUCCESS
} from 'pages/Home/store'
import moment from 'moment'

const defaultUserRole = 6

const initialUserState = {
  error: false,
  count: 0,
  data: [],
  Total: 0,
  FilteredCount: 0,
  TotalLearnersWithoutLicense: 0,
  TotalLearnersNotConnected: 0,
  OrganizationRemainingLicenses: 0,
  license: {
    organizationId: '',
    licenseQuantity: 0,
    licenseConsumed: 0,
    licensesRemaining: 0
  },
  noLicenseLearners: [],
  neverConnectedLearners: [],
  invitedLearner: {
    Id: '',
    FirstName: null,
    LastName: null,
    Photo: null,
    Email: null,
    CreationDate: '',
    LastConnectionDate: null,
    BillingCycle: null,
    OrganizationLicenseType: null,
    EndDate: null,
    HasActiveLicense: false,
    TeamId: null,
    TeamName: null,
    InvitationId: '',
    InvitationEmail: ''
  },
  lastResendWelcomeDate: null,
  from: null,
  to: null
}

export const reducer = (state = initialUserState, { type, data }) => {
  switch (type) {
    case GET_LEARNERS_RESET_SUCCESS:
      return {
        ...state,
        ...data
      }
    case GET_LEARNERS_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...data.data]
      }
    case GET_LEARNERS_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_LEARNERS_COUNT_SUCCESS:
      return {
        ...state,
        ...data
      }
    case GET_LEARNERS_COUNT_FAIL:
      return {
        ...state,
        error: data
      }
    case GET_LEARNERS_WITHOUT_LICENSE_COUNT_SUCCESS:
      return {
        ...state,
        ...data
      }
    case GET_LEARNERS_WITHOUT_LICENSE_COUNT_FAIL:
      return {
        ...state,
        error: data
      }
    case INVITE_LEARNERS_FAILED:
      return {
        ...state,
        error: data
      }
    case INVITE_LEARNERS_SUCCESS:
      return {
        ...state,
        ...data
      }
    case DETACH_LEARNERS_FROM_TEAM_SUCCESS:
      return {
        ...state,
        ...data
      }
    case DETACH_LEARNERS_FROM_TEAM_FAILED:
      return {
        ...state,
        error: data
      }
    case ADD_LEARNERS_TO_TEAM_SUCCESS:
      return {
        ...state,
        ...data
      }
    case ADD_LEARNERS_TO_TEAM_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_INVITED_LEARNER_INFOS_REQUESTED:
      return {
        ...state,
        invitedLearner: {
          ...state.invitedLearner,
          ...data
        }
      }
    case GET_NO_ACTIVE_LICENSE_LEARNERS_SUCCESS:
      return {
        ...state,
        noLicenseLearners: [...data]
      }
    case GET_NO_ACTIVE_LICENSE_LEARNERS_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_NEVER_CONNECTED_LEARNERS_SUCCESS:
      return {
        ...state,
        neverConnectedLearners: [...data]
      }
    case GET_NEVER_CONNECTED_LEARNERS_FAILED:
      return {
        ...state,
        error: data
      }
    case AFFECT_BULK_LICENSES_FAILED:
      return {
        ...state,
        error: data
      }
    case UPDATE_RESEND_WELCOME_DATE:
      return {
        ...state,
        lastResendWelcomeDate: data
      }
    case SET_LEARNERS_PAGINATION:
      return {
        ...state,
        learnersSkip: data.skip,
        learnersRowPerPage: data.rowsPerPage
      }
    case SET_LEARNERS_REPORT_DATES:
      return {
        ...state,
        from: data.from,
        to: data.to
      }
    default:
      return state
  }
}

export const fetchLearnersAction = (turnOffLoaderWhenDone, rowsPerPage, skip, field, asc, search, managerId) => ({ type: LEARNERS_FETCH_REQUESTED, turnOffLoaderWhenDone, rowsPerPage, skip, field, asc, search, managerId })
export const fetchLearnersCountAction = (userRole = defaultUserRole) => ({ type: LEARNERS_COUNT_FETCH_REQUESTED, userRole })
export const fetchLearnersWithoutCountAction = (userRole = defaultUserRole, hasActiveLicense) => ({ type: LEARNERS_COUNT_WITHOUT_LICENSE_FETCH_REQUESTED, userRole, hasActiveLicense })
export const inviteLearnersAction = (emails, subscriptionType, teamId, next, error) => ({ type: INVITE_LEARNERS_REQUESTED, emails, subscriptionType, teamId, next, error })
export const detachLearnerFromTeamAction = (learnersId) => ({ type: DETACH_LEARNERS_FROM_TEAM_REQUESTED, learnersId })
export const assignLearnersToTeamAction = (organizationId, learnersId, teamId) => ({ type: ADD_LEARNERS_TO_TEAM_REQUESTED, organizationId, learnersId, teamId })
export const fetchLearnersProgressionAction = (from, to) => ({ type: GET_ORGANIZATION_PROGRESSION_REQUESTED, from, to })
export const fetchLearnersInfosAction = () => ({ type: GET_LEARNERS_EXPORT_REQUESTED })
export const fetchInvitedLearnerInfosAction = (userData) => ({ type: GET_INVITED_LEARNER_INFOS_REQUESTED, data: userData })
export const initHomePageAction = () => ({ type: INIT_HOME_PAGE })
export const updateLearnersAfterInviteAction = () => ({ type: UPDATE_LEARNERS_AFTER_INVITE })
export const createLearnerAction = (firstName, lastName, email, teamId, organizationLicenseType, licenseAssigned) => ({ type: CREATE_LEARNER_REQUESTED, firstName, lastName, email, teamId, organizationLicenseType, licenseAssigned })
export const getNoActiveLicenseLearnersAction = () => ({ type: GET_NO_ACTIVE_LICENSE_LEARNERS_REQUESTED })
export const affectBulkLicensesAction = (data) => ({ type: AFFECT_BULK_LICENSES_REQUESTED, data })
export const resendWelcomeMessageAction = (ids, noDate) => ({ type: RESEND_WELCOME_MESSAGE_REQUESTED, ids, noDate })
export const requestCoursesAccessAction = (id) => ({ type: REQUEST_COURSES_ACCESS_REQUESTED, id })
export const fetchNeverConnectedLearnersAction = () => ({ type: NEVER_CONNECTED_LEARNERS_FETCH_REQUESTED })
export const setLearnersPagination = (skip, rowsPerPage) => ({ type: SET_LEARNERS_PAGINATION, data: { skip, rowsPerPage } })
export const fetchVideosWatchedAction = (from, to) => ({ type: EXPORT_VIDEOS_WATCHED_REQUESTED, from, to })
export const setLearnersReportDatesAction = (from, to) => ({ type: SET_LEARNERS_REPORT_DATES, data: { from, to } })

const getOrganizationLicenseTypes = ({ referential }) => referential.organizationLicenseTypes
const getIsManager = ({ organizationProfile }) => organizationProfile.isManager
const getUserIdentity = ({ identity }) => identity.user
const getLearnersSkip = ({ learners }) => learners.learnersSkip
const getLearnersRowPerPage = ({ learners }) => learners.learnersRowPerPage
const getOrganizationId = ({ organization }) => organization.Id

const takeDefault = 0
const skipNone = 0

function * initHomePage () {
  const turnOffLoaderWhenDone = false
  yield put(TurnOnLoaderAction())
  yield all([
    put(fetchOrganizationAction()),
    put(fetchLearnersAction(turnOffLoaderWhenDone, takeDefault, skipNone)),
    put(fetchOrganizationNewCoursesAction())
  ])
  yield all([
    take(GET_ORGANIZATION_SUCCESS),
    take([GET_LEARNERS_RESET_SUCCESS, GET_LEARNERS_SUCCESS])
  ])
  yield put(TurnOffLoaderAction())
}

function * updateLearnersAfterInvite () {
  const isManager = yield select(getIsManager)
  const user = yield select(getUserIdentity)
  const learnersSkip = yield select(getLearnersSkip)
  const learnersRowPerPage = yield select(getLearnersRowPerPage)
  const turnOffLoaderWhenDone = false
  yield put(TurnOnLoaderAction())
  yield all([
    put(fetchLearnersAction(turnOffLoaderWhenDone, learnersRowPerPage, learnersSkip, defaultLearnersField, defaultLearnersOrderAsc, emptySearch, isManager ? user?.Id : null)),
    put(fetchOrganizationLearnersAction(defaultTake, defaultSkip))
  ])
  yield all([
    take(GET_LEARNERS_RESET_SUCCESS),
    take([GET_ORGANIZATION_LEARNERS_REST_SUCCESS, GET_ORGANIZATION_LEARNERS_SUCCESS])
  ])
  yield put(TurnOffLoaderAction())
}

function * fetchLearners ({ turnOffLoaderWhenDone, rowsPerPage, skip, field, asc, search, managerId }) {
  try {
    const response = yield fetch(queries.getLearners(rowsPerPage, skip, field, asc, search, managerId), { userManager: oidcUserManager })
    yield put({
      type: GET_LEARNERS_RESET_SUCCESS,
      data: {
        data: response.Items,
        ...response
      }
    })
    if (turnOffLoaderWhenDone) yield put(TurnOffLoaderAction())
  } catch (err) {
    yield put({ type: GET_LEARNERS_FAILED, data: err })
    if (turnOffLoaderWhenDone) yield put(TurnOffLoaderAction())
  }
}

function * inviteLearners ({ emails, subscriptionType, teamId, next, error }) {
  const organizationLicenseTypes = yield select(getOrganizationLicenseTypes)
  yield put(TurnOnLoaderAction())
  try {
    const body = { emails: emails }
    if (organizationLicenseTypes[subscriptionType] !== OrganizationLicenseTypeEnum.None) body.organizationLicenseType = subscriptionType
    if (teamId) body.teamId = teamId
    yield fetch(queries.inviteLearners, { method: 'post', headers: { 'Content-Type': 'application/json' }, nojson: true, body: JSON.stringify(body), userManager: oidcUserManager })
    yield put({ type: INVITE_LEARNERS_SUCCESS })
    yield put(openBannerAction(Text.inviteSucceeded, notification.success))
    next && next()
    yield put(TurnOffLoaderAction())
  } catch (err) {
    yield put({ type: INVITE_LEARNERS_FAILED, data: err })
    yield put(openBannerAction(Text.inviteFailed, notification.failed))
    error && error()
    yield put(TurnOffLoaderAction())
  }
}

function * detachLearnerFromTeam ({ learnersId }) {
  yield put(TurnOnLoaderAction())
  try {
    const body = {
      learnersId
    }
    yield fetch(queries.detachLearnerFromTeam, { method: 'delete', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), nojson: true, userManager: oidcUserManager })
    yield put({ type: DETACH_LEARNERS_FROM_TEAM_SUCCESS })
    yield put(TurnOffLoaderAction())
  } catch (err) {
    yield put({ type: DETACH_LEARNERS_FROM_TEAM_FAILED, data: err })
    yield put(TurnOffLoaderAction())
  }
}

function * addLearnersToTeam ({ organizationId, learnersId, teamId }) {
  yield put(TurnOnLoaderAction())
  try {
    const body = {
      organizationId,
      learnersId,
      teamId
    }
    yield fetch(queries.addLearnersToTeam, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), nojson: true, userManager: oidcUserManager })
    yield put({ type: ADD_LEARNERS_TO_TEAM_SUCCESS })
    yield put(TurnOffLoaderAction())
  } catch (err) {
    yield put({ type: ADD_LEARNERS_TO_TEAM_FAILED, data: err })
    yield put(TurnOffLoaderAction())
  }
}

function * fetchOrganizationProgression ({ from, to }) {
  try {
    yield put(TurnOnLoaderAction())
    const response = yield fetch(queries.getOrganizationProgression(from, to), { userManager: oidcUserManager })
    exportLearnersToExcel(response, Text.report)
    yield put({ type: GET_ORGANIZATION_PROGRESSION_SUCCESS })
    yield put(TurnOffLoaderAction())
  } catch (err) {
    yield put({ type: GET_ORGANIZATION_PROGRESSION_FAILED, data: err })
    yield put(TurnOffLoaderAction())
  }
}

function * fetchLearnersInfos () {
  const LicenseTypes = yield select(getOrganizationLicenseTypes)
  yield put(TurnOnLoaderAction())
  try {
    const response = yield fetch(queries.getLearnersInfos, { userManager: oidcUserManager })
    exportLearnersInfoToExcel(response.Items, Text.learnersList, LicenseTypes)
    yield put({ type: GET_LEARNERS_EXPORT_SUCCESS })
    yield put(TurnOffLoaderAction())
  } catch (err) {
    yield put({ type: GET_LEARNERS_EXPORT_FAILED, data: err })
    yield put(TurnOffLoaderAction())
  }
}

function * createLearner ({ firstName, lastName, email, teamId, organizationLicenseType, licenseAssigned }) {
  try {
    const body = {
      firstName,
      lastName,
      email,
      organizationLicenseType,
      licenseAssigned
    }
    if (teamId) body.teamId = teamId
    const response = yield fetch(queries.createLearner, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), userManager: oidcUserManager })
    yield put({ type: CREATE_LEARNER_SUCCESS })
    yield put(push(`${LearnerProfileNeutralPath}/${response}`))
  } catch (err) {
    yield put({ type: CREATE_LEARNER_FAILED, data: err })
    yield put(openBannerAction(Text.learnerNotCreated, notification.failed))
  }
}

function * fetchNoActiveLicenseLearners () {
  try {
    const response = yield fetch(queries.getNoActiveLicenseLearners, { userManager: oidcUserManager })
    yield put({ type: GET_NO_ACTIVE_LICENSE_LEARNERS_SUCCESS, data: response.Items })
  } catch (err) {
    yield put({ type: GET_NO_ACTIVE_LICENSE_LEARNERS_FAILED, data: err })
  }
}

function * affectBulkLicenses ({ data }) {
  const learnersSkip = yield select(getLearnersSkip)
  const learnersRowPerPage = yield select(getLearnersRowPerPage)
  const turnOffLoaderWhenDone = false
  const noLoaderAction = true
  try {
    yield fetch(queries.affectBulkLicenses, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), nojson: true, userManager: oidcUserManager })
    yield put({ type: AFFECT_BULK_LICENSES_SUCCESS })
    yield put(openBannerAction(`${data?.learnersIds.length} ${Text.bulkLicensesSucceeded}`, notification.success))
    yield all([
      put(openBannerAction(`${data?.learnersIds.length} ${Text.bulkLicensesSucceeded}`, notification.success)),
      put(fetchLearnersAction(turnOffLoaderWhenDone, learnersRowPerPage, learnersSkip)),
      put(fetchLicenseInfoAction(noLoaderAction))
    ])
  } catch (err) {
    yield put({ type: AFFECT_BULK_LICENSES_FAILED, data: err })
    yield put(openBannerAction(Text.bulkLicensesFailed, notification.failed))
  }
}

function * resendWelcomeMessage ({ ids, noDate }) {
  const body = [...ids]
  try {
    yield fetch(queries.resendWelcomeMessage, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), nojson: true, userManager: oidcUserManager })
    yield put({ type: RESEND_WELCOME_MESSAGE_SUCCESS })
    if (!noDate) yield put({ type: UPDATE_RESEND_WELCOME_DATE, data: moment().format() })
    yield put(openBannerAction(Text.resendMessagesSucceeded, notification.success))
  } catch (err) {
    yield put({ type: RESEND_WELCOME_MESSAGE_FAILED, data: err })
    yield put(openBannerAction(Text.bulkLicensesFailed, notification.failed))
  }
}

function * requestLicenseForLearner ({ id }) {
  try {
    yield fetch(queries.requestLicenseForLearner(id), { method: 'post', headers: { 'Content-Type': 'application/json' }, nojson: true, userManager: oidcUserManager })
    yield put({ type: REQUEST_COURSES_ACCESS_SUCCESS })
    yield put(openBannerAction(Text.resendMessagesSucceeded, notification.success))
  } catch (err) {
    yield put({ type: REQUEST_COURSES_ACCESS_FAILED, data: err })
    yield put(openBannerAction(Text.bulkLicensesFailed, notification.failed))
  }
}

function * fetchNeverConnectedLearners () {
  try {
    const response = yield fetch(queries.getNeverConnectedLearners, { userManager: oidcUserManager })
    yield put({ type: GET_NEVER_CONNECTED_LEARNERS_SUCCESS, data: response.Items })
  } catch (err) {
    yield put({ type: GET_NEVER_CONNECTED_LEARNERS_FAILED, data: err })
  }
}

function * fetchVideosWatched ({ from, to }) {
  const organizationId = yield select(getOrganizationId)
  try {
    yield put(TurnOnLoaderAction())
    const response = yield fetch(queries.getVideosWatched(organizationId, from, to), { userManager: oidcUserManager })
    exportOrganizationsLearningHoursHelper(response, Text.learning)
    yield put({ type: EXPORT_VIDEOS_WATCHED_SUCCESS })
    yield put(TurnOffLoaderAction())
  } catch (err) {
    yield put({ type: EXPORT_VIDEOS_WATCHED_FAILED, data: err })
    yield put(TurnOffLoaderAction())
  }
}

export function * learnersRootSaga () {
  yield debounce(500, LEARNERS_FETCH_REQUESTED, fetchLearners)
  yield takeLatest(INVITE_LEARNERS_REQUESTED, inviteLearners)
  yield takeLatest(DETACH_LEARNERS_FROM_TEAM_REQUESTED, detachLearnerFromTeam)
  yield takeLatest(ADD_LEARNERS_TO_TEAM_REQUESTED, addLearnersToTeam)
  yield takeLatest(GET_ORGANIZATION_PROGRESSION_REQUESTED, fetchOrganizationProgression)
  yield takeLatest(GET_LEARNERS_EXPORT_REQUESTED, fetchLearnersInfos)
  yield takeLatest(INIT_HOME_PAGE, initHomePage)
  yield takeLatest(UPDATE_LEARNERS_AFTER_INVITE, updateLearnersAfterInvite)
  yield takeLatest(CREATE_LEARNER_REQUESTED, createLearner)
  yield takeLatest(GET_NO_ACTIVE_LICENSE_LEARNERS_REQUESTED, fetchNoActiveLicenseLearners)
  yield takeLatest(AFFECT_BULK_LICENSES_REQUESTED, affectBulkLicenses)
  yield takeLatest(RESEND_WELCOME_MESSAGE_REQUESTED, resendWelcomeMessage)
  yield takeLatest(REQUEST_COURSES_ACCESS_REQUESTED, requestLicenseForLearner)
  yield takeLatest(NEVER_CONNECTED_LEARNERS_FETCH_REQUESTED, fetchNeverConnectedLearners)
  yield takeLatest(EXPORT_VIDEOS_WATCHED_REQUESTED, fetchVideosWatched)
}

const queries = {
  getLearners: (take, skip, field, asc, search, managerId) => `${BASE_URL_WEB}/Learner?${managerId ? `ManagerId=${managerId}&` : ''}${take ? `Take=${take}&` : ''}${skip ? `Skip=${skip}&` : 'Skip=0&'}${field ? `OrderBy=${field}` : ''}${asc ? `&OrderedByAsc=${asc}` : ''}${search ? `&Search=${search}` : ''}`,
  getNoActiveLicenseLearners: `${BASE_URL_WEB}/Learner?HasActiveLicense=false&Take=0&Skip=0&OrderBy=LastConnectionDate&OrderedByAsc=true`,
  inviteLearners: `${BASE_URL_WEB}/Learner/invite`,
  detachLearnerFromTeam: `${BASE_URL_WEB}/Organization/Learners/fromTeam`,
  addLearnersToTeam: `${BASE_URL_WEB}/Learner/assignToTeam`,
  getOrganizationProgression: (from, to) => `${BASE_URL_WEB}/Export/progressions?LastAccessedDate.From=${from}&LastAccessedDate.To=${to}`,
  getLearnersInfos: `${BASE_URL_WEB}/Learner?&Take=0`,
  createLearner: `${BASE_URL_WEB}/Learner/learnerWithLicense`,
  affectBulkLicenses: `${BASE_URL_WEB}/Learner/affectBulkLicenses`,
  resendWelcomeMessage: `${BASE_URL_WEB}/Organization/SendLearnersReminder`,
  requestLicenseForLearner: (id) => `${BASE_URL_WEB}/Organization/RequestLicenseForLearner/${id}`,
  getNeverConnectedLearners: `${BASE_URL_WEB}/Learner?HasConnectionDate=false&Take=0&Skip=0&OrderBy=LastConnectionDate&OrderedByAsc=true`,
  getVideosWatched: (organizationId, from, to) => `${BASE_URL_WEB}/Export/exportVideosWatched?OrganizationId=${organizationId}&LastAccessedDate.From=${from}&LastAccessedDate.To=${to}`
}

const GET_NEVER_CONNECTED_LEARNERS_SUCCESS = 'GET_NEVER_CONNECTED_LEARNERS_SUCCESS'
const GET_NEVER_CONNECTED_LEARNERS_FAILED = 'GET_NEVER_CONNECTED_LEARNERS_FAILED'
const NEVER_CONNECTED_LEARNERS_FETCH_REQUESTED = 'NEVER_CONNECTED_LEARNERS_FETCH_REQUESTED'
const LEARNERS_COUNT_FETCH_REQUESTED = 'LEARNERS_COUNT_FETCH_REQUESTED'
const GET_LEARNERS_COUNT_SUCCESS = 'GET_LEARNERS_COUNT_SUCCESS'
const GET_LEARNERS_COUNT_FAIL = 'GET_LEARNERS_COUNT_FAIL'
const GET_LEARNERS_WITHOUT_LICENSE_COUNT_SUCCESS = 'GET_LEARNERS_WITHOUT_LICENSE_COUNT_SUCCESS'
const GET_LEARNERS_WITHOUT_LICENSE_COUNT_FAIL = 'GET_LEARNERS_WITHOUT_LICENSE_COUNT_FAIL'
const LEARNERS_COUNT_WITHOUT_LICENSE_FETCH_REQUESTED = 'LEARNERS_COUNT_WITHOUT_LICENSE_FETCH_REQUESTED'
const INVITE_LEARNERS_REQUESTED = 'INVITE_LEARNERS_REQUESTED'
const INVITE_LEARNERS_SUCCESS = 'INVITE_LEARNERS_SUCCESS'
const INVITE_LEARNERS_FAILED = 'INVITE_LEARNERS_FAILED'
const DETACH_LEARNERS_FROM_TEAM_REQUESTED = 'DETACH_LEARNERS_FROM_TEAM_REQUESTED'
const DETACH_LEARNERS_FROM_TEAM_SUCCESS = 'DETACH_FROM_TEAM_SUCCESS'
const DETACH_LEARNERS_FROM_TEAM_FAILED = 'DETACH_FROM_TEAM_FAILED'
const ADD_LEARNERS_TO_TEAM_REQUESTED = 'ADD_LEARNERS_TO_TEAM_REQUESTED'
const ADD_LEARNERS_TO_TEAM_SUCCESS = 'ADD_LEARNERS_TO_TEAM_SUCCESS'
const ADD_LEARNERS_TO_TEAM_FAILED = 'ADD_LEARNERS_TO_TEAM_FAILED'
const GET_ORGANIZATION_PROGRESSION_REQUESTED = 'GET_ORGANIZATION_PROGRESSION_REQUESTED'
const GET_ORGANIZATION_PROGRESSION_SUCCESS = 'GET_ORGANIZATION_PROGRESSION_SUCCESS'
const GET_ORGANIZATION_PROGRESSION_FAILED = 'GET_ORGANIZATION_PROGRESSION_FAILED'
const GET_LEARNERS_EXPORT_REQUESTED = 'GET_LEARNERS_EXPORT_REQUESTED'
const GET_LEARNERS_EXPORT_SUCCESS = 'GET_LEARNERS_EXPORT_SUCCESS'
const GET_LEARNERS_EXPORT_FAILED = 'GET_LEARNERS_EXPORT_FAILED'
const GET_LEARNERS_RESET_SUCCESS = 'GET_LEARNERS_RESET_SUCCESS'
const GET_INVITED_LEARNER_INFOS_REQUESTED = 'GET_INVITED_LEARNER_INFOS_REQUESTED'
const INIT_HOME_PAGE = 'INIT_HOME_PAGE'
const UPDATE_LEARNERS_AFTER_INVITE = 'UPDATE_LEARNERS_AFTER_INVITE'
const CREATE_LEARNER_REQUESTED = 'CREATE_LEARNER_REQUESTED'
const CREATE_LEARNER_SUCCESS = 'CREATE_LEARNER_SUCCESS'
const CREATE_LEARNER_FAILED = 'CREATE_LEARNER_FAILED'
const GET_NO_ACTIVE_LICENSE_LEARNERS_REQUESTED = 'GET_NO_ACTIVE_LICENSE_LEARNERS_REQUESTED'
const GET_NO_ACTIVE_LICENSE_LEARNERS_SUCCESS = 'GET_NO_ACTIVE_LICENSE_LEARNERS_SUCCESS'
const GET_NO_ACTIVE_LICENSE_LEARNERS_FAILED = 'GET_NO_ACTIVE_LICENSE_LEARNERS_FAILED'
const AFFECT_BULK_LICENSES_REQUESTED = 'AFFECT_BULK_LICENSES_REQUESTED'
const AFFECT_BULK_LICENSES_SUCCESS = 'AFFECT_BULK_LICENSES_SUCCESS'
const AFFECT_BULK_LICENSES_FAILED = 'AFFECT_BULK_LICENSES_FAILED'
const RESEND_WELCOME_MESSAGE_REQUESTED = 'RESEND_WELCOME_MESSAGE_REQUESTED'
const RESEND_WELCOME_MESSAGE_SUCCESS = 'RESEND_WELCOME_MESSAGE_SUCCESS'
const RESEND_WELCOME_MESSAGE_FAILED = 'RESEND_WELCOME_MESSAGE_FAILED'
const REQUEST_COURSES_ACCESS_REQUESTED = 'REQUEST_COURSES_ACCESS_REQUESTED'
const REQUEST_COURSES_ACCESS_SUCCESS = 'REQUEST_COURSES_ACCESS_SUCCESS'
const REQUEST_COURSES_ACCESS_FAILED = 'REQUEST_COURSES_ACCESS_FAILED'
const GET_LEARNERS_SUCCESS = 'GET_LEARNERS_SUCCESS'
const GET_LEARNERS_FAILED = 'GET_LEARNERS_FAILED'
export const LEARNERS_FETCH_REQUESTED = 'LEARNERS_FETCH_REQUESTED'
const UPDATE_RESEND_WELCOME_DATE = 'UPDATE_RESEND_WELCOME_DATE'
const SET_LEARNERS_PAGINATION = 'SET_LEARNERS_PAGINATION'
const EXPORT_VIDEOS_WATCHED_REQUESTED = 'EXPORT_VIDEOS_WATCHED_REQUESTED'
const EXPORT_VIDEOS_WATCHED_SUCCESS = 'EXPORT_VIDEOS_WATCHED_SUCCESS'
const EXPORT_VIDEOS_WATCHED_FAILED = 'EXPORT_VIDEOS_WATCHED_FAILED'
const SET_LEARNERS_REPORT_DATES = 'SET_LEARNERS_REPORT_DATES'
