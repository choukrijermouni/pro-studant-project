import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Home from 'pages/Home'
import Admin from 'pages/Admin'
import Test from 'pages/Test'
import Learners from 'pages/Learners'
import LearnerProfile from 'pages/LearnerProfile'
import LearnerHistory from 'components/Learner/LearnerHistory'
import LearnerAffectationHistory from 'components/Learner/LearnerAffectationHistory'
import Teams from 'pages/Teams'
import MyAccount from 'pages/MyAccount'
import { history } from 'store'
import Manager from 'pages/Manager'
import ManagerDetails from 'pages/ManagerDetails'
import TeamDetails from 'pages/TeamDetails'
import Signin from 'pages/Signin'
import Unauthorized from 'pages/Unauthorized'
import { useSelector, useDispatch } from 'react-redux'
import AdminProfile from 'components/Admin/AdminProfile'
import Error404 from 'pages/404'
import Generic404 from 'pages/Generic404'
import Signout from 'pages/Signout'
import { SignOutPath } from 'identity'
import { AdminRole, ManagerRole } from 'constants/'
import Reports from 'pages/Reports'
import InvitedProfile from 'components/Profile/InvitedProfile'
import InvitedManager from 'components/Manager/InvitedManager'
import { verifyInvitationAction } from 'pages/OnboardingContainer/store'
import { useQuery } from 'hooks'
import OnBoardingManager from 'pages/OnboardingContainer'

const UnauthenticatedRouter = _ => {
  const dispatch = useDispatch()
  const token = useQuery('token')
  useEffect(() => {
    if (token) {
      dispatch(verifyInvitationAction(token))
    }
  }, [token])
  return (
    <Switch>
      {token && <OnBoardingManager isInvited />}
      <Route exact path={SigninPath}>
        <Signin />
      </Route>
      <Route exact path={SignOutPath}>
        <Signout />
      </Route>
      <Route path={HomePath}>
        <Unauthorized />
      </Route>
      <Route path={generic404Path}>
        <Generic404 />
      </Route>
    </Switch>
  )
}

export default _ => {
  useEffect(() => {
    history.listen(() => { window.scrollTo(0, 0) })
  }, [])

  const { isConnected, user } = useSelector(({ identity }) => identity)
  const isAdminRole = user?.role?.includes(AdminRole)
  const isManagerRole = user?.role?.includes(ManagerRole)
  return (
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path={SigninPath}>
              <Signin />
            </Route>
            <Route exact path={SignOutPath}>
              <Signout />
            </Route>
            <Route exact path={HomePath}>
              <Home />
            </Route>
            <Route exact path={LearnerHistoryPath}>
              <LearnerHistory />
            </Route>
            <Route exact path={LearnerAffectationHistoryPath}>
              <LearnerAffectationHistory />
            </Route>
            <Route exact path={LearnersPath}>
              <Learners />
            </Route>
            <Route exact path={LearnerProfilePath}>
              <LearnerProfile />
            </Route>
            <Route exact path={InvitedProfilePath}>
              <InvitedProfile />
            </Route>
            <Route exact path={TeamsPath}>
              <Teams />
            </Route>
            <Route exact path={MyAccountPath}>
              <MyAccount />
            </Route>
            <Route exact path={AdminPath}>
              <Admin />
            </Route>
            <Route exact path={AdminProfilePath}>
              <AdminProfile />
            </Route>
            <Route exact path={TestPath}>
              <Test />
            </Route>
            <Route exact path={ManagersPath}>
              <Manager />
            </Route>
            <Route exact path={ManagerProfilePath}>
              <ManagerDetails />
            </Route>
            <Route exact path={InvitedManagerPath}>
              <InvitedManager />
            </Route>
            <Route exact path={TeamDetailsPath}>
              <TeamDetails />
            </Route>
            <Route exact path={RapportsPath}>
              <Reports />
            </Route>
            <Route path={pageNotFoundPath}>
              <Error404 />
            </Route>
            <Route>
              <Error404 />
            </Route>
          </Switch>
        </ConnectedRouter>)
}

export const ErrorPath = '/erreur'
export const HomePath = '/'
export const MyAccountPath = '/monCompte'
export const LearnersPath = '/apprenants'
export const LearnerProfileNeutralPath = '/apprenant'
export const LearnerProfilePath = `${LearnerProfileNeutralPath}/:id`
export const LearnerHistoryPath = `${LearnerProfileNeutralPath}/historique`
export const AffectationHistoryPath = `${LearnerProfileNeutralPath}/historiqueAffectation`
export const LearnerAffectationHistoryPath = `${AffectationHistoryPath}/:id`
export const NotificationsPath = '/notifications'
export const AdminPath = '/administrateur'
export const AdminProfileNeutralPath = `${AdminPath}/profile`
export const AdminProfilePath = `${AdminPath}/profile/:id`
export const TestPath = '/test'
export const ManagersPath = '/managers'
export const ManagerProfileNeutralPath = '/manager'
export const ManagerProfilePath = `${ManagerProfileNeutralPath}/:id`
export const TeamsPath = '/equipes'
export const TeamDetailsNeutralPath = '/equipe'
export const TeamDetailsPath = `${TeamDetailsNeutralPath}/:id`
export const SigninPath = '/signin'
export const pageNotFoundPath = '/404'
export const generic404Path = '/generic404'
export const CourseNeutralPath = '/tutoriel'
export const CertificatePath = '/Attestation'
export const RapportsPath = '/rapports'
export const InvitedProfilePath = '/apprenantInvite'
export const InvitedManagerPath = '/managerInvite'
