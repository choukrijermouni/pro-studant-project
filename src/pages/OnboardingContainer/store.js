import { put, takeLatest } from '@redux-saga/core/effects'
import { AdminRole, BASE_URL_WEB, OnBoardingStateEnum } from 'constants/'
import { fetch } from '@pro_boa/js'
import { oidcUserManager } from 'identity'
import { push } from 'connected-react-router'
import { HomePath, generic404Path } from 'Routes'
import { select } from 'redux-saga/effects'

const initialState = {
  onBoardingState: OnBoardingStateEnum.Start,
  error: false,
  invitation: {
    accountInfo: {
      Email: ''
    },
    b2bNewUserOrganizationInfo: {
      teamName: 'Hidden Leaff',
      adminName: 'hinata hyuga',
      adminId: 'e3131c52-2dc7-44f4-a74f-7e47a08f7212',
      organizationName: 'Pro Managers test',
      organizationId: 'c0590bfd-7f48-4a9d-b124-d88c143ebc3c',
      teamId: ''
    }
  },
  userFormInfos: {
    TeamId: '',
    OrganizationId: '',
    FirstName: '',
    LastName: '',
    Password: '',
    Phone: ''
  }
}

export const reducer = (state = initialState, { type, data }) => {
  switch (type) {
    case INIT_ONBOARDING_SUCCEEDED:
      return {
        ...state,
        ...initialState,
        onBoardingState: data
      }
    case COMPLETE_ONBOARDING_SUCCEEDED:
      return {
        ...state,
        onBoardingState: OnBoardingStateEnum.Completed
      }
    case UPDATE_ACCOUNT_INFO:
      return {
        ...state,
        ...data
      }
    case UPDATE_PASSWORD:
      return {
        ...state,
        password: data
      }
    case VERIFY_INVITATION_SUCCEEDED:
      return {
        ...state,
        invitation: data
      }
    case VERIFY_INVITATION_FAILED:
      return {
        ...state,
        error: data
      }
    case SET_INVITED_INFOS:
      return {
        ...state,
        userFormInfos: {
          ...state.userFormInfos,
          FirstName: data.FirstName,
          LastName: data.LastName,
          Phone: data.Phone,
          TeamId: data.TeamId,
          OrganizationId: data.OrganizationId,
          Email: data.Email,
          InvitationId: data.InvitationId
        }
      }
    case SET_INVITED_PASSWORD:
      return {
        ...state,
        userFormInfos: {
          ...state.userFormInfos,
          Password: data.password
        }
      }
    default:
      return state
  }
}

export const initOnboarding = data => ({ type: INIT_ONBOARDING, data })
export const completeOnboardingAction = () => ({ type: COMPLETE_ONBOARDING_REQUESTED })
export const verifyInvitationAction = (token) => ({ type: VERIFY_INVITATION_REQUESTED, token })
export const setInvitedUserInfos = data => ({ type: SET_INVITED_INFOS, data })
export const setInvitedUserPassword = data => ({ type: SET_INVITED_PASSWORD, data })
export const createUserAndCompleteOnboarding = () => ({ type: COMPLETE_AND_CREATE_REQUESTED })

const getLocalUserInfo = ({ onboarding }) => onboarding.userFormInfos
const getUserRole = ({ onboarding }) => onboarding.invitation.b2bNewUserOrganizationInfo.userRole

function * completeOnboarding () {
  try {
    yield fetch(queries.completeOnboarding, { method: 'post', headers: { 'Content-Type': 'application/json' }, nojson: true, userManager: oidcUserManager })
    yield put({ type: COMPLETE_ONBOARDING_SUCCEEDED })
  } catch (err) {
    yield put({ type: COMPLETE_ONBOARDING_FAILED, err })
  }
}

function * verifyInvitation ({ token }) {
  try {
    const response = yield fetch(queries.verifyInvitation(token), { userManager: oidcUserManager })
    if (response.UserEmail) {
      const data = {
        onBoardingState: OnBoardingStateEnum.Start,
        b2bNewUserOrganizationInfo: {
          teamName: response.TeamName,
          adminName: response.AdminName,
          adminId: response.AdminId,
          organizationName: response.OrganizationName,
          organizationId: response.Id,
          teamId: response.TeamId,
          organizationLicenseType: response.OrganizationLicenseType,
          invitationId: response.InvitationId,
          userRole: response.UserRole
        },
        accountInfo: {
          Email: response.UserEmail
        }
      }
      yield put({ type: VERIFY_INVITATION_SUCCEEDED, data })
    } else yield put(push(generic404Path))
  } catch (err) {
    yield put({ type: VERIFY_INVITATION_FAILED, err })
    yield put(push(generic404Path))
  }
}

