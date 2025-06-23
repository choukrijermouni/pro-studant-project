import {
  Button,
  ButtonVariation,
  ButtonSize,
  TypographyElement,
  neutral,
  Col
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import Text from './text.json'
import style from './style'
import TeamLogoAndManagers from 'components/Common/Drawer/Team/common/header'
import { useDispatch } from 'react-redux'
import { deleteTeamAction } from 'pages/Teams/store'
import { scrollUp } from 'helpers'

const useStyles = createUseStyles(style)
export default ({ team, handleClose }) => {
  const dispatch = useDispatch()
  const { header, titleClass, controlStyle, buttons } = useStyles()
  return (
    <>
      <div
        className={header}
        data-test='delete-team-modal'
      >
        <Col pos='left' className='col' grid={9}>
          <TypographyElement
            component='h3'
            variant='heading3'
            align='left'
            display='flex'
            className={titleClass}
          >
            {Text.deleteMessage}
          </TypographyElement>
        </Col>
      </div>
      <TeamLogoAndManagers title={team?.Name ? team?.Name : Text.noName} team={team} isManagers={false} />
      <TypographyElement
        fontSize='16px'
        lineHeight='24px'
        color={neutral[6]}
        spacing='0 0 16px 0'
      >
        {Text.removeTeam.title}
      </TypographyElement>
      <TypographyElement
        fontSize='14px'
        lineHeight='25px'
        fontWeight='bold'
        spacing='0 0 32px 0'
        color={neutral[5]}
      >
        {Text.removeTeam.subtitle}
      </TypographyElement>
      <div className={controlStyle}>
        <div className={buttons}>
          <Button
            dataTest='confirm-delete-team-button'
            variation={ButtonVariation.primary}
            size={ButtonSize.big}
            width='100%'
            height={54}
            label={Text.confirmButton}
            handleClick={() => {
              dispatch(deleteTeamAction(team?.Id))
              scrollUp()
              handleClose()
            }}
          />
          <Button
            variation={ButtonVariation.secondary}
            size={ButtonSize.big}
            width='100%'
            height={54}
            label={Text.abortButton}
            handleClick={handleClose}
          />
        </div>
      </div>
    </>
  )
}
