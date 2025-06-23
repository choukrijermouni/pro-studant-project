import { debounce, put, select, takeLatest } from 'redux-saga/effects'
import { fetch } from '@pro_boa/js'
import { oidcUserManager } from 'identity'
import { BASE_URL_WEB, MDYDateFormat, DMYDateFormat, notification, defaultFieldReport, defaultOrderAsc } from 'constants/'
import moment from 'moment'
import { exportAttributionHistory } from 'helpers'
import Text from './text.json'
import { TurnOffLoaderAction } from 'store/config'
import { openBannerAction } from 'components/Common/Banner/store'
import { LEARNERS_FETCH_REQUESTED } from 'pages/Learners/store'

const initialUserState = {
  error: false,
  count: 0,
  noLicenseUsers: {
    loading: false
  },
  lastConnectedUsers: [],
  lastConnectedManagers: [],
  lastAffectedLearners: [],
  newCourses: [],
  doneCourses: [],
  organizationId: '',
  totalLearners: 0,
  totalLearnersWithoutLicense: 0,
  Description: undefined,
  barChart: {
    Total: 0,
    ViewsByDate: {}
  },
  categoryChart: new Array(8).fill(0),
  licenseInfo: {
    organizationId: '',
    organizationLicenseDetails: [
      {
        organizationLicenseType: 0,
        licenseQuantity: 0,
        licenseConsumed: 0,
        licenseTypeRemaining: 0
      }
    ],
    totalLicensesRemaining: 0
  },
  dateFilter: {
    startDate: '',
    endDate: ''
  }
}

export const reducer = (state = initialUserState, { type, data }) => {
  switch (type) {
    case GET_ORGANIZATION_LEARNERS_FAILED:
      return {
        ...state,
        noLicenseUsers: {
          ...state.noLicenseUsers,
          loading: false,
          error: data
        }
      }
    case GET_ORGANIZATION_LEARNERS_SUCCESS:
      return {
        ...state,
        noLicenseUsers: {
          ...state.noLicenseUsers,
          loading: false,
          data: [...state.noLicenseUsers.data, ...data.data]
        }
      }
    case GET_ORGANIZATION_LEARNERS_REQUESTED:
      return {
        ...state,
        noLicenseUsers: {
          ...state.noLicenseUsers,
          loading: true
        }
      }
    case GET_ORGANIZATION_LEARNERS_REST_SUCCESS:
      return {
        ...state,
        noLicenseUsers: data
      }
    case GET_ORGANIZATION_TOTAL_LEARNERS_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_ORGANIZATION_TOTAL_LEARNERS_SUCCESS:
      return {
        ...state,
        count: data.TotalLearners,
        totalLearners: data.TotalLearners,
        totalLearnersWithoutLicense: data.TotalLearnersWithoutLicense
      }
    case GET_ORGANIZATION_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_ORGANIZATION_SUCCESS:
      return {
        ...state,
        ...data
      }
    case GET_ORGANIZATION_BAR_CHART_SUCCESS:
      return {
        ...state,
        barChart: data
      }
    case GET_ORGANIZATION_BAR_CHART_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_ORGANIZATION_CATEGORY_PERFORMANCE_SUCCESS:
      return {
        ...state,
        categoryChart: data
      }
    case GET_ORGANIZATION_CATEGORY_PERFORMANCE_FAILED:
      return {
        ...state,
        categoryChart: data
      }
    case GET_LAST_CONNECTED_LEARNERS_RESET_SUCCESS:
      return {
        ...state,
        lastConnectedUsers: data
      }
    case GET_LAST_CONNECTED_LEARNERS_SUCCESS:
      return {
        ...state,
        lastConnectedUsers: {
          ...state.lastConnectedUsers,
          data: [...state.lastConnectedUsers.data, ...data.data]
        }
      }
    case GET_LAST_CONNECTED_MANAGERS_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_LAST_CONNECTED_MANAGERS_SUCCESS:
      return {
        ...state,
        lastConnectedManagers: {
          ...state.lastConnectedManagers,
          data: [...state.lastConnectedManagers.data, ...data.data]
        }
      }
    case GET_LAST_CONNECTED_MANAGERS_RESET_SUCCESS:
      return {
        ...state,
        lastConnectedManagers: data
      }
    case GET_LAST_CONNECTED_LEARNERS_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_LAST_AFFECTED_LEARNERS_SUCCESS_RESET:
      return {
        ...state,
        lastAffectedLearners: data
      }
    case GET_LAST_AFFECTED_LEARNERS_SUCCESS:
      return {
        ...state,
        lastAffectedLearners: {
          ...state.lastAffectedLearners,
          Items: [
            ...data.Items
          ],
          Total: data.Total,
          FilteredCount: data.FilteredCount
        }
      }
    case GET_LAST_AFFECTED_LEARNERS_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_NEW_COURSES_SUCCESS:
      return {
        ...state,
        newCourses: data
      }
    case GET_NEW_COURSES_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_COURSES_DONE_SUCCESS_RESET:
      return {
        ...state,
        doneCourses: data
      }
    case GET_COURSES_DONE_SUCCESS:
      return {
        ...state,
        doneCourses: {
          ...state.doneCourses,
          data: [...state.doneCourses.data, ...data.data]
        }
      }
    case GET_COURSES_DONE_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_LICENSE_INFO_SUCCESS:
      return {
        ...state,
        licenseInfo: data
      }
    case GET_LICENSE_INFO_FAIL:
      return {
        ...state,
        licenseInfo: {
          OrganizationLicenseDetails: [],
          TotalLicensesRemaining: 0
        }
      }
    case SET_DATE_FILTER_REQUESTED:
      return {
        ...state,
        dateFilter: {
          ...state.dateFilter,
          ...data
        }
      }
    default:
      return state
  }
}