function * initOnboardingAction ({ data }) {
  try {
    yield put({ type: INIT_ONBOARDING_SUCCEEDED, data })
    if (data === OnBoardingStateEnum.Start) {
      yield put(push(HomePath))
    }
  } catch (err) {
    yield put({ type: INIT_ONBOARDING_FAILED, err })
  }
}

function * completeAndCreate () {
  const userData = yield select(getLocalUserInfo)
  const UserRole = yield select(getUserRole)

  const formatedData = {
    organizationId: userData.OrganizationId,
    firstName: userData.FirstName,
    lastName: userData.LastName,
    email: userData.Email,
    password: userData.Password,
    invitationId: userData.InvitationId
  }
  if (userData.TeamId) formatedData.teamId = userData.TeamId

  try {
    if (String(UserRole) === AdminRole) {
      yield fetch(queries.createAdmin, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formatedData }), nojson: true, userManager: oidcUserManager })
      yield put({ type: CREATE_ADMIN_SUCCEEDED })
    } else {
      yield fetch(queries.createManager, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formatedData }), nojson: true, userManager: oidcUserManager })
      yield put({ type: CREATE_MANAGER_SUCCEEDED })
    }
    yield put(push('/login'))
  } catch (err) {
    if (String(UserRole) === AdminRole) yield put({ type: CREATE_ADMIN_FAILED, err })
    else yield put({ type: CREATE_MANAGER_FAILED, err })
  }
}

export function * onboardingRootSaga () {
  yield takeLatest(COMPLETE_ONBOARDING_REQUESTED, completeOnboarding)
  yield takeLatest(VERIFY_INVITATION_REQUESTED, verifyInvitation)
  yield takeLatest(INIT_ONBOARDING, initOnboardingAction)
  yield takeLatest(COMPLETE_AND_CREATE_REQUESTED, completeAndCreate)
}

const queries = {
  completeOnboarding: `${BASE_URL_WEB}/User/completeOnBoarding`,
  verifyInvitation: (token) => `${BASE_URL_WEB}/User/VerifyInvitationLink?token=${encodeURIComponent(token)}`,
  createManager: `${BASE_URL_WEB}/Manager`,
  createAdmin: `${BASE_URL_WEB}/Admin`
}

const COMPLETE_ONBOARDING_REQUESTED = 'COMPLETE_ONBOARDING_REQUESTED'
const COMPLETE_ONBOARDING_SUCCEEDED = 'COMPLETE_ONBOARDING_SUCCEEDED'
const COMPLETE_ONBOARDING_FAILED = 'COMPLETE_ONBOARDING_FAILED'
const UPDATE_ACCOUNT_INFO = 'UPDATE_ACCOUNT_INFO'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const VERIFY_INVITATION_REQUESTED = 'VERIFY_INVITATION_REQUESTED'
const VERIFY_INVITATION_SUCCEEDED = 'VERIFY_INVITATION_SUCCEEDED'
const VERIFY_INVITATION_FAILED = 'VERIFY_INVITATION_FAILED'
const INIT_ONBOARDING = 'INIT_ONBOARDING'
const INIT_ONBOARDING_SUCCEEDED = 'INIT_ONBOARDING_SUCCEEDED'
const INIT_ONBOARDING_FAILED = 'INIT_ONBOARDING_FAILED'
const SET_INVITED_INFOS = 'SET_INVITED_INFOS'
const SET_INVITED_PASSWORD = 'SET_INVITED_PASSWORD'
const COMPLETE_AND_CREATE_REQUESTED = 'COMPLETE_AND_CREATE_REQUESTED'
const CREATE_MANAGER_SUCCEEDED = 'CREATE_MANAGER_SUCCEEDED'
const CREATE_MANAGER_FAILED = 'CREATE_MANAGER_FAILED'
const CREATE_ADMIN_SUCCEEDED = 'CREATE_ADMIN_SUCCEEDED'
const CREATE_ADMIN_FAILED = 'CREATE_ADMIN_FAILED'
