import style from './style'
import Text from './text.json'
import { createUseStyles } from 'react-jss'
import InfoCard from 'components/Common/Cards/InfoCard'
import { Bar, Radar } from 'react-chartjs-2'
import { options, radarOptions } from 'helpers/home'
import { useParams } from 'react-router'
import {
  TypographyElement,
  neutral,
  blue,
  SelectList
} from '@pro_boa/ui'
import {
  iconBd,
  iconOffice,
  iconDev,
  iconInfra,
  iconNetwork,
  iconSecurity,
  iconVirtual
} from 'assets'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  secondsToMinsChartFormat,
  ToHours,
  barChartFormat,
  radarChartFormat
} from 'helpers'
import {
  endOfCurrentMonth,
  startOfCurrentMonth,
  learnerDateType
} from 'constants/'
import {
  fetchLearnerBarChartAction,
  fetchLearnerCategoryPerformanceAction
} from 'pages/LearnerProfile/store'

const useStyle = createUseStyles(style)

const filterItems = [
  { Id: 1, Name: 'Filter' }
]
export default () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const {
    cardsContainer,
    radarContainer,
    selectSearchableItem,
    overlay,
    fourthIcon,
    fifthIcon,
    sixthIcon,
    seventhIcon,
    thirdIcon,
    secendIcon,
    radarSubContainer,
    textClass,
    firstIcon,
    cardContent,
    leftSide
  } = useStyle()
  const [filter, setFilter] = useState({ Id: 0, Name: '' })
  const { barChart, categoryChart } = useSelector(state => state.profile)
  useEffect(() => { dispatch(fetchLearnerBarChartAction(id, learnerDateType, startOfCurrentMonth, endOfCurrentMonth)) }, [id])
  useEffect(() => { dispatch(fetchLearnerCategoryPerformanceAction(id, 2, startOfCurrentMonth, endOfCurrentMonth)) }, [id])
  return (
    <div className={cardsContainer}>
      <InfoCard width='60%' download title={Text.work} noKnowMore>
        <div className={cardContent}>
          <div className={leftSide}>
            <TypographyElement
              variant='heading2'
              color={neutral[4]}
              fontWeight='bolder'
              fontSize='16px'
              lineHeight='20px'
              spacing='0 8px 8px 0'
            >
              {Text.compare}
            </TypographyElement>
            <div className={selectSearchableItem}>
              <SelectList
                handleChange={(e) => { }}
                valueField='Name'
                placeholder={Text.select}
                items={filterItems}
                selectedItem={filter.Name}
                onSelectedItem={(item) => {
                  setFilter(item)
                }}
              />
            </div>
          </div>
          <div className={radarContainer}>
            <div className={radarSubContainer}>
              <div className={overlay}>
                <img src={iconNetwork} alt='notification' className={firstIcon} />
                <img src={iconInfra} alt='notification' className={secendIcon} />
                <img src={iconOffice} alt='notification' className={thirdIcon} />
                <img src={iconVirtual} alt='notification' className={fourthIcon} />
                <img src={iconDev} alt='notification' className={fifthIcon} />
                <img src={iconSecurity} alt='notification' className={sixthIcon} />
                <img src={iconBd} alt='notification' className={seventhIcon} />
              </div>
              <Radar
                data={radarChartFormat(categoryChart?.Categories?.map(category => category.CoursesCount))}
                options={radarOptions}
              />
            </div>
          </div>
        </div>
      </InfoCard>
      <InfoCard width='40%' title={Text.duration} noKnowMore>
        <div className={textClass}>
          <TypographyElement
            variant='heading2'
            color={blue[0]}
            fontWeight='bolder'
            fontSize='60px'
            lineHeight='26px'
            display='inline'
            spacing='0 8px 0 0'
          >
            {ToHours(barChart.Total)}
          </TypographyElement>
          <TypographyElement
            variant='heading2'
            color={blue[0]}
            fontWeight='bolder'
            fontSize='16px'
            lineHeight='26px'
            display='inline'
            spacing='0 8px 0 0'
          >
            {Text.hours}
          </TypographyElement>
        </div>
        <Bar
          data={barChartFormat(secondsToMinsChartFormat(barChart.ViewsByDate))}
          options={options}
        />
      </InfoCard>
    </div>
  )
}
