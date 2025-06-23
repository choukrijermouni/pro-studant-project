import {
  TypographyElement,
  Skeleton
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { useSelector } from 'react-redux'
import { AdminRole } from 'constants/'

const useStyle = createUseStyles(style)

export default () => {
  const {
    learnersBox,
    titleClass,
    learnersInfo,
    headerContainer,
    firstPart,
    secondPart,
    searchBar
  } = useStyle()
  const { user } = useSelector(({ identity }) => identity)
  const isAdmin = user?.role?.includes(AdminRole)
  return (
    <>
      <TypographyElement
        component='h2'
        variant='heading2'
        align='left'
        spacing='42px 0 30px 0'
        display='flex'
        className={titleClass}
      >
        {Text.teams}
      </TypographyElement>
      <div className={learnersBox}>
        <div className={learnersInfo}>
          <Skeleton lines={2} height={[30, 20]} gap={20} margin='50px 0 7px 0' width={['60%', '30%']} />
        </div>
        {
          isAdmin
            ? (
              <div className={learnersInfo}>
                <Skeleton lines={2} height={[30, 20]} gap={20} margin='50px 0 7px 0' width={['60%', '30%']} />
              </div>)
            : null
        }
        <div className={learnersInfo}>
          <Skeleton lines={2} height={[30, 20]} gap={20} margin='50px 0 7px 0' width={['60%', '30%']} />
        </div>
      </div>
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

    </>
  )
}
