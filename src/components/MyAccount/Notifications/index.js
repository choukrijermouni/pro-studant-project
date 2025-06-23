import {
  Paper,
  TypographyElement,
  CheckBox,
  neutral,
  Button,
  Row
} from '@pro_boa/ui'
import style from './style'
import Text from './text.json'
import { createUseStyles } from 'react-jss'

const useStyle = createUseStyles(style)

export default () => {
  const {
    paperContainer,
    icon,
    checkBox,
    paperStyle,
    checkBoxContainer,
    checkBoxContainerBorders
  } = useStyle()
  return (
    <>
      <div className={paperContainer}>
        <Paper className={paperStyle}>
          <div className={icon} />
          <div>
            <TypographyElement
              variant='heading2'
              fontSize='16px'
              lineHeight='16px'
              color={neutral[6]}
            >
              {Text.desktop}
            </TypographyElement>
            <TypographyElement
              variant='heading2'
              fontSize='13px'
              lineHeight='26px'
              color={neutral[5]}
              fontWeight={200}
            >
              {Text.subDesktop}
            </TypographyElement>
          </div>
        </Paper>
        <Paper className={paperStyle}>
          <div className={icon} />
          <div>
            <TypographyElement
              variant='heading2'
              fontSize='16px'
              lineHeight='16px'
              color={neutral[6]}
            >
              {Text.mobile}
            </TypographyElement>
            <TypographyElement
              variant='heading2'
              fontSize='13px'
              lineHeight='26px'
              color={neutral[5]}
              fontWeight={200}
            >
              {Text.subMobile}
            </TypographyElement>
          </div>
        </Paper>
        <Paper className={paperStyle}>
          <div className={icon} />
          <div>
            <TypographyElement
              variant='heading2'
              fontSize='16px'
              lineHeight='16px'
              color={neutral[6]}
            >
              {Text.mail}
            </TypographyElement>
            <TypographyElement
              variant='heading2'
              fontSize='13px'
              lineHeight='26px'
              color={neutral[5]}
              fontWeight={200}
            >
              {Text.subMail}
            </TypographyElement>
          </div>
        </Paper>
      </div>
      <div className={checkBoxContainer}>
        <TypographyElement
          variant='heading2'
          fontSize='16px'
          lineHeight='16px'
          color={neutral[6]}
        >
          {Text.newAdmin}
        </TypographyElement>
        <div>
          <CheckBox className={checkBox} label={Text.desktop} id='desktop1' />
          <CheckBox className={checkBox} label={Text.mobile} id='mobile1' />
          <CheckBox className={checkBox} label={Text.mail} id='mail1' />
        </div>
      </div>
      <div className={checkBoxContainerBorders}>
        <TypographyElement
          variant='heading2'
          fontSize='16px'
          lineHeight='16px'
          color={neutral[6]}
        >
          {Text.newManager}
        </TypographyElement>
        <div>
          <CheckBox className={checkBox} label={Text.desktop} id='desktop2' />
          <CheckBox className={checkBox} label={Text.mobile} id='mobile2' />
          <CheckBox className={checkBox} label={Text.mail} id='mail2' />
        </div>
      </div>
      <div className={checkBoxContainer}>
        <TypographyElement
          variant='heading2'
          fontSize='16px'
          lineHeight='16px'
          color={neutral[6]}
        >
          {Text.newApp}
        </TypographyElement>
        <div>
          <CheckBox className={checkBox} label={Text.desktop} id='desktop3' />
          <CheckBox className={checkBox} label={Text.mobile} id='mobile3' />
          <CheckBox className={checkBox} label={Text.mail} id='mail3' />
        </div>
      </div>
      <Row>
        <Button label={Text.save} width='200px' />
      </Row>
    </>
  )
}
