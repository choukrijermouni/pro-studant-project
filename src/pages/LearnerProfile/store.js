import { put, takeLatest, debounce, select } from 'redux-saga/effects'
import { fetch, saveCertificate } from '@pro_boa/js'
import { oidcUserManager } from 'identity'
import { BASE_URL_WEB, defaultField, defaultLearnersField, defaultLearnersOrderAsc, defaultOrderAsc, emptySearch, notification } from 'constants/'
import { openBannerAction } from 'components/Common/Banner/store'
import Text from './text.json'
import { push } from 'connected-react-router'
import { LearnersPath } from 'Routes'
import { exportLearnersToExcel } from 'helpers'
import { fetchLicenseInfoAction } from 'pages/Home/store'
import { TurnOffLoaderAction } from 'store/config'
import { fetchManagersAction } from 'pages/Manager/store'
import { fetchLearnersAction } from 'pages/Learners/store'
import { fetchTeamLearnersAction } from 'pages/TeamDetails/store'

const initialUserState = {
  error: false,
  Id: '',
  FirstName: '',
  LastName: '',
  Photo: '',
  Email: '',
  CreationDate: '',
  LastConnectionDate: '',
  BillingCycle: null,
  EndDate: '',
  HasActiveLicense: null,
  IsActive: null,
  licenseAttributionHistory: [],
  barChart: {
    Total: 0,
    ViewsByDate: {}
  },
  categoryChart: {},
  coursesInProgress: [],
  progression: {},
  lastLicensePopupOpen: false,
  lastLicensePopupClosed: true
}

const sortField = 'CreationDate'

export const reducer = (state = initialUserState, { type, data }) => {
  switch (type) {
    case GET_LEARNER_PROFILE_SUCCESS:
      return {
        ...state,
        ...data
      }
    case GET_LEARNER_PROFILE_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_RECOMMENDED_COURSES_SUCCESS:
      return {
        ...state,
        ...data
      }
    case GET_RECOMMENDED_COURSES_FAILED:
      return {
        ...state,
        error: data
      }
    case LICENSE_ATTRIBUTION_HISTORY_SUCCESS:
      return {
        ...state,
        licenseAttributionHistory: data
      }
    case LICENSE_ATTRIBUTION_HISTORY_FAILED:
      return {
        ...state,
        error: data
      }
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        ...data
      }
    }
    case DELETE_USER_FAILED: {
      return {
        ...state,
        error: data
      }
    }
    case GET_LEARNER_BAR_CHART_SUCCESS: {
      return {
        ...state,
        barChart: data
      }
    }
    case GET_LEARNER_BAR_CHART_FAILED: {
      return {
        ...state,
        error: data
      }
    }
    case GET_LEARNER_CATEGORY_PERFORMANCE_SUCCESS: {
      return {
        ...state,
        categoryChart: data
      }
    }
    case GET_LEARNER_CATEGORY_PERFORMANCE_FAILED: {
      return {
        ...state,
        error: data
      }
    }
    case AFFECT_LICENSE_TO_LEARNER_SUCCESS: {
      return {
        ...state,
        ...data,
        lastLicensePopupOpen: true
      }
    }
    case AFFECT_LICENSE_TO_LEARNER_FAILED: {
      return {
        ...state,
        error: data
      }
    }
    case GET_COURSES_IN_PROGRESS_SUCCESS: {
      return {
        ...state,
        coursesInProgress: {
          ...state.coursesInProgress,
          Data: [
            ...state?.coursesInProgress?.Data,
            ...data.Data
          ]
        }
      }
    }
    case GET_COURSES_IN_PROGRESS_RESET_SUCCESS: {
      return {
        ...state,
        coursesInProgress: data
      }
    }
    case GET_COURSES_IN_PROGRESS_FAILED: {
      return {
        ...state,
        error: data
      }
    }
    case GET_LEARNER_PROGRESSION_SUCCESS: {
      return {
        ...state,
        progression: data
      }
    }
    case GET_LEARNER_PROGRESSION_FAILED: {
      return {
        ...state,
        error: data
      }
    }
    case SWITCH_POPUP_STATE_ACTION: {
      return {
        ...state,
        lastLicensePopupClosed: data
      }
    }
    default:
      return state
  }
}