export const fetchOrganizationLearnersAction = (take, skip) => ({ type: GET_ORGANIZATION_LEARNERS_REQUESTED, take, skip })
export const fetchOrganizationTotalLearnersAction = () => ({ type: GET_ORGANIZATION_TOTAL_LEARNERS_REQUESTED })
export const fetchOrganizationAction = () => ({ type: GET_ORGANIZATION_REQUESTED })
export const fetchOrganizationBarChartAction = (dateType, startDate, endDate) => ({ type: GET_ORGANIZATION_BAR_CHART_REQUESTED, dateType, startDate, endDate })
export const fetchOrganizationCategoryPerformanceAction = (id, dataType, startDate, endDate, dateType) => ({ type: GET_ORGANIZATION_CATEGORY_PERFORMANCE_REQUESTED, id, dataType, startDate, endDate, dateType })
export const fetchOrganizationLastConnectedLearners = (take, skip) => ({ type: GET_LAST_CONNECTED_LEARNERS_REQUESTED, take, skip })
export const fetchOrganizationLastConnectedManagers = (take, skip) => ({ type: GET_LAST_CONNECTED_MANAGERS_REQUESTED, take, skip })
export const fetchLastAffectedLearnersAction = (take, skip, search, field, asc, from, to) => ({ type: GET_LAST_AFFECTED_LEARNERS_REQUESTED, take, skip, search, field, asc, from, to })
export const fetchOrganizationNewCoursesAction = () => ({ type: GET_NEW_COURSES_REQUESTED })
export const fetchCoursesDoneAction = (take, skip) => ({ type: GET_COURSES_DONE_REQUESTED, take, skip })
export const fetchLicenseInfoAction = (noLoaderAction) => ({ type: LICENSE_INFO_FETCH_REQUESTED, noLoaderAction })
export const downloadHistoryReportAction = (from, to) => ({ type: DOWNLOAD_HISTORY_REPORT_REQUESTED, from, to })
export const setDateFilterAction = (startDate, endDate) => ({ type: SET_DATE_FILTER_REQUESTED, data: { startDate, endDate } })
export const orderOrganizationLicensesAction = (data) => ({ type: ORDER_ORGANIZATION_LICENSES_REQUESTED, data })

