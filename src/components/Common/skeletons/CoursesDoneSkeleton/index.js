import style from './style'
import { createUseStyles } from 'react-jss'
import HorizantalCard from 'components/Common/Cards/HorizantalCard'
import InfoCard from 'components/Common/Cards/InfoCard'

const useStyle = createUseStyles(style)

const skeletonCourses = [...Array(3)]

export default () => {
  const {
    LearningCardsContainer,
    horizontalCards
  } = useStyle()
  return (
    <InfoCard loading>
      <div className={LearningCardsContainer}>
        {skeletonCourses.map((_, index) => {
          return (
            <div key={index} className={horizontalCards}>
              <HorizantalCard loading />
            </div>
          )
        })}
      </div>
    </InfoCard>
  )
}