export const fetchLearnerProfileAction = (id) => ({ type: LEARNER_PROFILE_FETCH_REQUESTED, id })
export const fetchRecommendedCoursesAction = (userId) => ({ type: RECOMMENDED_COURSES_FETCH_REQUESTED, userId })
export const fetchLearnerAttributionHistoryAction = (userId) => ({ type: LICENSE_ATTRIBUTION_HISTORY_REQUESTED, userId })
export const deleteUserAction = (isLearnerProfile, learnersId) => ({ type: DELETE_USER_REQUESTED, isLearnerProfile, learnersId })
export const fetchLearnerBarChartAction = (userId, dateType, startDate, endDate) => ({ type: GET_LEARNER_BAR_CHART_REQUESTED, userId, dateType, startDate, endDate })
export const fetchLearnerCategoryPerformanceAction = (userId, dateType, startDate, endDate) => ({ type: GET_LEARNER_CATEGORY_PERFORMANCE_REQUESTED, userId, dateType, startDate, endDate })
export const affectLicenseToLearnerActions = (userId, organizationLicenseType, licenseAssigned, inform) => ({ type: AFFECT_LICENSE_TO_LEARNER_REQUESTED, userId, organizationLicenseType, licenseAssigned, inform })
export const fetchLearnerCourseInProgressAction = (userId, take, skip, search) => ({ type: GET_COURSES_IN_PROGRESS_REQUESTED, userId, take, skip, search })
export const fetchLearnerProgressionAction = (userId) => ({ type: GET_LEARNER_PROGRESSION_REQUESTED, userId })
export const downloadCertificateAction = (userId, courseId) => ({ type: DOWNLOAD_COURSE_CERTIFICATE_REQUESTED, userId, courseId })
export const downloadUserReportAction = (userId, fullName) => ({ type: DOWNLOAD_REPORT_REQUESTED, userId, fullName })
export const attachUserToTeamAction = (userId, team, currentTeamId) => ({ type: ADD_USER_TO_TEAM_REQUESTED, userId, team, currentTeamId })
export const deleteUserFromTeamAction = (userId, TeamId) => ({ type: REMOVE_USER_FROM_TEAM_REQUESTED, userId, TeamId })
export const reinviteLearnerAction = (invitationId) => ({ type: REINVITE_LEARNER_REQUESTED, invitationId })
export const switchLastLicensePopupAction = data => ({ type: SWITCH_POPUP_STATE_ACTION, data })
export const sendNotificationAction = (emailType) => ({ type: SEND_NOTIFICATION_REQUESTED, emailType })
export const cancelLearnerInvitationAction = (
  invitationId,
  learnerSide,
  turnOffLoaderWhenDone,
  take,
  managerId
) => ({
  type: CANCEL_LEARNER_INVITATION_REQUESTED,
  invitationId,
  learnerSide,
  turnOffLoaderWhenDone,
  take,
  managerId
})

const getUserId = ({ profile }) => profile.Id
const getOrganizationId = ({ organization }) => organization.Id
const getEmailEventTypes = ({ referential }) => referential.emailTypes
const getIsManager = ({ organizationProfile }) => organizationProfile.isManager
const getUserIdentity = ({ identity }) => identity.user
const getOrganizationData = ({ organization }) => organization
const getCurrentTeamId = ({ teamDetails }) => teamDetails.Id
const getLearnersSkip = ({ learners }) => learners.learnersSkip
const getLearnersRowPerPage = ({ learners }) => learners.learnersRowPerPage
const getManagersSkip = ({ managers }) => managers.managersSkip
const getManagersRowPerPage = ({ managers }) => managers.managersRowPerPage
const getTeamLearnersSkip = ({ teamDetails }) => teamDetails.teamLearnersSkip
const getTeamLearnersRowPerPage = ({ teamDetails }) => teamDetails.teamLearnersRowPerPage