const getDateInterval = ({ organization }) => organization.dateFilter
const getCategories = ({ referential }) => referential.categories

function * fetchOrganizationLearners ({ take, skip }) {
  try {
    const response = yield fetch(queries.getOrganizationLearners(take, skip), { userManager: oidcUserManager })
    if (skip === 0) yield put({ type: GET_ORGANIZATION_LEARNERS_REST_SUCCESS, data: { data: response.Items, count: response.FilteredCount, total: response.Total } })
    else yield put({ type: GET_ORGANIZATION_LEARNERS_SUCCESS, data: { data: response.Items, count: response.FilteredCount, total: response.Total } })
  } catch (err) {
    yield put({ type: GET_ORGANIZATION_LEARNERS_FAILED, data: err })
  }
}

function * fetchOrganizationTotalLearners () {
  try {
    const response = yield fetch(queries.getOrganizationTotalLearners, { userManager: oidcUserManager })
    yield put({ type: GET_ORGANIZATION_TOTAL_LEARNERS_SUCCESS, data: { TotalLearners: response.Total, TotalLearnersWithoutLicense: response.TotalLearnersWithoutLicense } })
  } catch (err) {
    yield put({ type: GET_ORGANIZATION_TOTAL_LEARNERS_FAILED, data: err })
  }
}

function * fetchOrganization () {
  try {
    const response = yield fetch(queries.getOrganization, { userManager: oidcUserManager })
    yield put({ type: GET_ORGANIZATION_SUCCESS, data: { organizationId: response.Id, ...response } })
  } catch (err) {
    yield put({ type: GET_ORGANIZATION_FAILED, data: err })
  }
}

function * fetchOrganizationBarChart ({ dateType, startDate, endDate }) {
  try {
    const response = yield fetch(queries.getOrganizationBarChart(dateType, startDate, endDate), { userManager: oidcUserManager })
    yield put({ type: GET_ORGANIZATION_BAR_CHART_SUCCESS, data: response })
  } catch (err) {
    yield put({ type: GET_ORGANIZATION_BAR_CHART_FAILED, data: err })
  }
}

function * fetchOrganizationCategoryPerformance ({ id, dataType, startDate, endDate, dateType }) {
  const categories = yield select(getCategories)
  try {
    const response = yield fetch(queries.getOrganizationCategoryPerformance(id, dataType, startDate, endDate, dateType), { userManager: oidcUserManager })
    const filteredCategories = categories?.map(category =>
      response?.Categories?.find(categoryChartCategory =>
        categoryChartCategory?.CategoryId === category?.Id)
        ? response?.Categories?.find(categoryChartCategory => categoryChartCategory?.CategoryId === category?.Id)?.CoursesCount
        : 0)
    yield put({ type: GET_ORGANIZATION_CATEGORY_PERFORMANCE_SUCCESS, data: filteredCategories })
  } catch (err) {
    const filteredCategories = categories?.map(category => 0)
    yield put({ type: GET_ORGANIZATION_CATEGORY_PERFORMANCE_FAILED, data: filteredCategories })
  }
}

function * fetchOrganizationLastConnectedLearnersAction ({ take, skip }) {
  try {
    const response = yield fetch(queries.getOrganizationLastConnectedLearners(take, skip), { userManager: oidcUserManager })
    if (skip === 0) yield put({ type: GET_LAST_CONNECTED_LEARNERS_RESET_SUCCESS, data: { data: response.Items, count: response.Total } })
    else yield put({ type: GET_LAST_CONNECTED_LEARNERS_SUCCESS, data: { data: response.Items, count: response.Total } })
  } catch (err) {
    yield put({ type: GET_LAST_CONNECTED_LEARNERS_FAILED, data: err })
  }
}

