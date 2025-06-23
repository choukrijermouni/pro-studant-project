import {
  TypographyElement,
  Button,
  ButtonVariation,
  ButtonSize,
  blue,
  neutral
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { transferLicence } from 'assets'
import { salesB2B } from 'constants/'

const useStyles = createUseStyles(style)
export default ({ nextStep, closeModal }) => {
  const { modal, header, controlStyle, textStyle, licenseButtons, line } = useStyles()
  return (
    <div>
      <div className={modal}>
        <div className={header}>
          <img src={transferLicence} alt='invitation' />
          <TypographyElement
            component='h2'
            variant='heading2'
            fontSize='29px'
            align='left'
            spacing='20px 0 8px 0'
          >
            {Text.transfer}
          </TypographyElement>
          <div>
            <TypographyElement
              component='h2'
              variant='heading2'
              align='left'
              fontSize='16px'
              spacing='16px 0 0 0'
            >
              {Text.subTitle}
            </TypographyElement>
            {Text.steps.map((step, key) =>
              <div className={textStyle} key={key}>
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
                  component='h2'
                  variant='heading2'
                  fontSize='14px'
                  align='left'
                  display='inline'
                  spacing='10px 0 0 0'
                  lineHeight='25px'
                  color={neutral[4]}
                >
                  {step}
                </TypographyElement>
              </div>
            )}
            <TypographyElement
              component='h2'
              variant='heading2'
              fontSize='14px'
              align='left'
              lineHeight='25px'
              spacing='16px 0 5px 0'
              color={neutral[5]}
            >
              {Text.confirm}
            </TypographyElement>
            <TypographyElement
              component='h2'
              variant='heading2'
              fontSize='14px'
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
            <Button variation={ButtonVariation.secondary} size={ButtonSize.big} width={153} height={54} label={Text.abortButton} handleClick={closeModal} />
            <Button variation={ButtonVariation.primary} size={ButtonSize.big} width={153} height={54} label={Text.confirmButton} handleClick={nextStep} />
          </div>
        </div>
      </div>
    </div>
  )
}
