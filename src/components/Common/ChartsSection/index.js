import { createUseStyles } from 'react-jss'
import style from './style'
import InfoCard from 'components/Common/Cards/InfoCard'
import { Bar, Radar } from 'react-chartjs-2'
import { options, radarOptions, radarPlugin } from 'helpers/home'
import Text from './text.json'
import {
  TypographyElement,
  blue,
  Icon,
  Icons,
  neutral,
  Button
} from '@pro_boa/ui'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AdminRole, MDYDateFormat } from 'constants/'
import moment from 'moment'
import { dateToStringFormat, radarChartFormat, secondsToMinsChartFormat, ToHours } from 'helpers'
import DateRange from 'components/Common/DateRange'
import { fetchBarChartDataAction } from './store'
import { fetchOrganizationCategoryPerformanceAction, setDateFilterAction } from 'pages/Home/store'
import { downloadUserReportAction } from 'pages/LearnerProfile/store'
import { barChartFormat, generateDateTypeAndLabels } from 'helpers/chartsHelpers'
import { useDrawer } from '../Drawer/drawerContext'
import { setLearnersReportDatesAction } from 'pages/Learners/store'

const useStyle = createUseStyles(style)

export default ({ id, field, infoLink, showLearnersActions, showLearnerActions, fullName }) => {
  const {
    cardsContainer,
    textClass,
    containerActions,
    paperDate,
    calendarIconClass,
    barChartStyle,
    ChartSkeletonStyle,
    firstPart,
    secondPart,
    cardStyle,
    button,
    icon,
    iconButton,
    downloadButton,
    arrow
  } = useStyle()
  const { openDrawer, closeDrawer } = useDrawer()
  const dispatch = useDispatch()
  const now = moment()._d
  const yearAgo = moment(now).subtract(1, 'Y')._d
  const [from, setFromDate] = useState(yearAgo)
  const [to, setToDate] = useState(now)
  const handleSelect = values => {
    setFromDate(moment(values.selection.startDate)._d)
    setToDate(moment(values.selection.endDate)._d)
  }
  useEffect(() => {
    dispatch(fetchBarChartDataAction(id, field, moment(from).format(MDYDateFormat), moment(to).format(MDYDateFormat), generateDateTypeAndLabels(moment(from), moment(to)).dateType))
    dispatch(fetchOrganizationCategoryPerformanceAction(id, field, moment(from).format(MDYDateFormat), moment(to).format(MDYDateFormat), generateDateTypeAndLabels(moment(from), moment(to)).dateType))
    dispatch(setDateFilterAction(moment(from).format(MDYDateFormat), moment(to).format(MDYDateFormat)))
  }, [id, from, to])
  const barChartData = useSelector(({ chartsData }) => chartsData.barChartData)
  const categoryChart = useSelector(({ organization }) => organization.categoryChart)
  const categories = useSelector(({ referential }) => referential.categories)
  const { user } = useSelector(({ identity }) => identity)
  const [open, setOpen] = useState(false)
  const isAdmin = user?.role?.includes(AdminRole)

  const handleSelectLearnerDates = values => {
    dispatch(setLearnersReportDatesAction(moment(values.selection.startDate)._d, moment(values.selection.endDate)._d))
  }
  const [openLearnerDates, setOpenLearnerDates] = useState(false)
  const { from: learnersFrom, to: learnersTo } = useSelector(state => state.learners)

  useEffect(() => {
    dispatch(setLearnersReportDatesAction(moment()._d, moment()._d))
  }, [])
  return (
    <>
      <div className={containerActions}>
        <div className={firstPart}>
          <div className={paperDate}>
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
          <DateRange
            open={open}
            setOpen={setOpen}
            handleChange={handleSelect}
            rangeColors={blue[0]}
            selectionRange={{ startDate: from, endDate: to, key: 'selection' }}
          />
          <DateRange
            open={openLearnerDates}
            setOpen={setOpenLearnerDates}
            handleChange={handleSelectLearnerDates}
            rangeColors={blue[0]}
            selectionRange={{ startDate: learnersFrom, endDate: learnersTo, key: 'selection' }}
          />
        </div>
        {
          showLearnerActions
            ? (
              <div
                className={downloadButton}
                onClick={() => dispatch(downloadUserReportAction(id, fullName))}
              >
                <Icon iconName={Icons.download} style={iconButton} />
                <TypographyElement
                  component='h4'
                  variant='caption1'
                  align='left'
                  color={neutral[6]}
                  fontWeight={500}
                >
                  {Text.downloadReport}
                </TypographyElement>
              </div>)
            : null
        }
        {showLearnersActions
          ? (
            <div className={secondPart}>
              <div
                className={cardStyle}
                onClick={() => openDrawer({
                  componentName: 'downloadLearnersReport',
                  props: {
                    handleClose: closeDrawer,
                    setOpen: setOpenLearnerDates,
                    from: learnersFrom,
                    to: learnersTo
                  }
                })}
              >
                <Icon iconName={Icons.download} style={icon} />
                <TypographyElement
                  component='p'
                  fontSize='13px'
                  lineHeight='16px'
                  spacing='0 0 0 8px'
                  color={neutral[6]}
                >
                  {Text.downloadSuivi}
                </TypographyElement>
                <Icon iconName={Icons.roundedDown} style={arrow} />
              </div>
              {isAdmin
                ? (
                  <Button
                    handleClick={() => openDrawer(
                      {
                        componentName: 'createLearner',
                        props: {
                          handleClose: closeDrawer
                        }
                      }
                    )}
                    size='big'
                    variation='primary'
                    className={button}
                    label={Text.createLearner}
                    width={200}
                  />)
                : null}
            </div>)
          : null}
      </div>
      <div className={cardsContainer}>
        <InfoCard infoLink={infoLink} width='50%' noKnowMore title={Text.duration}>
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
              {ToHours(barChartData.Total)}
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
          <div className={barChartStyle}>
            <Bar
              data={barChartFormat(secondsToMinsChartFormat(barChartData.ViewsByDate), generateDateTypeAndLabels(moment(from), moment(to)))}
              options={options}
            />
          </div>
        </InfoCard>
        <InfoCard infoLink={infoLink} width='50%' noKnowMore title={Text.work}>
          <div className={ChartSkeletonStyle}>
            <Radar
              data={radarChartFormat(categoryChart)}
              options={radarOptions}
              plugins={[radarPlugin(categories)]}
              height={350}
            />
          </div>
        </InfoCard>
      </div>
    </>
  )
}
