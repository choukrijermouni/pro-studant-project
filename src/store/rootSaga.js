import { all } from 'redux-saga/effects'
import { IdentityRootSaga } from 'identity/store'
import { learnersRootSaga } from 'pages/Learners/store'
import { learnerProfileRootSaga } from 'pages/LearnerProfile/store'
import { referentialRootSaga } from './referential'
import { managersRootSaga } from 'pages/Manager/store'
import { teamsRootSaga } from 'pages/Teams/store'
import { teamDetailsRootSaga } from 'pages/TeamDetails/store'
import { managerDetailsRootSaga } from 'pages/ManagerDetails/store'
import { organiZationRootSaga } from 'pages/Home/store'
import { onboardingRootSaga } from 'pages/OnboardingContainer/store'
import { AdminsRootSaga } from 'pages/Admin/store'
import { organizationProfileRootSaga } from 'pages/MyAccount/store'
import { chartsRootSaga } from 'components/Common/ChartsSection/store'

export default function * () {
  yield all([
    IdentityRootSaga(),
    learnersRootSaga(),
    learnerProfileRootSaga(),
    referentialRootSaga(),
    teamsRootSaga(),
    teamDetailsRootSaga(),
    managersRootSaga(),
    managerDetailsRootSaga(),
    organiZationRootSaga(),
    onboardingRootSaga(),
    AdminsRootSaga(),
    organizationProfileRootSaga(),
    chartsRootSaga()
  ])
}
