import {
  Modal,
  Button,
  ButtonVariation,
  ButtonSize,
  TypographyElement,
  neutral,
  blue
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import { detachTeam } from 'assets'
import Text from './text.json'
import style from './style'
import { salesB2B } from 'constants/'

const useStyles = createUseStyles(style)
export default ({ openModal, handleClose, handleSubmit, email }) => {
  const { modal, header, controlStyle, textStyle, licenseButtons, line, image } = useStyles()
  return (
    <>
      <Modal
        handleClose={handleClose}
        isOpen={openModal}
      >
        <div data-test='remove-learner-modal'>
          <div className={modal}>
            <div className={header}>
              <img className={image} src={detachTeam} alt='invitation' />
              <TypographyElement
                component='h2'
                variant='heading2'
                fontSize='29px'
                align='left'
                spacing='20px 0 8px 0'
                color={neutral[6]}
              >
                {Text.detachTitle}
              </TypographyElement>
              <div className={controlStyle}>
                <TypographyElement
                  component='h2'
                  variant='heading2'
                  align='left'
                  fontSize='16px'
                  spacing='16px 0 0 0'
                  color={neutral[6]}
                >
                  {Text.subHeader}
                </TypographyElement>
                <div className={textStyle}>
                  <TypographyElement
                    component='h2'
                    variant='heading2'
                    fontSize='24px'
                    align='left'
                    display='inline'
                    lineHeight='0px'
                    spacing='10px 8px 0 0'
                    color={blue[0]}
                  >
                    {Text.dot}
                  </TypographyElement>
                  <TypographyElement
                    component='h4'
                    variant='caption2'
                    align='left'
                    display='inline'
                    spacing='10px 0 0 0'
                    lineHeight='25px'
                    color={neutral[4]}
                  >
                    {Text.detachText}
                  </TypographyElement>
                </div>
                <TypographyElement
                  component='h2'
                  variant='heading2'
                  fontSize='14px'
                  align='left'
                  lineHeight='25px'
                  spacing='16px 0 5px 0'
                  color={neutral[5]}
                >
                  {Text.confirmationText}
                </TypographyElement>
                <TypographyElement
                  component='h4'
                  variant='caption2'
                  align='left'
                  lineHeight='25px'
                  color={neutral[4]}
                >
                  {`${Text.contactText} ${salesB2B.SalesEmail} ${Text.orViaPhone} ${salesB2B.SalesPhone}`}
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
                  label={Text.abortButton}
                  handleClick={handleClose}
                />
                <Button
                  dataTest='confirm-remove-learner'
                  variation={ButtonVariation.primary}
                  size={ButtonSize.big}
                  width={153}
                  height={54}
                  label={Text.confirmButton}
                  handleClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