function * fetchLearnerProfile ({ id }) {
  try {
    const response = yield fetch(queries.getLearnerProfile(id), { userManager: oidcUserManager })
    yield put({ type: GET_LEARNER_PROFILE_SUCCESS, data: response })
  } catch (err) {
    yield put({ type: GET_LEARNER_PROFILE_FAILED, data: err })
  }
}
function * fetchRecommendedCourses ({ userId }) {
  try {
    const response = yield fetch(queries.getRecommendedCourses(userId), { userManager: oidcUserManager })
    yield put({ type: GET_RECOMMENDED_COURSES_SUCCESS, data: { data: response, count: response.total } })
  } catch (err) {
    yield put({ type: GET_RECOMMENDED_COURSES_FAILED, data: err })
  }
}
function * fetchLearnerAttributionHistory ({ userId }) {
  try {
    const response = yield fetch(queries.getLearnerAttributionHistory(userId), { userManager: oidcUserManager })
    yield put({ type: LICENSE_ATTRIBUTION_HISTORY_SUCCESS, data: response.Items })
  } catch (err) {
    yield put({ type: LICENSE_ATTRIBUTION_HISTORY_FAILED, data: err })
  }
}
function * deleteUser ({ isLearnerProfile, learnersId }) {
  const user = yield select(getUserIdentity)
  const currentTeamId = yield select(getCurrentTeamId)
  const isManager = yield select(getIsManager)
  const learnersRowPerPage = yield select(getLearnersRowPerPage)
  const learnersSkip = yield select(getLearnersSkip)
  const teamLearnersSkip = yield select(getTeamLearnersSkip)
  const teamLearnersRowPerPage = yield select(getTeamLearnersRowPerPage)
  try {
    const body = {
      learnersId
    }
    const response = yield fetch(queries.deleteUser, { method: 'delete', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), nojson: true, userManager: oidcUserManager })
    yield put({ type: DELETE_USER_SUCCESS, data: response })
    if (isLearnerProfile) yield put(push(`${LearnersPath}`))
    yield put(openBannerAction(Text.FeedbackAction.deleteLearnerSuccess, notification.success))
    yield put(fetchLearnersAction(true, learnersRowPerPage, learnersSkip, defaultLearnersField, defaultLearnersOrderAsc, emptySearch, isManager ? user?.Id : null))
    if (currentTeamId) yield put(fetchTeamLearnersAction(currentTeamId, teamLearnersRowPerPage, teamLearnersSkip, defaultOrderAsc, sortField, emptySearch))
  } catch (err) {
    yield put({ type: DELETE_USER_FAILED, data: err })
    yield put(openBannerAction(Text.FeedbackAction.deleteLearnerError, notification.failed))
  }
}
function * fetchLearnerBarChart ({ userId, dateType, startDate, endDate }) {
  try {
    const response = yield fetch(queries.getLearnerBarChart(userId, dateType, startDate, endDate), { userManager: oidcUserManager })
    yield put({ type: GET_LEARNER_BAR_CHART_SUCCESS, data: response })
  } catch (err) {
    yield put({ type: GET_LEARNER_BAR_CHART_FAILED, data: err })
  }
}
function * fetchLearnerCategoryPerformance ({ userId, dateType, startDate, endDate }) {
  try {
    const response = yield fetch(queries.getLearnerCategoryPerformance(userId, dateType, startDate, endDate), { userManager: oidcUserManager })
    yield put({ type: GET_LEARNER_CATEGORY_PERFORMANCE_SUCCESS, data: response })
  } catch (err) {
    yield put({ type: GET_LEARNER_CATEGORY_PERFORMANCE_FAILED, data: err })
  }
}
function * affectLicenseToLearner ({ userId, organizationLicenseType, licenseAssigned, inform }) {
  const currentUserId = yield select(getUserId)
  const isManager = yield select(getIsManager)
  const user = yield select(getUserIdentity)
  const currentTeamId = yield select(getCurrentTeamId)
  const { licenseInfo } = yield select(getOrganizationData)
  const learnersRowPerPage = yield select(getLearnersRowPerPage)
  const learnersSkip = yield select(getLearnersSkip)
  const teamLearnersSkip = yield select(getTeamLearnersSkip)
  const teamLearnersRowPerPage = yield select(getTeamLearnersRowPerPage)
  try {
    const body = {
      userId,
      organizationLicenseType,
      licenseAssigned,
      sendEmailToLearner: inform
    }
    const response = yield fetch(queries.affectLicenseToLearner, { method: 'post', headers: { 'Content-Type': 'application/json' }, nojson: true, body: JSON.stringify(body), userManager: oidcUserManager })
    yield put({ type: AFFECT_LICENSE_TO_LEARNER_SUCCESS, data: response })
    yield put(openBannerAction(Text.FeedbackAction.affectLicenseSuccess, notification.success))
    yield put(fetchLearnersAction(true, learnersRowPerPage, learnersSkip, defaultLearnersField, defaultLearnersOrderAsc, emptySearch, isManager ? user?.Id : null))
    if (currentTeamId) yield put(fetchTeamLearnersAction(currentTeamId, teamLearnersRowPerPage, teamLearnersSkip, defaultLearnersOrderAsc, defaultLearnersField, emptySearch))
    yield put(fetchLearnerProfileAction(currentUserId))
    yield put(fetchLearnerAttributionHistoryAction(currentUserId))
    yield put(fetchLicenseInfoAction())
    yield put(fetchLearnerProfileAction(userId))
    yield put(switchLastLicensePopupAction(licenseInfo.TotalLicensesRemaining - licenseAssigned > 0))
  } catch (err) {
    yield put({ type: AFFECT_LICENSE_TO_LEARNER_FAILED, data: err })
    yield put(openBannerAction(Text.FeedbackAction.affectLicenseError, notification.failed))
  }
}
function * fetchLearnerCourseInProgress ({ userId, take = 10, skip = 0, search = '' }) {
  try {
    const response = yield fetch(queries.getLearnerCourseInProgress(userId, take, skip, search), { userManager: oidcUserManager })
    if (skip === 0) yield put({ type: GET_COURSES_IN_PROGRESS_RESET_SUCCESS, data: response })
    else yield put({ type: GET_COURSES_IN_PROGRESS_SUCCESS, data: response })
    yield put(TurnOffLoaderAction())
  } catch (err) {
    yield put({ type: GET_COURSES_IN_PROGRESS_FAILED, data: err })
    yield put(TurnOffLoaderAction())
  }
}
function * fetchLearnerProgression ({ userId }) {
  try {
    const response = yield fetch(queries.getLearnerProgression(userId), { userManager: oidcUserManager })
    yield put({ type: GET_LEARNER_PROGRESSION_SUCCESS, data: response })
  } catch (err) {
    yield put({ type: GET_LEARNER_PROGRESSION_FAILED, data: err })
  }
}

