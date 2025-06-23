import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import InfoCard from '../InfoCard'
import { useEffect, useState } from 'react'
import { Bar, Radar } from 'react-chartjs-2'
import { options, radarOptions } from 'helpers/home'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchOrganizationBarChartAction,
  fetchOrganizationCategoryPerformanceAction,
  setDateFilterAction
} from 'pages/Home/store'
import {
  TypographyElement,
  neutral,
  blue,
  Icon,
  Icons
} from '@pro_boa/ui'
import {
  iconBd,
  iconOffice,
  iconDev,
  iconInfra,
  iconNetwork,
  iconSecurity,
  iconVirtual,
  iconAnimation
} from 'assets'
import {
  HomeBarChartFormat,
  endDate,
  startDate,
  secondsToMinsChartFormat,
  ToHours,
  radarChartFormat,
  dateType,
  calculateAverage,
  dateToStringFormat
} from 'helpers'
import DateRange from 'components/Common/DateRange'
import moment from 'moment'

const useStyle = createUseStyles(style)
const now = moment()._d
const yearAgo = moment(now).subtract(1, 'Y')._d
const dayRange = 1

export default () => {
  const {
    cardsContainer,
    radarContainer,
    barChartStyle,
    overlay,
    fourthIcon,
    fifthIcon,
    sixthIcon,
    seventhIcon,
    thirdIcon,
    secendIcon,
    radarSubContainer,
    textClass,
    selectClass,
    firstIcon,
    eighthIcon,
    calendarIconClass,
    paperDate
  } = useStyle()
  const dispatch = useDispatch()
  const { barChart, categoryChart, count } = useSelector(state => state.organization)
  useEffect(() => {
    dispatch(fetchOrganizationBarChartAction(dateType, startDate, endDate))
    dispatch(fetchOrganizationCategoryPerformanceAction(dateType, startDate, endDate))
  }, [])
  const [open, setOpen] = useState(false)
  const [from, setFromDate] = useState(yearAgo)
  const [to, setToDate] = useState(now)
  const handleSelect = values => {
    setFromDate(moment(values.selection.startDate)._d)
    setToDate(moment(values.selection.endDate)._d)
  }
  useEffect(() => {
    dispatch(setDateFilterAction(from, to))
  }, [from, to])
  return (
    <>
      <div className={selectClass}>
        <div className={paperDate}>
          <DateRange
            open={open}
            setOpen={setOpen}
            handleChange={handleSelect}
            rangeColors={blue[0]}
            selectionRange={{ startDate: from, endDate: to, key: 'selection' }}
          />
          <TypographyElement
            component='p'
            fontSize='13px'
            lineHeight='16px'
            color={neutral[6]}
            handleClick={() => setOpen(true)}
          >
            {dateToStringFormat(from, to)}
            <Icon iconName={Icons.calendar} style={calendarIconClass} />
          </TypographyElement>
        </div>
      </div>
      <div className={cardsContainer}>
        <InfoCard title={Text.duration}>
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
            <TypographyElement
              variant='heading2'
              color={neutral[5]}
              fontWeight='bolder'
              fontSize='16px'
              lineHeight='26px'
              display='inline'
              spacing='0 8px 0 0'
            >
              {Text.average} {ToHours(calculateAverage(count, barChart.Total))} {Text.hoursPerLearner}
            </TypographyElement>
          </div>
          <div className={barChartStyle}>
            <Bar
              data={HomeBarChartFormat(secondsToMinsChartFormat(barChart.ViewsByDate), dayRange)}
              options={options}
            />
          </div>
        </InfoCard>
        <InfoCard title={Text.work}>
          <div className={radarContainer}>
            <div className={radarSubContainer}>
              <div className={overlay}>
                <img src={iconInfra} alt='notification' className={firstIcon} />
                <img src={iconDev} alt='notification' className={secendIcon} />
                <img src={iconAnimation} alt='notification' className={thirdIcon} />
                <img src={iconVirtual} alt='notification' className={fourthIcon} />
                <img src={iconOffice} alt='notification' className={fifthIcon} />
                <img src={iconNetwork} alt='notification' className={sixthIcon} />
                <img src={iconBd} alt='notification' className={seventhIcon} />
                <img src={iconSecurity} alt='notification' className={eighthIcon} />
              </div>
              <Radar
                data={radarChartFormat(categoryChart?.Categories?.map(category => category.CoursesCount))}
                options={radarOptions}
              />
            </div>
          </div>
        </InfoCard>
      </div>
    </>
  )
}