function * fetchOrganizationLastConnectedManagersAction ({ take, skip }) {
  try {
    const response = yield fetch(queries.getOrganizationLastConnectedManagers(take, skip), { userManager: oidcUserManager })
    if (skip === 0) yield put({ type: GET_LAST_CONNECTED_MANAGERS_RESET_SUCCESS, data: { data: response.Items, count: response.Total } })
    else yield put({ type: GET_LAST_CONNECTED_MANAGERS_SUCCESS, data: { data: response.Items, count: response.Total } })
  } catch (err) {
    yield put({ type: GET_LAST_CONNECTED_MANAGERS_FAILED, data: err })
  }
}

function * fetchLastAffectedLearners ({ take, skip, search, field, asc, from, to }) {
  const isSame = moment(from).isSame(moment(to))
  const formattedFrom = moment(from).format(MDYDateFormat)
  const formattedTo = isSame ? moment(to).add(1, 'day').format(MDYDateFormat) : moment(to).format(MDYDateFormat)
  try {
    const response = yield fetch(queries.getLastAffectedLearners(take, skip, search, field, asc, formattedFrom, formattedTo), { userManager: oidcUserManager })
    yield put({ type: GET_LAST_AFFECTED_LEARNERS_SUCCESS_RESET, data: response })
    yield put(TurnOffLoaderAction())
  } catch (err) {
    yield put({ type: GET_LAST_AFFECTED_LEARNERS_FAILED, data: err })
    yield put(TurnOffLoaderAction())
  }
}

function * fetchOrganizationNewCourses () {
  try {
    const response = yield fetch(queries.getOrganizationNewCourses, { userManager: oidcUserManager })
    yield put({ type: GET_NEW_COURSES_SUCCESS, data: response.Data })
  } catch (err) {
    yield put({ type: GET_NEW_COURSES_FAILED, data: err })
  }
}

function * fetchCoursesDone ({ take, skip }) {
  try {
    const dateInterval = yield select(getDateInterval)
    const response = yield fetch(queries.getCoursesDone(take, skip, dateInterval.startDate, dateInterval.endDate), { userManager: oidcUserManager })
    if (skip === 0) yield put({ type: GET_COURSES_DONE_SUCCESS_RESET, data: { data: response.Items, count: response.FilteredCount } })
    else yield put({ type: GET_COURSES_DONE_SUCCESS, data: { data: response.Items, count: response.FilteredCount } })
  } catch (err) {
    yield put({ type: GET_COURSES_DONE_FAILED, data: err })
  }
}

function * fetchLicenseInfo ({ noLoaderAction }) {
  try {
    const response = yield fetch(queries.getLicenseInfo, { userManager: oidcUserManager })
    yield put({ type: GET_LICENSE_INFO_SUCCESS, data: response })
    if (!noLoaderAction) yield put(TurnOffLoaderAction())
  } catch (err) {
    yield put({ type: GET_LICENSE_INFO_FAIL, data: err })
    if (!noLoaderAction) yield put(TurnOffLoaderAction())
  }
}

function * downloadHistoryReport ({ from, to }) {
  const take = 0
  const skip = 0
  const search = ''
  try {
    const response = yield fetch(queries.getLastAffectedLearners(take, skip, search, defaultFieldReport, defaultOrderAsc, from, to), { userManager: oidcUserManager })
    const formattedData = response?.Items?.map(user => ({
      FullName: `${user?.FirstName} ${user?.LastName}`,
      Email: user?.Email,
      OperationDate: moment(user?.OperationDate).format(DMYDateFormat),
      QuantityAssigned: user?.QuantityAssigned,
      OrganizationLicenseType: Text.licenseTypes[user.OrganizationLicenseType],
      AdminName: user.AdminId && user.AdminName ? user.AdminName : Text.NA
    }))
    exportAttributionHistory(formattedData)
    yield put({ type: DOWNLOAD_HISTORY_REPORT_SUCCESS })
  } catch (err) {
    yield put({ type: DOWNLOAD_HISTORY_REPORT_FAIL, data: err })
  }
}