function * downloadCertificate ({ userId, courseId }) {
  try {
    const response = yield fetch(queries.getCertificate(userId, courseId), { userManager: oidcUserManager })
    saveCertificate(response)
    yield put({ type: DOWNLOAD_COURSE_CERTIFICATE_SUCCESS })
  } catch (err) {
    yield put({ type: DOWNLOAD_COURSE_CERTIFICATE_FAILED, data: err })
  }
}

function * downloadUserReport ({ userId, fullName }) {
  try {
    const response = yield fetch(queries.getLearnerProgression(userId), { userManager: oidcUserManager })
    exportLearnersToExcel(response, fullName)
    yield put({ type: DOWNLOAD_REPORT_SUCCESS })
  } catch (err) {
    yield put({ type: DOWNLOAD_REPORT_FAILED, data: err })
  }
}

function * attachUserToTeam ({ userId, team, currentTeamId }) {
  const user = yield select(getUserIdentity)
  const isManager = yield select(getIsManager)
  const organizationId = yield select(getOrganizationId)
  const learnersRowPerPage = yield select(getLearnersRowPerPage)
  const learnersSkip = yield select(getLearnersSkip)
  const teamLearnersSkip = yield select(getTeamLearnersSkip)
  const teamLearnersRowPerPage = yield select(getTeamLearnersRowPerPage)
  try {
    const bodyAssignToTeam = {
      organizationId,
      learnersId: [
        userId
      ],
      teamId: team.Id
    }
    const bodyRemoveFromTeam = {
      organizationId,
      learnersId: [
        userId
      ],
      teamId: currentTeamId
    }
    if (currentTeamId) yield fetch(queries.deleteUserFromTeam, { method: 'delete', headers: { 'Content-Type': 'application/json' }, nojson: true, body: JSON.stringify(bodyRemoveFromTeam), userManager: oidcUserManager })
    yield fetch(queries.attachUserToTeam, { method: 'post', headers: { 'Content-Type': 'application/json' }, nojson: true, body: JSON.stringify(bodyAssignToTeam), userManager: oidcUserManager })
    yield put({ type: ADD_USER_TO_TEAM_SUCCESS })
    yield put(openBannerAction(Text.FeedbackAction.userAttachedToTeamSuccess, notification.success))
    yield put(fetchLearnersAction(true, learnersRowPerPage, learnersSkip, defaultLearnersField, defaultLearnersOrderAsc, emptySearch, isManager ? user?.Id : null))
    if (currentTeamId) yield put(fetchTeamLearnersAction(currentTeamId, teamLearnersRowPerPage, teamLearnersSkip, defaultLearnersOrderAsc, defaultLearnersField, emptySearch))
    yield put(fetchLearnerProfileAction(userId))
  } catch (err) {
    yield put({ type: ADD_USER_TO_TEAM_FAILED, data: err })
    yield put(openBannerAction(Text.FeedbackAction.userAttachedToTeamError, notification.failed))
  }
}

