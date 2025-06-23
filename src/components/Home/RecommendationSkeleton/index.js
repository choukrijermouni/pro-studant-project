import {
  Slider,
  Card,
  CardSize,
  Container,
  CardVariation
} from '@pro_boa/ui'
import style from './style'
import { createUseStyles } from 'react-jss'

const useStyle = createUseStyles(style)

const RecommendationCards = (view, skeletonCourses) => [
  <div key={0} className={view}>
    {skeletonCourses.map((_, index) => {
      return (
        <div key={index}>
          <Card
            size={CardSize.small}
            variant={CardVariation.regular}
            loading
          />
        </div>
      )
    })}
  </div>
]
const scale = window.devicePixelRatio
const coursesNumber = scale > 1.5 ? 4 : 5
export default () => {
  const { view, root } = useStyle()
  const skeletonCourses = [...Array(coursesNumber)]
  return (
    <Container nopadding className={root}>
      <Slider
        views={RecommendationCards(view, skeletonCourses)}
        screen='desktop'
        padding='32px 0 0 0'
      />
    </Container>
  )
}
