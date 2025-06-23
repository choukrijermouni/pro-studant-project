import ProfileInfo from 'components/Profile/ProfileInfo'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Recommendation from 'components/Home/Recommendation'
import LearnerCoursesCard from 'components/Learners/LearnerCoursesCard'
import ChartsSection from 'components/Common/ChartsSection'
import { helpLinks, totalViewQueryFields } from 'constants/'
import EmptyPage from 'components/Common/EmptyPage'
import Text from './text'
import AlertBanner from 'components/Common/AlertBanner'
import moment from 'moment'

export default () => {
  const { id } = useParams()
  const {
    FirstName,
    LastName,
    Email,
    LastConnectionDate,
    EndDate,
    IsActive,
    Photo,
    OrganizationLicenseType,
    TeamId,
    TeamImage,
    TeamName,
    coursesInProgress,
    data
  } = useSelector(state => state.profile)
  const { isManager } = useSelector(({ organizationProfile }) => organizationProfile)
  return (
    <>
      <ProfileInfo
        size='size_4'
        TeamId={TeamId}
        TeamImage={TeamImage}
        TeamName={TeamName}
        Name={`${FirstName} ${LastName}`}
        Email={Email}
        manager={isManager}
        LastConnectionDate={LastConnectionDate}
        EndDate={EndDate}
        IsActive={IsActive}
        Photo={Photo}
        OrganizationLicenseType={OrganizationLicenseType}
      />
      {(moment(EndDate).isAfter(moment()) || coursesInProgress?.Count)
        ? (
          <>
            {!coursesInProgress?.Count && <AlertBanner message={Text.bannerText} />}
            {coursesInProgress?.Count ? <ChartsSection id={id} field={totalViewQueryFields.user} infoLink={helpLinks.learnerProfile} showLearnerActions fullName={`${FirstName} ${LastName}`} /> : null}
            <LearnerCoursesCard fullName={`${FirstName} ${LastName}`} />
            <Recommendation
              FirstName={FirstName}
              LastName={LastName}
              data={data}
            />
          </>)
        : <EmptyPage
            Title={Text.Title}
            SubTitle={Text.SubTitle}
            manager
          />}
    </>
  )
}