function * deleteUserFromTeam ({ userId, TeamId }) {
  const user = yield select(getUserIdentity)
  const isManager = yield select(getIsManager)
  const organizationId = yield select(getOrganizationId)
  const currentTeamId = yield select(getCurrentTeamId)
  const learnersRowPerPage = yield select(getLearnersRowPerPage)
  const learnersSkip = yield select(getLearnersSkip)
  const teamLearnersSkip = yield select(getTeamLearnersSkip)
  const teamLearnersRowPerPage = yield select(getTeamLearnersRowPerPage)
  try {
    const body = {
      organizationId,
      learnersId: [
        userId
      ],
      teamId: TeamId
    }
    yield fetch(queries.deleteUserFromTeam, { method: 'delete', headers: { 'Content-Type': 'application/json' }, nojson: true, body: JSON.stringify(body), userManager: oidcUserManager })
    yield put({ type: REMOVE_USER_FROM_TEAM_SUCCESS })
    yield put(openBannerAction(Text.FeedbackAction.userRemovedFromTeamSuccess, notification.success))
    yield put(fetchLearnersAction(true, learnersRowPerPage, learnersSkip, sortField, defaultOrderAsc, emptySearch, isManager ? user?.Id : null))
    if (currentTeamId) yield put(fetchTeamLearnersAction(currentTeamId, teamLearnersRowPerPage, teamLearnersSkip, defaultLearnersOrderAsc, defaultLearnersField, emptySearch))
    yield put(fetchLearnerProfileAction(userId))
  } catch (err) {
    yield put({ type: REMOVE_USER_FROM_TEAM_FAILED, data: err })
    yield put(openBannerAction(Text.FeedbackAction.userRemovedFromTeamError, notification.failed))
  }
}

function * reinviteLearner ({ invitationId }) {
  try {
    yield put({ type: REINVITE_LEARNER_SUCCEEDED })
    yield put(openBannerAction(Text.FeedbackAction.reinviteLearnerSuccess, notification.success))
  } catch (err) {
    yield put({ type: REINVITE_LEARNER_FAILED, data: err })
    yield put(openBannerAction(Text.FeedbackAction.reinviteLearnerError, notification.failed))
  }
}

