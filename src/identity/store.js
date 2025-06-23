import { takeLatest, put, all } from 'redux-saga/effects'
import {
  getUser,
  signinSilent,
  signout,
  clean
} from '@pro_boa/js'
import { accessTokenExpired, accessTokenExpiring, oidcUserManager, userLoaded, userSignedOut, userUnloaded } from './'
import { initDataStore } from 'store/initDataStore'

export const SIGNIN = 'SIGNIN'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const LOGOUT_FAILED = 'LOGOUT_FAILED'
export const TRY_LOGOUT = 'TRY_LOGOUT'
const TRY_LOGIN = 'TRY_LOGIN'

const initialState = {
  user: null,
  isConnected: false,
  ProfileType: null,
  logoutInProgress: false
}

export const reducer = (state = initialState, { type, data }) => {
  switch (type) {
    case SIGNIN:
      return {
        user: data,
        ProfileType: data.ProfileType,
        isConnected: true
      }
    case LOGOUT_SUCCESS:
      return { ...initialState, logoutInProgress: true }
    default:
      return state
  }
}

function * tryLogin () {
  try {
    let user = yield getUser(oidcUserManager)
    if (user && !user.expired) {
      yield signin(user)
    } else if (user) {
      user = yield signinSilent(oidcUserManager)
      yield signin(user)
    }
  } catch (error) {
    yield put(tryLogout())
  }
}

export function * cleanAndLogout () {
  try {
    yield signout(oidcUserManager)
    yield clean(oidcUserManager)
    yield put(logoutSuccess())
  } catch (err) {
    yield put({ type: LOGOUT_FAILED, data: err })
  }
}

export const initIdentityStore = (dispatch) => {
  userSignedOut(() => dispatch(logoutSuccess()))
  userUnloaded(() => dispatch(logoutSuccess()))
  userLoaded((user) => dispatch(signin({ profile: user })))
  accessTokenExpired(() => dispatch(tryLogout()))
  accessTokenExpiring(() => dispatch(tryLoginAction()))
}

export function * initDataStoreSaga () {
  yield all(initDataStore())
}

export function * IdentityRootSaga () {
  yield takeLatest(TRY_LOGOUT, cleanAndLogout)
  yield takeLatest(TRY_LOGIN, tryLogin)
  yield takeLatest(SIGNIN, initDataStoreSaga)
}

export const signin = ({ profile }) => ({ type: SIGNIN, data: profile })
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS })
export const tryLogout = () => ({ type: TRY_LOGOUT })
export const tryLoginAction = () => ({ type: TRY_LOGIN })