function * orderOrganizationLicenses ({ data }) {
  try {
    yield fetch(queries.sendOrganizationOrder, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), nojson: true, userManager: oidcUserManager })
    yield put({ type: ORDER_ORGANIZATION_LICENSES_SUCCESS })
    yield put(openBannerAction(Text.orderLicensesSuccess, notification.success))
  } catch (err) {
    yield put({ type: ORDER_ORGANIZATION_LICENSES_FAILED, data: err })
    yield put(openBannerAction(Text.orderLicensesFail, notification.failed))
  }
}

export function * organiZationRootSaga () {
  yield takeLatest(GET_ORGANIZATION_LEARNERS_REQUESTED, fetchOrganizationLearners)
  yield takeLatest(GET_ORGANIZATION_TOTAL_LEARNERS_REQUESTED, fetchOrganizationTotalLearners)
  yield takeLatest(GET_ORGANIZATION_REQUESTED, fetchOrganization)
  yield takeLatest(GET_ORGANIZATION_BAR_CHART_REQUESTED, fetchOrganizationBarChart)
  yield takeLatest(GET_ORGANIZATION_CATEGORY_PERFORMANCE_REQUESTED, fetchOrganizationCategoryPerformance)
  yield takeLatest(GET_LAST_CONNECTED_LEARNERS_REQUESTED, fetchOrganizationLastConnectedLearnersAction)
  yield takeLatest(GET_LAST_CONNECTED_MANAGERS_REQUESTED, fetchOrganizationLastConnectedManagersAction)
  yield debounce(500, GET_LAST_AFFECTED_LEARNERS_REQUESTED, fetchLastAffectedLearners)
  yield takeLatest(GET_NEW_COURSES_REQUESTED, fetchOrganizationNewCourses)
  yield takeLatest(GET_COURSES_DONE_REQUESTED, fetchCoursesDone)
  yield takeLatest([LICENSE_INFO_FETCH_REQUESTED, LEARNERS_FETCH_REQUESTED], fetchLicenseInfo)
  yield takeLatest(DOWNLOAD_HISTORY_REPORT_REQUESTED, downloadHistoryReport)
  yield takeLatest(ORDER_ORGANIZATION_LICENSES_REQUESTED, orderOrganizationLicenses)
}

