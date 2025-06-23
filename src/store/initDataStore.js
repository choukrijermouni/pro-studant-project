import { put } from 'redux-saga/effects'
import {
  fetchLicenseInfoAction,
  fetchOrganizationAction,
  fetchOrganizationTotalLearnersAction
} from 'pages/Home/store'

import {
  fetchCategoriesAction,
  fetchDatePartAction,
  fetchEmailTypesAction,
  fetchFunctionsAction,
  fetchOrganizationLicenseTypesAction,
  fetchSubscriptionCycleTypeAction,
  fetchUserRolesAction
} from './referential'

import { getManagersListAction } from 'pages/TeamDetails/store'
import { fetchOrganizationProfileAction } from 'pages/MyAccount/store'

const noLoaderAction = true

export const initDataStore = () => [
  put(fetchUserRolesAction()),
  put(fetchOrganizationAction()),
  put(fetchOrganizationLicenseTypesAction()),
  put(fetchSubscriptionCycleTypeAction()),
  put(fetchDatePartAction()),
  put(fetchFunctionsAction()),
  put(fetchCategoriesAction()),
  put(fetchLicenseInfoAction(noLoaderAction)),
  put(getManagersListAction()),
  put(fetchOrganizationTotalLearnersAction()),
  put(fetchOrganizationProfileAction()),
  put(fetchEmailTypesAction())
]
