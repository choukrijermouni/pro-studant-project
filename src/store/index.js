import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reducer as identityReducer, initIdentityStore } from 'identity/store'
import { reducer as teams } from 'pages/Teams/store'
import { reducer as teamDetails } from 'pages/TeamDetails/store'
import { reducer as managers } from 'pages/Manager/store'
import { reducer as manager } from 'pages/ManagerDetails/store'
import { reducer as learners } from 'pages/Learners/store'
import { reducer as profile } from 'pages/LearnerProfile/store'
import { reducer as referential } from 'store/referential'
import { reducer as organization } from 'pages/Home/store'
import { reducer as onboarding } from 'pages/OnboardingContainer/store'
import { reducer as admins } from 'pages/Admin/store'
import { reducer as notification } from 'components/Common/Banner/store'
import { reducer as organizationProfile } from 'pages/MyAccount/store'
import { reducer as chartsData } from 'components/Common/ChartsSection/store'
import { reducer as config } from 'store/config'

import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import rootSaga from './rootSaga'
import createLogger from 'redux-logger'

export const history = createBrowserHistory()

const reducers = {
  router: connectRouter(history),
  identity: identityReducer,
  learners,
  profile,
  referential,
  teams,
  teamDetails,
  managers,
  manager,
  organization,
  onboarding,
  admins,
  notification,
  organizationProfile,
  config,
  chartsData
}

const rootReducer = persistCombineReducers({
  key: 'root',
  storage,
  blacklist: ['managers']
}, reducers)

const middlewares = []
const enhancers = []

/* Saga */
const sagaMiddleware = createSagaMiddleware({})

middlewares.push(sagaMiddleware)
middlewares.push(routerMiddleware(history))
middlewares.push(createLogger)

window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? enhancers.push(applyMiddleware(...middlewares)) : enhancers.push(applyMiddleware(...middlewares))

/* Create Store */

export const store = createStore(
  rootReducer,
  compose(...enhancers)
)

export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)
initIdentityStore(store.dispatch, store)
