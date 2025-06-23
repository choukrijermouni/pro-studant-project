import { useSelector } from 'react-redux'
import { oldCostumer } from 'constants/'
import Onboarding from './Onboarding'
import OnBoardingAdmin from './OnBoardingAdmin'

let accountType = ''

export default ({ isInvited = false }) => {
  const { Description } = useSelector(({ organization }) => organization)
  accountType = Description
  switch (accountType) {
    case oldCostumer:
      return <Onboarding />
    case null:
    case undefined:
      return <OnBoardingAdmin isInvited={isInvited} />
    default:
      return null
  }
}