function * cancelLearnerInvitation ({ invitationId, learnerSide, turnOffLoaderWhenDone, take, managerId }) {
  const learnersRowPerPage = yield select(getLearnersRowPerPage)
  const learnersSkip = yield select(getLearnersSkip)
  const managersSkip = yield select(getManagersSkip)
  const managersRowPerPage = yield select(getManagersRowPerPage)
  try {
    yield fetch(queries.deleteInvitationUser(invitationId), { method: 'delete', headers: { 'Content-Type': 'application/json' }, nojson: true, userManager: oidcUserManager })
    yield put({ type: CANCEL_LEARNER_INVITATION_SUCCEEDED })
    yield put(openBannerAction(Text.FeedbackAction.cancelLeanerInvitationSuccess, notification.success))
    if (!learnerSide) yield put(fetchManagersAction(managersRowPerPage, managersSkip, defaultOrderAsc, defaultField, emptySearch))
    else yield put(fetchLearnersAction(turnOffLoaderWhenDone, learnersRowPerPage, learnersSkip, 'CreationDate', defaultOrderAsc, emptySearch, managerId))
  } catch (err) {
    yield put({ type: CANCEL_LEARNER_INVITATION_FAILED, data: err })
    yield put(openBannerAction(Text.FeedbackAction.cancelLeanerInvitationError, notification.failed))
  }
}

function * sendNotification ({ emailType }) {
  const emailEventTypes = yield select(getEmailEventTypes)
  try {
    yield fetch(queries.sendNotification(emailType), { method: 'post', headers: { 'Content-Type': 'application/json' }, nojson: true, userManager: oidcUserManager })
    yield put({ type: SEND_NOTIFICATION_SUCCEEDED })
    if (emailType === emailEventTypes.OrganizationLicensesRequested) {
      yield put(openBannerAction(Text.FeedbackAction.sendNotificationSuccess, notification.success))
    }
  } catch (err) {
    yield put({ type: SEND_NOTIFICATION_FAILED, data: err })
    if (emailType === emailEventTypes.OrganizationLicensesRequested) {
      yield put(openBannerAction(Text.FeedbackAction.sendNotificationError, notification.failed))
    }
  }
}

export function * learnerProfileRootSaga () {
  yield takeLatest(LEARNER_PROFILE_FETCH_REQUESTED, fetchLearnerProfile)
  yield takeLatest(RECOMMENDED_COURSES_FETCH_REQUESTED, fetchRecommendedCourses)
  yield takeLatest(LICENSE_ATTRIBUTION_HISTORY_REQUESTED, fetchLearnerAttributionHistory)
  yield takeLatest(DELETE_USER_REQUESTED, deleteUser)
  yield takeLatest(GET_LEARNER_BAR_CHART_REQUESTED, fetchLearnerBarChart)
  yield takeLatest(GET_LEARNER_CATEGORY_PERFORMANCE_REQUESTED, fetchLearnerCategoryPerformance)
  yield takeLatest(AFFECT_LICENSE_TO_LEARNER_REQUESTED, affectLicenseToLearner)
  yield debounce(500, GET_COURSES_IN_PROGRESS_REQUESTED, fetchLearnerCourseInProgress)
  yield takeLatest(GET_LEARNER_PROGRESSION_REQUESTED, fetchLearnerProgression)
  yield takeLatest(DOWNLOAD_COURSE_CERTIFICATE_REQUESTED, downloadCertificate)
  yield takeLatest(DOWNLOAD_REPORT_REQUESTED, downloadUserReport)
  yield takeLatest(ADD_USER_TO_TEAM_REQUESTED, attachUserToTeam)
  yield takeLatest(REMOVE_USER_FROM_TEAM_REQUESTED, deleteUserFromTeam)
  yield takeLatest(REINVITE_LEARNER_REQUESTED, reinviteLearner)
  yield takeLatest(CANCEL_LEARNER_INVITATION_REQUESTED, cancelLearnerInvitation)
  yield takeLatest(SEND_NOTIFICATION_REQUESTED, sendNotification)
}

