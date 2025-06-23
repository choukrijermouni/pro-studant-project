import { createUseStyles } from 'react-jss'
import style from './style'
import UserCard from 'components/Team/UserCard'
import { Skeleton } from '@pro_boa/ui'

const useStyle = createUseStyles(style)

export default () => {
  const {
    searchBar,
    headerContainer,
    firstPart
  } = useStyle()

  const skeletonLicense = [...Array(3)]
  return (
    <>
      <div className={headerContainer}>
        <div className={firstPart}>
          <div className={searchBar}>
            <Skeleton lines={1} height={45} width={300} />
          </div>
        </div>
      </div>
      {skeletonLicense.map((_, index) => {
        return (
          <div key={index}>
            <UserCard loading />
          </div>
        )
      })}
    </>
  )
}
