import { helpLinks, totalViewQueryFields } from 'constants/'
import { useSelector } from 'react-redux'
import { createUseStyles } from 'react-jss'
import style from './style'
import NoLicenseInfoCard from 'components/Home/NoLicenseInfoCard'
import LastAffectedLearnersInfoCard from 'components/Home/LastAffectedLearnersInfoCard'
import LastConnectionInfoCard from 'components/Home/LastConnectionInfoCard'
import CoursesDoneInfoCard from 'components/Home/CoursesDoneInfoCard'
import ChartsSection from 'components/Common/ChartsSection'
import EmptyPage from 'components/Common/EmptyPage'
import Recommendation from 'components/Home/Recommendation'

const useStyle = createUseStyles(style)

export default () => {
  const { cardsContainer } = useStyle()
  const id = useSelector(state => state.organization).Id
  const Total = useSelector(({ learners }) => learners.Total)
  return (
    Total
      ? (
        <>
          <ChartsSection id={id} field={totalViewQueryFields.organization} infoLink={helpLinks.homePage} showLearnersActions />
          <div className={cardsContainer}>
            <NoLicenseInfoCard />
            <LastAffectedLearnersInfoCard />
          </div>
          <div className={cardsContainer}>
            <LastConnectionInfoCard />
            <CoursesDoneInfoCard />
          </div>
          <Recommendation />
        </>)
      : <EmptyPage variant='learner' />
  )
}