const queries = {
  getLearnerProfile: (id) => `${BASE_URL_WEB}/Learner/${id}`,
  getRecommendedCourses: (userId) => `${BASE_URL_WEB}/Course/recommended/${userId}`,
  getLearnerAttributionHistory: (userId) => `${BASE_URL_WEB}/Organization/licenseAttributionHistory?UserId=${userId}&orderby=operationDate&take=0`,
  deleteUser: `${BASE_URL_WEB}/Learner/fromOrganization`,
  getLearnerBarChart: (userId, dateType, startDate, endDate) => `${BASE_URL_WEB}/Organization/totalView?UserId=${userId}&DateType=${dateType}&${endDate ? `ProgressDate.From=${startDate}&ProgressDate.To=${endDate}` : `ProgressDate.DateTime=${startDate}`}`,
  getLearnerCategoryPerformance: (userId, dateType, startDate, endDate) => `${BASE_URL_WEB}/Organization/categoryPerformances?UserId=${userId}&DateType=${dateType}&${endDate ? `ProgressDate.From=${startDate}&ProgressDate.To=${endDate}` : `ProgressDate.DateTime=${startDate}`}`,
  affectLicenseToLearner: `${BASE_URL_WEB}/Learner/affectLicense`,
  getLearnerCourseInProgress: (userId, take, skip, search) => `${BASE_URL_WEB}/Learner/coursesInProgress?UserId=${userId}&take=${take}&skip=${skip}&search=${search}&OrderBy=LastAccessedDate&OrderedByAsc=false`,
  getLearnerProgression: (userId) => `${BASE_URL_WEB}/Export/progressions?UserIds=${userId}&Orderby=LastAccessedDate`,
  getCertificate: (userId, courseId) => `${BASE_URL_WEB}/Learner/certificate?UserId=${userId}&CourseId=${courseId}`,
  attachUserToTeam: `${BASE_URL_WEB}/Learner/assignToTeam`,
  deleteUserFromTeam: `${BASE_URL_WEB}/Learner/fromTeam`,
  deleteInvitationUser: (invitationId) => `${BASE_URL_WEB}/Organization/invitation/${invitationId}`,
  sendNotification: (emailType) => `${BASE_URL_WEB}/Organization/SendNotification?mailEventType=${emailType}`
}

