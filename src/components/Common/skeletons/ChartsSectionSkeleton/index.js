import { createUseStyles } from 'react-jss'
import style from './style'
import InfoCard from 'components/Common/Cards/InfoCard'
import { Skeleton } from '@pro_boa/ui'
import { barChartSkeleton, radarChartSkeleton } from 'assets'

const useStyle = createUseStyles(style)

export default () => {
  const {
    cardsContainer,
    ChartSkeletonStyle,
    ctaStyle,
    actionContainer
  } = useStyle()
  return (
    <>
      <div className={actionContainer}>
        <Skeleton lines={1} height={30} width={200} />
        <div className={ctaStyle}>
          <Skeleton lines={1} height={45} width={200} />
          <Skeleton lines={1} height={45} width={200} />
        </div>
      </div>
      <div className={cardsContainer}>
        <InfoCard loading width='50%' noKnowMore>
          <Skeleton lines={1} height={20} width='50%' />
          <div className={ChartSkeletonStyle}><object type='image/svg+xml' data={barChartSkeleton}>svg-animation</object></div>
        </InfoCard>
        <InfoCard loading width='50%' noKnowMore>
          <div className={ChartSkeletonStyle}>
            <object type='image/svg+xml' data={radarChartSkeleton}>svg-animation</object>
          </div>
        </InfoCard>
      </div>
    </>
  )
}
