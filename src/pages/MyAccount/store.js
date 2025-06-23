import { put, select, takeLatest } from 'redux-saga/effects'
import { fetch } from '@pro_boa/js'
import { oidcUserManager } from 'identity'
import { BASE_URL_WEB, ManagerRole, notification } from 'constants/'
import { openBannerAction } from 'components/Common/Banner/store'
import Text from './text.json'

const initialUserState = {
  error: false,
  Id: '',
  FirstName: '',
  LastName: '',
  Email: '',
  Photo: null,
  CreationDate: '',
  LastConnectionDate: '',
  isOpenMenu: true,
  flowId: ''
}

export const reducer = (state = initialUserState, { type, data }) => {
  switch (type) {
    case GET_ORGANIZATION_PROFILE_FAILED:
      return {
        ...state,
        error: data
      }
    case GET_ORGANIZATION_PROFILE_SUCCESS:
      return {
        ...state,
        ...data
      }
    case EDIT_ORGANIZATION_PROFILE_SUCCESS:
      return {
        ...state,
        ...data
      }
    case EDIT_ORGANIZATION_PROFILE_FAILED:
      return {
        ...state,
        error: data
      }
    case EDIT_ORGANIZATION_PROFILE_PASSWORD_REQUESTED:
      return {
        ...state,
        error: false
      }
    case EDIT_ORGANIZATION_PROFILE_PASSWORD_FAILED:
      return {
        ...state,
        error: data
      }
    case CHANGE_MENU_STATE:
      return {
        ...state,
        isOpenMenu: data
      }
    case GET_FLOW_ID_SUCCESS:
      return {
        ...state,
        flowId: data
      }
    default:
      return state
  }
}

export const fetchOrganizationProfileAction = () => ({ type: GET_ORGANIZATION_PROFILE_REQUESTED })
export const editOrganizationProfileAction = (id, firstName, lastName, phone, functionId, email, noNotification) => ({ type: EDIT_ORGANIZATION_PROFILE_REQUESTED, id, firstName, lastName, phone, functionId, email, noNotification })
export const editOrganizationProfilePasswordAction = (password, noNotification) => ({ type: EDIT_ORGANIZATION_PROFILE_PASSWORD_REQUESTED, password, noNotification })
export const updateAvatarProfileAction = (data) => ({ type: UPDATE_AVATAR_REQUESTED, data })
export const deleteAvatarProfileAction = () => ({ type: DELETE_USER_PICTURE_REQUESTED })
export const changeMenuStateAction = state => ({ type: CHANGE_MENU_STATE, data: state })
export const getFlowIdAction = () => ({ type: GET_FLOW_ID_REQUESTED })

const getUser = ({ identity }) => identity.user

function * fetchOrganizationProfile () {
  const userData = yield select(getUser)
  try {
    const response = yield fetch(queries.getOrganizationProfile, { userManager: oidcUserManager })
    yield put({ type: GET_ORGANIZATION_PROFILE_SUCCESS, data: { ...response, isManager: userData?.role?.includes(ManagerRole) } })
  } catch (err) {
    yield put({ type: GET_ORGANIZATION_PROFILE_FAILED, data: err })
  }
}

function * editOrganizationProfile ({ id, firstName, lastName, phone, functionId, email, noNotification }) {
  try {
    const body = {
      id,
      firstName,
      lastName,
      phone,
      functionId,
      email
    }
    const response = yield fetch(queries.editOrganizationProfile, { method: 'put', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), nojson: true, userManager: oidcUserManager })
    yield put({ type: EDIT_ORGANIZATION_PROFILE_SUCCESS, data: response })
    yield put(fetchOrganizationProfileAction())
    if (!noNotification) yield put(openBannerAction(Text.editInfosSuccess, notification.success))
  } catch (err) {
    yield put({ type: EDIT_ORGANIZATION_PROFILE_FAILED, data: err })
    yield put(openBannerAction(Text.editInfosFailed, notification.failed))
  }
}

function * editOrganizationProfilePassword ({ password, noNotification }) {
  try {
    const response = yield fetch(queries.editOrganizationProfilePassword, { method: 'put', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(password), nojson: true, userManager: oidcUserManager })
    yield put({ type: EDIT_ORGANIZATION_PROFILE_PASSWORD_SUCCESS, data: response })
    if (!noNotification) yield put(openBannerAction(Text.editPasswordSuccess, notification.success))
  } catch (err) {
    yield put({ type: EDIT_ORGANIZATION_PROFILE_PASSWORD_FAILED, data: err })
    yield put(openBannerAction(Text.editPasswordFailed, notification.failed))
  }
}

