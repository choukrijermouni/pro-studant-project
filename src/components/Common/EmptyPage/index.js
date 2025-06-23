import Text from './text.json'
import { TypographyElement, Icon, Icons } from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import { contactB2B } from 'constants/'
import EmptyPageActionButton from './EmptyPageActionButton'

const useStyle = createUseStyles(style)

const Cards = ({ contactCard, contact, icon }) => {
  return (
    <div className={contactCard}>
      <div className={contact}>
        <Icon iconName={Icons.smartPhone} style={icon} />
        <TypographyElement
          variant='caption1'
          fontSize='16px'
          align='left'
          spacing='17px 0 16px 16px'
          fontWeight='bold'
          Component='a'
          cursor='pointer'
          href={`tel:${contactB2B.ContactPhone}`}
        >
          {contactB2B.ContactPhone}
        </TypographyElement>
      </div>
      <div className={contact}>
        <Icon iconName={Icons.envelope} style={icon} />
        <TypographyElement
          variant='caption1'
          fontSize='16px'
          align='left'
          spacing='17px 0 16px 16px'
          fontWeight='bold'
          Component='a'
          cursor='pointer'
          href={`mailto:${contactB2B.ContactEmail}`}
        >
          {contactB2B.ContactEmail}
        </TypographyElement>
      </div>
    </div>
  )
}

export default ({ Title, SubTitle, children, hide, report, manager, variant }) => {
  const { container, messageContainer, contactCard, contact, icon } = useStyle({ hide, report, manager })
  return (
    <>
      <div className={messageContainer}>
        <TypographyElement
          component='h3'
          variant='heading3'
          fontSize='24px'
          lineHeight='38px'
        >
          {report ? Text.ReportTitle : (Title || Text.Title)}
        </TypographyElement>
        <TypographyElement
          component='h4'
          variant='caption1'
          fontSize='16px'
          align='center'
          lineHeight='26px'
        >
          {report ? Text.ReportSubTitle : (SubTitle || Text.SubTitle)}
        </TypographyElement>
        {report
          ? (
            <Cards
              contactCard={contactCard}
              contact={contact}
              icon={icon}
            />)
          : (
            <EmptyPageActionButton
              hide={hide}
              report={report}
              manager={manager}
              variant={variant}
            />)}
      </div>
      <div className={container}>
        <div>{children}</div>
      </div>
    </>
  )
}
