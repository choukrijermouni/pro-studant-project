import {
  Slider,
  Card,
  CardSize,
  Container,
  CardVariation
} from '@pro_boa/ui'
import style from './style'
import { createUseStyles } from 'react-jss'
import Text from './text.json'
import { chunk } from 'lodash'
import { frontUrl } from 'constants/'
import { CourseNeutralPath } from 'Routes'
import { useSelector } from 'react-redux'

const useStyle = createUseStyles(style)

const viewCards = (view, splicedCourses, style, loading) => splicedCourses.map((item, key) => {
  return (
    <div key={key} className={view}>
      {
        item.map((course, courseKey) => (
          course !== undefined
            ? (
              <div className={style} key={course.Id}>
                {
                  loading
                    ? (
                      <Card
                        size={CardSize.small}
                        variant={CardVariation.regular} loading
                      />)
                    : (
                      <Card
                        key={course.Id}
                        image={course.Image}
                        rate={course.Rating}
                        userRated={course.ReviewersCount}
                        duration={course.Duration}
                        usersEnrolled={course.ViewersCount}
                        title={course.Title}
                        size={CardSize.small}
                        variant={CardVariation.regular}
                        buttonText={Text.button}
                        handleCardClick={() => window.open(`${frontUrl}${CourseNeutralPath}/${course.Slug}`, '_blank')}
                      />)
                }
              </div>)
            : <Card key={courseKey} shadow size={CardSize.small} />
        ))
      }
    </div>
  )
}
)
const scale = window.devicePixelRatio
const coursesNumber = scale > 1.5 ? 4 : 5
export default ({ FirstName, LastName, loading, data }) => {
  const newCourses = useSelector(({ organization }) => organization.newCourses) || []
  const { view, card, root } = useStyle()
  const splicedCourses = chunk(data || newCourses, coursesNumber).map(chunkCourses => {
    chunkCourses.push(...Array(coursesNumber - chunkCourses.length))
    return chunkCourses
  })
  return (
    <Container nopadding className={root}>
      <Slider
        title={FirstName || LastName ? `${Text.title} ${FirstName || ''} ${LastName || ''}` : Text.discover}
        views={viewCards(view, splicedCourses, card, loading)}
        screen='desktop'
        padding='32px 0 0 0'
      />
    </Container>
  )
}
