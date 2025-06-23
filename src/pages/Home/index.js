import Layout from 'components/Common/Layout'
import OnBoardingManager from 'pages/OnboardingContainer'
import { OnBoardingStateEnum } from 'constants/'
import { useDispatch, useSelector } from 'react-redux'
import { createUseStyles } from 'react-jss'
import style from './style'
import { useEffect } from 'react'
import { initHomePageAction } from 'pages/Learners/store'
import ChartsSectionSkeleton from 'components/Common/skeletons/ChartsSectionSkeleton'
import LicenseInfoCardSkeleton from 'components/Home/LicenseInfoCardSkeleton'
import LastConnectedSkeleton from 'components/Home/LastConnectionInfoCard/LastConnectedSkeleton'
import CoursesDoneSkeleton from 'components/Common/skeletons/CoursesDoneSkeleton'
import RecommendationSkeleton from 'components/Home/RecommendationSkeleton'
import HomeWithData from './homeWithData'

const useStyle = createUseStyles(style)

export default () => {
  const dispatch = useDispatch()
  const { cardsContainer, skeletonSection } = useStyle()
  useEffect(() => {
    dispatch(initHomePageAction())
  }, [])
  const { onBoardingState } = useSelector(state => state.onboarding)
  const loading = useSelector(({ config }) => config.loading)
  return (
    onBoardingState === OnBoardingStateEnum.Start
      ? <OnBoardingManager />
      : (
        <Layout>
          {
            loading
              ? (
                <div className={skeletonSection}>
                  <ChartsSectionSkeleton />
                  <div className={cardsContainer}>
                    <LicenseInfoCardSkeleton />
                    <LicenseInfoCardSkeleton />
                  </div>
                  <div className={cardsContainer}>
                    <LastConnectedSkeleton />
                    <CoursesDoneSkeleton />
                  </div>
                  <RecommendationSkeleton />
                </div>
                )
              : <HomeWithData />
          }
        </Layout>)
  )
}
