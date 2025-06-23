import {
  TypographyElement,
  Button,
  ButtonSize,
  ButtonVariation,
  Icon,
  Icons,
  SearchInput,
  TextInput,
  neutral,
  CheckBox
} from '@pro_boa/ui'
import { useState } from 'react'
import { help } from 'assets'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import TransferModal from 'components/Common/InviteBar/TransferLicenseModal'

const useStyle = createUseStyles(style)

export default () => {
  const {
    license,
    checkBox,
    LicenceCheckBoxContainer,
    icon,
    licenseTitle,
    search,
    email,
    helpMessage,
    helpIcon
  } = useStyle()
  const [arrowTransferLicense, setArrowTransferLicense] = useState(false)
  return (
    <div className={license}>
      <div className={licenseTitle}>
        <TypographyElement
          component='h3'
          variant='heading3'
          align='left'
          spacing='20px 0 0px 24px'
        >
          {Text.transferLicenseTitle}
        </TypographyElement>
        {
          arrowTransferLicense
            ? <Icon iconName={Icons.roundedUp} style={icon} handleIconClick={() => setArrowTransferLicense(!arrowTransferLicense)} />
            : <Icon iconName={Icons.roundedDown} style={icon} handleIconClick={() => setArrowTransferLicense(!arrowTransferLicense)} />
        }
      </div>
      {arrowTransferLicense &&
        <div>
          <TypographyElement
            component='h4'
            variant='smallText'
            align='left'
            spacing='20px 0 13px 24px'
          >
            {Text.existUser}
          </TypographyElement>
          <div className={search}>
            <SearchInput
              id='unique_ID_1'
              height={45}
              width={300}
            />
          </div>
          <TypographyElement
            component='h4'
            variant='smallText'
            align='left'
            spacing='20px 0 13px 24px'
          >
            {Text.newUser}
          </TypographyElement>
          <div className={email}>
            <TextInput gutterBottom={25} id='1' type='text' label='' message='' placeholder={Text.newUserLabel} />
            <Button
              backgroundColorHover='none'
              variation={ButtonVariation.primary}
              size={ButtonSize.big}
              label={Text.buttonAffect}
              marginButton='10px 0 20px 0'
              width={330}
              height={47}
            />
            <div className={LicenceCheckBoxContainer}>
              <CheckBox className={checkBox} label={Text.inform} id='checkbox2' />
            </div>
            <TransferModal />
            <div className={helpMessage}>
              <img src={help} alt='help' className={helpIcon} />
              <TypographyElement
                component='h4'
                variant='smallText'
                align='left'
                color={neutral[3]}
              >
                {Text.helpMessage}
              </TypographyElement>
            </div>
          </div>
        </div>}
    </div>
  )
}
