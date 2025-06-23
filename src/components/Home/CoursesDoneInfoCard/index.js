import style from './style'
import Text from './text.json'
import { createUseStyles } from 'react-jss'
import HorizantalCard from 'components/Common/Cards/HorizantalCard'
import InfoCard from 'components/Common/Cards/InfoCard'
import moment from 'moment'
import { CertificatePath } from 'Routes'
import { fetchCoursesDoneAction } from 'pages/Home/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  DMYDateFormat,
  frontUrl,
  helpLinks
} from 'constants/'
import { usePagination, Button, ButtonVariation, ButtonSize, TypographyElement, neutral } from '@pro_boa/ui'
import { noResults } from 'assets'

const useStyle = createUseStyles(style)

export default () => {
  const {
    LearningCardsContainer,
    horizontalCards,
    paginationFooter,
    emptyContainer,
    illustrationClass,
    scrollable
  } = useStyle()
  const dispatch = useDispatch()
  const { doneCourses } = useSelector(state => state.organization)
  const { dateFilter } = useSelector(state => state.organization)
  const { page, rowsPerPage, skip, setPage } = usePagination()
  useEffect(() => { dispatch(fetchCoursesDoneAction(rowsPerPage, skip)) }, [rowsPerPage, skip, page, dateFilter])
  return (
    doneCourses?.count > 0
      ? (
        <InfoCard title={Text.finished} infoLink={helpLinks.homePage}>
          <div className={scrollable}>
            <div className={LearningCardsContainer}>
              {
                doneCourses?.data?.map((course, index) => {
                  return (
                    <div
                      key={index}
                      className={horizontalCards}
                      onClick={() => { window.open(`${frontUrl}${CertificatePath}/${course?.CertificateId}`, '_blank') }}
                    >
                      <HorizantalCard
                        image={course.Image}
                        title={course.Title}
                        trainerName={`${course.FirstName} ${course.LastName}`}
                        isHome
                        uploadDate={moment(course.CertificationDate).format(DMYDateFormat)}
                      />
                    </div>
                  )
                })
              }
              {doneCourses?.count > doneCourses?.data?.length && (
                <div className={paginationFooter}>
                  <Button
                    variation={ButtonVariation.secondary}
                    width={160}
                    height={30}
                    size={ButtonSize.small}
                    label={Text.showMore}
                    handleClick={() => setPage(page + 1)}
                  />
                </div>
              )}
            </div>
          </div>
        </InfoCard>)
      : (
        <InfoCard title={Text.finished} infoLink={helpLinks.homePage}>
          <div className={emptyContainer}>
            <object type='image/svg+xml' data={noResults} className={illustrationClass}>svg-animation</object>
            <TypographyElement
              variant='body1'
              color={neutral[5]}
              fontSize='16px'
              lineHeight='26px'
              display='inline'
              spacing='0 8px 0 0'
            >
              {Text.noCourse}
            </TypographyElement>
          </div>
        </InfoCard>)
  )
}
