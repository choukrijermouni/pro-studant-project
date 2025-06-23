import {
  Modal,
  Button,
  ButtonVariation,
  ButtonSize,
  TypographyElement,
  neutral
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import { detachTeam } from 'assets'
import Text from './text.json'
import style from './style'
import { salesB2B } from 'constants/'

const useStyles = createUseStyles(style)
export default ({ openModal, handleClose, handleSubmit, isManager }) => {
  const { modal, header, controlStyle, licenseButtons, line, image } = useStyles()
  return (
    <Modal
      handleClose={handleClose}
      isOpen={openModal}
    >
      <div>
        <div className={modal}>
          <div className={header}>
            <img className={image} src={detachTeam} alt='invitation' />
            <TypographyElement component='h2' variant='heading2' fontSize='29px' align='left' spacing='20px 0 8px 0' color={neutral[6]}>
              {isManager ? Text.deleteInvitationModal.titleManager : Text.deleteInvitationModal.title}
            </TypographyElement>
            <div className={controlStyle}>
              <TypographyElement component='h2' variant='heading2' align='left' fontSize='16px' spacing='16px 0 0 0' color={neutral[6]}>
                {isManager ? Text.deleteInvitationModal.subtitleManager : Text.deleteInvitationModal.subtitle}
              </TypographyElement>
              <TypographyElement component='h4' variant='caption2' align='left' lineHeight='25px' color={neutral[4]}>
                {`${Text.deleteInvitationModal.contact} ${salesB2B.SalesEmail} ${Text.deleteInvitationModal.orByPhone} ${salesB2B.SalesPhone}`}
              </TypographyElement>
            </div>
          </div>
          <div className={controlStyle}>
            <hr className={line} />
            <div className={licenseButtons}>
              <Button
                variation={ButtonVariation.secondary}
                size={ButtonSize.big}
                width={153} height={54}
                label={Text.deleteInvitationModal.abortButton}
                handleClick={handleClose}
              />
              <Button
                variation={ButtonVariation.primary}
                size={ButtonSize.big}
                width={153}
                height={54}
                label={Text.deleteInvitationModal.confirmButton}
                handleClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