const queries = {
  getOrganizationLearners: (take, skip) => `${BASE_URL_WEB}/Learner?HasActiveLicense=false${take ? `&Take=${take}` : ''}${skip ? `&Skip=${skip}` : ''}&OrderBy=LastConnectionDate&OrderedByAsc=true`,
  getOrganizationTotalLearners: `${BASE_URL_WEB}/Learner`,
  getOrganization: `${BASE_URL_WEB}/Organization`,
  getOrganizationBarChart: (dateType, startDate, endDate) => `${BASE_URL_WEB}/Organization/totalView?DateType=${dateType}&${endDate ? `ProgressDate.From=${startDate}&ProgressDate.To=${endDate}` : `ProgressDate.DateTime=${startDate}`}`,
  getOrganizationCategoryPerformance: (id, dataType, startDate, endDate, dateType) => `${BASE_URL_WEB}/Organization/categoryPerformances?${dataType ? `${dataType}=${id}&` : ''}DateType=${dateType}&ProgressDate.From=${startDate}&ProgressDate.To=${endDate}`,
  getOrganizationLastConnectedLearners: (take, skip) => `${BASE_URL_WEB}/Learner?&OrderBy=LastConnectionDate&OrderedByAsc=false${take ? `&Take=${take}` : ''}${skip ? `&Skip=${skip}` : ''}`,
  getOrganizationLastConnectedManagers: (take, skip) => `${BASE_URL_WEB}/Manager?&OrderBy=LastConnectionDate&OrderedByAsc=false${take ? `&Take=${take}` : ''}${skip ? `&Skip=${skip}` : ''}`,
  getLastAffectedLearners: (take, skip, search, field, asc, from, to, isSame) => `${BASE_URL_WEB}/Organization/licenseAttributionHistory?search=${search}${take || take === 0 ? `&Take=${take}` : ''}${skip || skip === 0 ? `&Skip=${skip}` : ''}${asc ? `&OrderedByAsc=${asc}` : ''}${field ? `&OrderBy=${field}` : '&OrderBy=OperationDate'}${isSame ? `&LicenseAttributionOperationDate.DateTime=${from}` : `${from ? `&LicenseAttributionOperationDate.From=${from}` : ''}${to ? `&LicenseAttributionOperationDate.To=${to}` : ''}`}`,
  getOrganizationNewCourses: `${BASE_URL_WEB}/Course?Take=8&OrderBy=publicationdate`,
  getCoursesDone: (take, skip, startDate, endDate) => `${BASE_URL_WEB}/Learner/coursesDone?OrderedByAsc=false&OrderBy=CertificationDate&${take ? `Take=${take}` : ''}${skip ? `&Skip=${skip}` : ''}${startDate ? `&CompletionDate.From=${startDate}` : ''}${endDate ? `&CompletionDate.To=${endDate}` : ''}`,
  getLicenseInfo: `${BASE_URL_WEB}/Organization/licenseInfos`,
  sendOrganizationOrder: `${BASE_URL_WEB}/Organization/SendOrganizationOrder`
}