function * updateAvatar ({ data }) {
  try {
    const formData = new window.FormData()
    formData.append('imageFile', data)
    yield fetch(queries.updateAvatar, { method: 'post', body: formData, nojson: true, userManager: oidcUserManager })
    yield put({ type: UPDATE_AVATAR_SUCCESS })
    yield put(openBannerAction(Text.updateAvatarSuccess, notification.success))
  } catch (err) {
    yield put({ type: UPDATE_AVATAR_FAILED, err })
    yield put(openBannerAction(Text.updateAvatarSuccess, notification.failed))
  }
}

function * deleteAvatar () {
  try {
    yield fetch(queries.deleteUserPicture, { method: 'delete', headers: { 'Content-Type': 'application/json' }, nojson: true, userManager: oidcUserManager })
    yield put({ type: DELETE_USER_PICTURE_SUCCESS })
    yield put(openBannerAction(Text.deleteAvatarSuccess, notification.success))
  } catch (err) {
    yield put({ type: DELETE_USER_PICTURE_FAILED, err })
    yield put(openBannerAction(Text.deleteAvatarFailed, notification.failed))
  }
}

function * getFlowId () {
  try {
    const response = yield fetch(queries.getFlowId, { method: 'post', userManager: oidcUserManager })
    yield put({ type: GET_FLOW_ID_SUCCESS, data: response })
  } catch (err) {
    yield put({ type: GET_FLOW_ID_FAILED, err })
  }
}

export function * organizationProfileRootSaga () {
  yield takeLatest([GET_ORGANIZATION_PROFILE_REQUESTED, UPDATE_AVATAR_SUCCESS, DELETE_USER_PICTURE_SUCCESS], fetchOrganizationProfile)
  yield takeLatest(EDIT_ORGANIZATION_PROFILE_REQUESTED, editOrganizationProfile)
  yield takeLatest(EDIT_ORGANIZATION_PROFILE_PASSWORD_REQUESTED, editOrganizationProfilePassword)
  yield takeLatest(UPDATE_AVATAR_REQUESTED, updateAvatar)
  yield takeLatest(DELETE_USER_PICTURE_REQUESTED, deleteAvatar)
  yield takeLatest(GET_FLOW_ID_REQUESTED, getFlowId)
}

const queries = {
  getOrganizationProfile: `${BASE_URL_WEB}/User/profile`,
  editOrganizationProfile: `${BASE_URL_WEB}/User/profile`,
  editOrganizationProfilePassword: `${BASE_URL_WEB}/User/password`,
  updateAvatar: `${BASE_URL_WEB}/User/photo`,
  deleteUserPicture: `${BASE_URL_WEB}/User/photo`,
  getFlowId: `${BASE_URL_WEB}/Payment/GoCardless/CreateBillingRequestFlow`
}

const GET_ORGANIZATION_PROFILE_REQUESTED = 'GET_ORGANIZATION_PROFILE_REQUESTED'
const GET_ORGANIZATION_PROFILE_SUCCESS = 'GET_ORGANIZATION_PROFILE_SUCCESS'
const GET_ORGANIZATION_PROFILE_FAILED = 'GET_ORGANIZATION_PROFILE_FAILED'
const EDIT_ORGANIZATION_PROFILE_REQUESTED = 'EDIT_ORGANIZATION_PROFILE_REQUESTED'
const EDIT_ORGANIZATION_PROFILE_SUCCESS = 'EDIT_ORGANIZATION_PROFILE_SUCCESS'
const EDIT_ORGANIZATION_PROFILE_FAILED = 'EDIT_ORGANIZATION_PROFILE_FAILED'
const EDIT_ORGANIZATION_PROFILE_PASSWORD_REQUESTED = 'EDIT_ORGANIZATION_PROFILE_PASSWORD_REQUESTED'
const EDIT_ORGANIZATION_PROFILE_PASSWORD_SUCCESS = 'EDIT_ORGANIZATION_PROFILE_PASSWORD_SUCCESS'
const EDIT_ORGANIZATION_PROFILE_PASSWORD_FAILED = 'EDIT_ORGANIZATION_PROFILE_PASSWORD_FAILED'
const UPDATE_AVATAR_REQUESTED = 'UPDATE_AVATAR_REQUESTED'
const UPDATE_AVATAR_SUCCESS = 'UPDATE_AVATAR_SUCCESS'
const UPDATE_AVATAR_FAILED = 'UPDATE_AVATAR_FAILED'
const DELETE_USER_PICTURE_SUCCESS = 'DELETE_USER_PICTURE_SUCCESS'
const DELETE_USER_PICTURE_FAILED = 'DELETE_USER_PICTURE_FAILED'
const DELETE_USER_PICTURE_REQUESTED = 'DELETE_USER_PICTURE_REQUESTED'
const CHANGE_MENU_STATE = 'CHANGE_MENU_STATE'
const GET_FLOW_ID_SUCCESS = 'GET_FLOW_ID_SUCCESS'
const GET_FLOW_ID_FAILED = 'GET_FLOW_ID_FAILED'
const GET_FLOW_ID_REQUESTED = 'GET_FLOW_ID_REQUESTED'
