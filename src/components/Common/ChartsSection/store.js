import { put, takeLatest } from 'redux-saga/effects'
import { fetch } from '@pro_boa/js'
import { oidcUserManager } from 'identity'
import { BASE_URL_WEB } from 'constants/'

const initialUserState = {
  barChartData: {}
}

export const reducer = (state = initialUserState, { type, data }) => {
  switch (type) {
    case GET_BAR_CHART_DATA_SUCCESS:
      return {
        ...state,
        barChartData: data
      }
    case GET_BAR_CHART_DATA_FAILED:
      return {
        ...state,
        error: data
      }
    default:
      return state
  }
}

export const fetchBarChartDataAction = (id, dataType, startDate, endDate, dateType) => ({ type: GET_BAR_CHART_DATA_REQUESTED, id, dataType, startDate, endDate, dateType })

function * fetchBarChartData ({ id, dataType, startDate, endDate, dateType }) {
  try {
    const response = yield fetch(queries.getBarChartData(id, dataType, startDate, endDate, dateType), { userManager: oidcUserManager })
    yield put({ type: GET_BAR_CHART_DATA_SUCCESS, data: response })
  } catch (err) {
    yield put({ type: GET_BAR_CHART_DATA_FAILED, data: err })
  }
}

export function * chartsRootSaga () {
  yield takeLatest(GET_BAR_CHART_DATA_REQUESTED, fetchBarChartData)
}

const queries = {
  getBarChartData: (id, dataType, startDate, endDate, dateType) => `${BASE_URL_WEB}/Organization/totalView?${dataType ? `${dataType}=${id}&` : ''}DateType=${dateType}&ProgressDate.From=${startDate}&ProgressDate.To=${endDate}`
}

const GET_BAR_CHART_DATA_REQUESTED = 'GET_BAR_CHART_DATA_REQUESTED'
const GET_BAR_CHART_DATA_SUCCESS = 'GET_BAR_CHART_DATA_SUCCESS'
const GET_BAR_CHART_DATA_FAILED = 'GET_BAR_CHART_DATA_FAILED'
