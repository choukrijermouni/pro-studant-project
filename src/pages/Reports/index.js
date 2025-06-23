import Layout from 'components/Common/Layout'
import ReportAffectationHistoryContainer from 'components/Reports/ReportAffectationHistoryContainer'
import { useDispatch, useSelector } from 'react-redux'
import EmptyPage from 'components/Common/EmptyPage'
import Text from 'components/Reports/ReportChartContainer/text.json'
import { createUseStyles } from 'react-jss'
import style from './style'
import {
  TypographyElement,
  Icon,
  Icons,
  neutral,
  Button,
  Skeleton
} from '@pro_boa/ui'
import { DMYDateFormat, helpLinks, MDYDateFormat } from 'constants/'
import { help } from 'assets'
import { useEffect, useState } from 'react'
import { TurnOnLoaderAction } from 'store/config'
import { downloadHistoryReportAction, fetchLicenseInfoAction, fetchOrganizationTotalLearnersAction } from 'pages/Home/store'
import moment from 'moment'
import ReportChartContainer from 'components/Reports/ReportChartContainer'
import { useDrawer } from 'components/Common/Drawer/drawerContext'

const useStyle = createUseStyles(style)
const now = moment()._d
const yearAgo = moment(now).subtract(1, 'Y')._d

export default () => {
  const dispatch = useDispatch()
  const { openDrawer, closeDrawer } = useDrawer()
  const {
    titleClass,
    linkHelp,
    iconHelp,
    headerContainer,
    cardStyle,
    icon,
    paperDate,
    calendarIconClass,
    ctaContainer,
    actionContainer,
    ctaStyle
  } = useStyle()
  const [open, setOpen] = useState(false)
  const [from, setFromDate] = useState(yearAgo)
  const [to, setToDate] = useState(now)
  const loading = useSelector(({ config }) => config.loading)
  const { licenseInfo, lastAffectedLearners } = useSelector(state => state.organization)
  useEffect(() => {
    dispatch(TurnOnLoaderAction())
    dispatch(fetchLicenseInfoAction())
    dispatch(fetchOrganizationTotalLearnersAction())
  }, [])
  return (
    <Layout noInviteBar>
      <TypographyElement
        component='h2'
        variant='heading2'
        align='left'
        spacing='42px 0 30px 0'
        display='flex'
        className={titleClass}
      >
        {Text.reports}
        <a rel='noopener noreferrer' target='_blank' href={helpLinks.report} className={linkHelp}><img src={help} alt='help' className={iconHelp} /></a>
      </TypographyElement>

      {loading
        ? (
          <div className={actionContainer}>
            <Skeleton lines={1} height={30} width={200} />
            <div className={ctaStyle}>
              <Skeleton lines={1} height={45} width={200} />
              <Skeleton lines={1} height={45} width={200} />
            </div>
          </div>)
        : (
          <div className={headerContainer}>
            <div onClick={() => setOpen(true)}>
              <div className={paperDate}>
                <TypographyElement
                  component='p'
                  fontSize='13px'
                  lineHeight='16px'
                  color={neutral[6]}
                >
                  {`${moment(from).format(DMYDateFormat)} - ${moment(to).format(DMYDateFormat)}`}
                  <Icon iconName={Icons.calendar} style={calendarIconClass} />
                </TypographyElement>
              </div>
            </div>
            <div className={ctaContainer}>
              {
                lastAffectedLearners.Total
                  ? (
                    <div
                      className={cardStyle}
                      onClick={() => dispatch(downloadHistoryReportAction(moment(from).format(MDYDateFormat), moment(to).format(MDYDateFormat)))}
                    >
                      <Icon iconName={Icons.download} style={icon} />
                      <TypographyElement
                        component='p'
                        fontSize='13px'
                        lineHeight='16px'
                        spacing='0 0 0 8px'
                        color={neutral[6]}
                      >
                        {Text.download}
                      </TypographyElement>
                    </div>)
                  : null
              }
              <Button
                handleClick={() => openDrawer(
                  {
                    componentName: 'orderLicensesNew',
                    props: {
                      handleClose: closeDrawer
                    }
                  }
                )}
                size='big'
                variation='primary'
                marginButton='0 0 0 10px'
                label={Text.orderLicenses}
                width={240}
              />
            </div>
          </div>)}
      {
        licenseInfo?.OrganizationLicenseDetails?.length
          ? (
            <>
              <ReportChartContainer />
              <ReportAffectationHistoryContainer open={open} setOpen={setOpen} from={from} to={to} setFromDate={setFromDate} setToDate={setToDate} />
            </>)
          : <EmptyPage report />
      }

    </Layout>
  )
}
