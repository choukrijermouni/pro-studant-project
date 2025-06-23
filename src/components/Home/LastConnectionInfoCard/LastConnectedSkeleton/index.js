import style from './style'
import { createUseStyles } from 'react-jss'
import LastConnectionUserCard from 'components/Home/LastConnectionUserCard'
import InfoCard from 'components/Common/Cards/InfoCard'
import { Skeleton } from '@pro_boa/ui'

const useStyle = createUseStyles(style)

const skeletonLastConnected = [...Array(2)]

export default () => {
  const { textClass } = useStyle()
  return (

    <InfoCard loading>
      <div className={textClass}>
        <Skeleton lines={1} height={20} width='80%' margin='0 0 50px 0' />
        <div className={textClass}>
          {skeletonLastConnected.map((_, index) => {
            return (
              <div key={index}>
                <LastConnectionUserCard loading />
              </div>
            )
          })}
        </div>
      </div>
    </InfoCard>
  )
}
