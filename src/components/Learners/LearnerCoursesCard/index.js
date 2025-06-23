import style from './style'
import Text from './text.json'
import { Button, usePagination } from '@pro_boa/ui'
import { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useDispatch, useSelector } from 'react-redux'
import { CourseNeutralPath } from 'Routes'
import HorizantalCard from 'components/Common/Cards/HorizantalCard'
import { frontUrl } from 'constants/'
import { fetchLearnerCourseInProgressAction, downloadCertificateAction } from 'pages/LearnerProfile/store'
import { useParams } from 'react-router-dom'
import SearchBar from 'components/Common/SearchBar'

const useStyle = createUseStyles(style)

export default ({ fullName }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const {
    buttonContainer,
    LearningCardsContainer,
    controls,
    coursesContainer
  } = useStyle()
  const { coursesInProgress } = useSelector(state => state.profile)
  const [search, setSearch] = useState('')
  const { page, rowsPerPage, skip, setPage, setRowsPerPage } = usePagination()
  useEffect(() => setRowsPerPage(5), [])
  const handleSearch = value => {
    setSearch(value)
    setPage(0)
  }
  const { loading } = useSelector(state => state.config)
  useEffect(() => { dispatch(fetchLearnerCourseInProgressAction(id, rowsPerPage, skip, search)) }, [id, page, search, rowsPerPage])
  return (
    coursesInProgress?.Count
      ? (
        <>
          <div className={controls}>
            <SearchBar
              handleChange={handleSearch}
              label={Text.searchLabel}
              height={45}
              width={300}
              marginRight={24}
              noWidthPreset
            />
          </div>
          <div className={coursesContainer}>
            {
              loading
                ? <HorizantalCard loading />
                : coursesInProgress?.Data?.map((course, index) =>
                  <div
                    className={LearningCardsContainer}
                    key={index}
                    onClick={() => window.open(`${frontUrl}${CourseNeutralPath}/${course.Slug}`, '_blank')}
                  >
                    <HorizantalCard
                      downloadCertificate={(e) => {
                        e.stopPropagation()
                        dispatch(downloadCertificateAction(id, course.Id))
                      }}
                      image={course.Image}
                      title={course.Title}
                      trainerName={course.author}
                      progress={course.CompletionPercentage}
                      duration={course.Duration}
                      uploadDate={course.LastAccessedDate}
                    />
                  </div>
                )
            }
          </div>
          {
            coursesInProgress?.FilteredCount && coursesInProgress?.FilteredCount > (skip + rowsPerPage)
              ? (
                <div className={buttonContainer}>
                  <Button
                    variation='secondary'
                    size='big'
                    width='153px'
                    height='54px'
                    label={Text.showMore}
                    handleClick={() => { setPage(page + 1) }}
                    marginButton='24px 0 0 0'
                  />
                </div>
                )
              : null
          }
        </>
        )
      : null
  )
}
