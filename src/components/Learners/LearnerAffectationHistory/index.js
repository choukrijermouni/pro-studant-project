import { createUseStyles } from 'react-jss'
import style from './style'
import { DataTable, Avatar, neutral, TypographyElement, Container, Icon, Icons } from '@pro_boa/ui'
import Text from './text.json'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { amazonBucket, Avatars, DMYDateFormat, helpLinks } from 'constants/'
import moment from 'moment'
import { exportAttributionHistory, shrinkName } from 'helpers'
import { fetchLearnerAttributionHistoryAction } from 'pages/LearnerProfile/store'

const RenderReceiptCell = (value) =>
  <TypographyElement
    variant='body2'
    fontWeight={600}
    color={neutral[10]}
    spacing='8px 0px 8px 4px'
  >
    {moment(value).format(DMYDateFormat)}
  </TypographyElement>

const RenderLicenseTypeCell = ({ licenseType, value }) => {
  return (
    <TypographyElement
      variant='body2'
      fontWeight={600}
      color={neutral[10]}
      spacing='8px 0px 8px 4px'
    >
      {Text.licenseTypes[licenseType[value]]}
    </TypographyElement>
  )
}

const RenderManagerNameCell = (value) =>
  <TypographyElement
    variant='body2'
    fontWeight={600}
    color={neutral[10]}
    spacing='8px 0px 8px 4px'
  >
    {value || Text.notAvailable}
  </TypographyElement>

const RenderQuantityCell = (value) =>
  <TypographyElement
    variant='body2'
    fontWeight={600}
    color={neutral[10]}
    spacing='8px 0px 8px 4px'
  >
    {value || Text.notAvailable}
  </TypographyElement>

const config = (data) => {
  return {
    columns: [
      { property: 'OperationDate', title: Text.affectDate, render: RenderReceiptCell },
      { property: 'OrganizationLicenseType', title: Text.licenseType, render: (value) => <RenderLicenseTypeCell licenseType={data} value={value} /> },
      { property: 'QuantityAssigned', title: Text.quantity, render: RenderQuantityCell },
      { property: 'AdminName', title: Text.affectedBy, render: RenderManagerNameCell }
    ]
  }
}

export default () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const useStyle = createUseStyles(style)
  const {
    containerClass,
    textClass,
    userContainer,
    buttonClass,
    help,
    icon,
    root
  } = useStyle()
  useEffect(() => { dispatch(fetchLearnerAttributionHistoryAction(id)) }, [id])
  const { FirstName, LastName, licenseAttributionHistory, Photo } = useSelector(state => state.profile)
  const { organizationLicenseTypes } = useSelector(state => state.referential)
  const nameInitials = shrinkName(`${FirstName} ${LastName}`)
  const downloadAttributionHistoryAction = () => {
    const formattedData = licenseAttributionHistory.map(operation => ({
      FullName: `${FirstName} ${LastName}`,
      Email: operation.Email,
      OperationDate: moment(operation.OperationDate).format(DMYDateFormat),
      QuantityAssigned: operation.QuantityAssigned,
      OrganizationLicenseType: Text.licenseTypes[organizationLicenseTypes[operation.OrganizationLicenseType]],
      AdminName: operation.AdminName || Text.notAvailable
    }))
    exportAttributionHistory(formattedData)
  }
  return (
    <Container className={root}>
      <div className={userContainer}>
        <Avatar
          img={Photo ? `${amazonBucket.bucketBaseUrl}${Photo}` : `${amazonBucket.avatar}${Avatars.anonymous}`}
          name={nameInitials}
          size='size_3'
        />
        <TypographyElement
          variant='heading2'
          color={neutral[6]}
          fontWeight='bolder'
          fontSize='29px'
          lineHeight='36px'
          spacing='0 0 0 16px'
        >
          {`${FirstName} ${LastName}`}
        </TypographyElement>
      </div>
      <div className={containerClass}>
        <div className={textClass}>
          <TypographyElement
            variant='heading2'
            color={neutral[6]}
            fontWeight='bolder'
            fontSize='22px'
            lineHeight='26px'
          >
            {Text.title}
          </TypographyElement>
          <div className={help}>
            <TypographyElement
              Component='a'
              rel
              target='_blank'
              href={helpLinks.affectationHistory}
              fontSize='14px'
              lineHeight='22px'
              color={neutral[3]}
              spacing='5px 10px'
            >
              {Text.q}
            </TypographyElement>
          </div>
        </div>
        <div
          className={buttonClass}
          onClick={downloadAttributionHistoryAction}
          data-test='download-history-button'
        >
          <Icon iconName={Icons.download} style={icon} />
          <TypographyElement
            color={neutral[4]}
            fontWeight='bolder'
            fontSize='14px'
            lineHeight='18px'
            spacing='0 0 0 8px'
          >
            {Text.export}
          </TypographyElement>
        </div>
      </div>
      <div data-test='affectation-history-data-table'>
        <DataTable
          data={licenseAttributionHistory}
          config={config(organizationLicenseTypes)}
        />
      </div>
    </Container>
  )
}