const GET_LEARNER_PROFILE_SUCCESS = 'GET_LEARNER_PROFILE_SUCCESS'
const GET_LEARNER_PROFILE_FAILED = 'GET_LEARNER_PROFILE_FAILED'
const LEARNER_PROFILE_FETCH_REQUESTED = 'LEARNER_PROFILE_FETCH_REQUESTED'
const GET_RECOMMENDED_COURSES_SUCCESS = 'GET_RECOMMENDED_COURSES_SUCCESS'
const GET_RECOMMENDED_COURSES_FAILED = 'GET_RECOMMENDED_COURSES_FAILED'
const RECOMMENDED_COURSES_FETCH_REQUESTED = 'RECOMMENDED_COURSES_FETCH_REQUESTED'
const LICENSE_ATTRIBUTION_HISTORY_REQUESTED = 'LICENSE_ATTRIBUTION_HISTORY_REQUESTED'
const LICENSE_ATTRIBUTION_HISTORY_SUCCESS = 'LICENSE_ATTRIBUTION_HISTORY_SUCCESS'
const LICENSE_ATTRIBUTION_HISTORY_FAILED = 'LICENSE_ATTRIBUTION_HISTORY_FAILED'
const DELETE_USER_REQUESTED = 'DELETE_USER_REQUESTED'
const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
const DELETE_USER_FAILED = 'DELETE_USER_FAILED'
const GET_LEARNER_BAR_CHART_REQUESTED = 'GET_LEARNER_BAR_CHART_REQUESTED'
const GET_LEARNER_BAR_CHART_SUCCESS = 'GET_LEARNER_BAR_CHART_SUCCESS'
const GET_LEARNER_BAR_CHART_FAILED = 'GET_LEARNER_BAR_CHART_FAILED'
const GET_LEARNER_CATEGORY_PERFORMANCE_REQUESTED = 'GET_LEARNER_CATEGORY_PERFORMANCE_REQUESTED'
const GET_LEARNER_CATEGORY_PERFORMANCE_SUCCESS = 'GET_LEARNER_CATEGORY_PERFORMANCE_SUCCESS'
const GET_LEARNER_CATEGORY_PERFORMANCE_FAILED = 'GET_LEARNER_CATEGORY_PERFORMANCE_FAILED'
const AFFECT_LICENSE_TO_LEARNER_REQUESTED = 'AFFECT_LICENSE_TO_LEARNER_REQUESTED'
const AFFECT_LICENSE_TO_LEARNER_SUCCESS = 'AFFECT_LICENSE_TO_LEARNER_SUCCESS'
const AFFECT_LICENSE_TO_LEARNER_FAILED = 'AFFECT_LICENSE_TO_LEARNER_FAILED'
const GET_COURSES_IN_PROGRESS_REQUESTED = 'GET_COURSES_IN_PROGRESS_REQUESTED'
const GET_COURSES_IN_PROGRESS_SUCCESS = 'GET_COURSES_IN_PROGRESS_SUCCESS'
const GET_COURSES_IN_PROGRESS_RESET_SUCCESS = 'GET_COURSES_IN_PROGRESS_RESET_SUCCESS'
const GET_COURSES_IN_PROGRESS_FAILED = 'GET_COURSES_IN_PROGRESS_FAILED'
const GET_LEARNER_PROGRESSION_REQUESTED = 'GET_LEARNER_PROGRESSION_REQUESTED'
const GET_LEARNER_PROGRESSION_SUCCESS = 'GET_LEARNER_PROGRESSION_SUCCESS'
const GET_LEARNER_PROGRESSION_FAILED = 'GET_LEARNER_PROGRESSION_FAILED'
const DOWNLOAD_COURSE_CERTIFICATE_SUCCESS = 'DOWNLOAD_COURSE_CERTIFICATE_SUCCESS'
const DOWNLOAD_COURSE_CERTIFICATE_FAILED = 'DOWNLOAD_COURSE_CERTIFICATE_FAILED'
const DOWNLOAD_COURSE_CERTIFICATE_REQUESTED = 'DOWNLOAD_COURSE_CERTIFICATE_REQUESTED'
const DOWNLOAD_REPORT_SUCCESS = 'DOWNLOAD_REPORT_SUCCESS'
const DOWNLOAD_REPORT_FAILED = 'DOWNLOAD_REPORT_FAILED'
const DOWNLOAD_REPORT_REQUESTED = 'DOWNLOAD_REPORT_REQUESTED'
const ADD_USER_TO_TEAM_REQUESTED = 'ADD_USER_TO_TEAM_REQUESTED'
const REMOVE_USER_FROM_TEAM_REQUESTED = 'REMOVE_USER_FROM_TEAM_REQUESTED'
const ADD_USER_TO_TEAM_SUCCESS = 'ADD_USER_TO_TEAM_SUCCESS'
const ADD_USER_TO_TEAM_FAILED = 'ADD_USER_TO_TEAM_FAILED'
const REMOVE_USER_FROM_TEAM_SUCCESS = 'REMOVE_USER_FROM_TEAM_SUCCESS'
const REMOVE_USER_FROM_TEAM_FAILED = 'REMOVE_USER_FROM_TEAM_FAILED'
const REINVITE_LEARNER_REQUESTED = 'REINVITE_LEARNER_REQUESTED'
const REINVITE_LEARNER_SUCCEEDED = 'REINVITE_LEARNER_SUCCEEDED'
const REINVITE_LEARNER_FAILED = 'REINVITE_LEARNER_FAILED'
const CANCEL_LEARNER_INVITATION_REQUESTED = 'CANCEL_LEARNER_INVITATION_REQUESTED'
const CANCEL_LEARNER_INVITATION_SUCCEEDED = 'CANCEL_LEARNER_INVITATION_SUCCEEDED'
const CANCEL_LEARNER_INVITATION_FAILED = 'CANCEL_LEARNER_INVITATION_FAILED'
const SEND_NOTIFICATION_REQUESTED = 'SEND_NOTIFICATION_REQUESTED'
const SEND_NOTIFICATION_SUCCEEDED = 'SEND_NOTIFICATION_SUCCEEDED'
const SEND_NOTIFICATION_FAILED = 'SEND_NOTIFICATION_FAILED'
const SWITCH_POPUP_STATE_ACTION = 'SWITCH_POPUP_STATE_ACTION'