export const GET_ORGANIZATION_LEARNERS_SUCCESS = 'GET_ORGANIZATION_LEARNERS_SUCCESS'
const GET_ORGANIZATION_LEARNERS_FAILED = 'GET_ORGANIZATION_LEARNERS_FAILED'
const GET_ORGANIZATION_LEARNERS_REQUESTED = 'GET_ORGANIZATION_LEARNERS_REQUESTED'
const GET_ORGANIZATION_TOTAL_LEARNERS_REQUESTED = 'GET_ORGANIZATION_TOTAL_LEARNERS_REQUESTED'
const GET_ORGANIZATION_TOTAL_LEARNERS_SUCCESS = 'GET_ORGANIZATION_TOTAL_LEARNERS_SUCCESS'
const GET_ORGANIZATION_TOTAL_LEARNERS_FAILED = 'GET_ORGANIZATION_TOTAL_LEARNERS_FAILED'
export const GET_ORGANIZATION_SUCCESS = 'GET_ORGANIZATION_SUCCESS'
const GET_ORGANIZATION_FAILED = 'GET_ORGANIZATION_FAILED'
const GET_ORGANIZATION_REQUESTED = 'GET_ORGANIZATION_REQUESTED'
const GET_ORGANIZATION_BAR_CHART_REQUESTED = 'GET_ORGANIZATION_BAR_CHART_REQUESTED'
const GET_ORGANIZATION_BAR_CHART_SUCCESS = 'GET_ORGANIZATION_BAR_CHART_SUCCESS'
const GET_ORGANIZATION_BAR_CHART_FAILED = 'GET_ORGANIZATION_BAR_CHART_FAILED'
const GET_ORGANIZATION_CATEGORY_PERFORMANCE_REQUESTED = 'GET_ORGANIZATION_CATEGORY_PERFORMANCE_REQUESTED'
const GET_ORGANIZATION_CATEGORY_PERFORMANCE_SUCCESS = 'GET_ORGANIZATION_CATEGORY_PERFORMANCE_SUCCESS'
const GET_ORGANIZATION_CATEGORY_PERFORMANCE_FAILED = 'GET_ORGANIZATION_CATEGORY_PERFORMANCE_FAILED'
const GET_LAST_CONNECTED_LEARNERS_REQUESTED = 'GET_LAST_CONNECTED_LEARNERS_REQUESTED'
const GET_LAST_CONNECTED_LEARNERS_SUCCESS = 'GET_LAST_CONNECTED_LEARNERS_SUCCESS'
const GET_LAST_CONNECTED_LEARNERS_FAILED = 'GET_LAST_CONNECTED_LEARNERS_FAILED'
const GET_LAST_AFFECTED_LEARNERS_REQUESTED = 'GET_LAST_AFFECTED_LEARNERS_REQUESTED'
const GET_LAST_AFFECTED_LEARNERS_SUCCESS = 'GET_LAST_AFFECTED_LEARNERS_SUCCESS'
const GET_LAST_AFFECTED_LEARNERS_SUCCESS_RESET = 'GET_LAST_AFFECTED_LEARNERS_SUCCESS_RESET'
const GET_LAST_AFFECTED_LEARNERS_FAILED = 'GET_LAST_AFFECTED_LEARNERS_FAILED'
const GET_NEW_COURSES_REQUESTED = 'GET_NEW_COURSES_REQUESTED'
const GET_NEW_COURSES_SUCCESS = 'GET_NEW_COURSES_SUCCESS'
const GET_NEW_COURSES_FAILED = 'GET_NEW_COURSES_FAILED'
const GET_COURSES_DONE_REQUESTED = 'GET_COURSES_DONE_REQUESTED'
const GET_COURSES_DONE_SUCCESS = 'GET_COURSES_DONE_SUCCESS'
const GET_COURSES_DONE_FAILED = 'GET_COURSES_DONE_FAILED'
const GET_LICENSE_INFO_SUCCESS = 'GET_LICENSE_INFO_SUCCESS'
const GET_LICENSE_INFO_FAIL = 'GET_LICENSE_INFO_FAIL'
const LICENSE_INFO_FETCH_REQUESTED = 'LICENSE_INFO_FETCH_REQUESTED'
const DOWNLOAD_HISTORY_REPORT_REQUESTED = 'DOWNLOAD_HISTORY_REPORT_REQUESTED'
const DOWNLOAD_HISTORY_REPORT_SUCCESS = 'DOWNLOAD_HISTORY_REPORT_SUCCESS'
const DOWNLOAD_HISTORY_REPORT_FAIL = 'DOWNLOAD_HISTORY_REPORT_FAIL'
const SET_DATE_FILTER_REQUESTED = 'SET_DATE_FILTER_REQUESTED'
export const GET_ORGANIZATION_LEARNERS_REST_SUCCESS = 'GET_ORGANIZATION_LEARNERS_REST_SUCCESS'
const GET_LAST_CONNECTED_LEARNERS_RESET_SUCCESS = 'GET_LAST_CONNECTED_LEARNERS_RESET_SUCCESS'
const GET_COURSES_DONE_SUCCESS_RESET = 'GET_COURSES_DONE_SUCCESS_RESET'
const GET_LAST_CONNECTED_MANAGERS_RESET_SUCCESS = 'GET_LAST_CONNECTED_MANAGERS_RESET_SUCCESS'
const GET_LAST_CONNECTED_MANAGERS_FAILED = 'GET_LAST_CONNECTED_MANAGERS_FAILED'
const GET_LAST_CONNECTED_MANAGERS_SUCCESS = 'GET_LAST_CONNECTED_MANAGERS_SUCCESS'
const GET_LAST_CONNECTED_MANAGERS_REQUESTED = 'GET_LAST_CONNECTED_MANAGERS_REQUESTED'
const ORDER_ORGANIZATION_LICENSES_FAILED = 'ORDER_ORGANIZATION_LICENSES_FAILED'
const ORDER_ORGANIZATION_LICENSES_SUCCESS = 'ORDER_ORGANIZATION_LICENSES_SUCCESS'
const ORDER_ORGANIZATION_LICENSES_REQUESTED = 'ORDER_ORGANIZATION_LICENSES_REQUESTED'
