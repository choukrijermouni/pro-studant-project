import style from './style'
import { createUseStyles } from 'react-jss'
import HorizantalCard from 'components/Common/Cards/HorizantalCard'
import { Skeleton } from '@pro_boa/ui'

const useStyle = createUseStyles(style)

export default () => {
  const {
    headerContainer,
    firstPart,
    secondPart,
    searchBar,
    coursesContainer
  } = useStyle()
  const skeletonCoursesInProgress = [...Array(3)]
  return (
    <>
      <div className={headerContainer}>
        <div className={firstPart}>
          <div className={searchBar}>
            <Skeleton lines={1} height={45} width={300} />
          </div>
        </div>
        <div className={secondPart}>
          <Skeleton lines={1} height={45} width={300} />
          <Skeleton lines={1} height={45} width={300} />
        </div>
      </div>
      <div className={coursesContainer}>
        {skeletonCoursesInProgress.map((_, index) => {
          return (
            <div key={index}>
              <HorizantalCard loading />
            </div>
          )
        })}
      </div>
    </>

  )
}
