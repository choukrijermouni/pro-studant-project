import Layout from 'components/Common/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { fetchLearnerCourseInProgressAction, fetchLearnerProfileAction, fetchRecommendedCoursesAction } from './store'
import GoBackAction from 'components/Common/GoBackAction'
import { TurnOnLoaderAction } from 'store/config'
import ProfileInfoSkeleton from 'components/Profile/ProfileInfoSkeleton'
import ChartsSectionSkeleton from 'components/Common/skeletons/ChartsSectionSkeleton'
import LearnerCoursesCardSkeleton from 'components/Learners/LearnerCoursesCardSkeleton'
import RecommendationSkeleton from 'components/Home/RecommendationSkeleton'
import { createUseStyles } from 'react-jss'
import style from './style'
import LearnerWithData from './learnerWithData'

const useStyle = createUseStyles(style)

export default () => {
  const dispatch = useDispatch()
  const { chartSection } = useStyle()
  const { id } = useParams()
  useEffect(() => {
    dispatch(TurnOnLoaderAction())
    dispatch(fetchLearnerProfileAction(id))
    dispatch(fetchLearnerCourseInProgressAction(id))
    dispatch(fetchRecommendedCoursesAction(id))
  }, [id])
  const { loading } = useSelector(state => state.config)
  return (
    <Layout noInviteBar>
      <GoBackAction />
      {
        loading
          ? (
            <>
              <ProfileInfoSkeleton />
              <div className={chartSection}>
                <ChartsSectionSkeleton />
              </div>
              <LearnerCoursesCardSkeleton />
              <RecommendationSkeleton />
            </>)
          : <LearnerWithData />
      }

    </Layout>
  )
}
