import {
  TypographyElement,
  CheckBox,
  Avatar,
  neutral
} from '@pro_boa/ui'
import style from './style'
import { createUseStyles } from 'react-jss'
import { avatarName } from 'helpers'

const useStyle = createUseStyles(style)

export default ({ name, image, handleAdd, handleRemove, disabled, selected }) => {
  const handleClick = () => {
    if (!disabled) {
      selected ? handleRemove() : handleAdd()
    }
  }
  const {
    learnerContainer,
    checkBoxStyle,
    avatarStyle
  } = useStyle({ disabled })
  return (
    <div className={learnerContainer} onClick={() => handleClick()}>
      <CheckBox checked={selected} disabled={disabled} indeterminated={disabled} readOnly className={checkBoxStyle} />
      <Avatar
        className={avatarStyle}
        size='size_0'
        name={avatarName(name)}
        img={image}
      />
      <TypographyElement
        fontWeight={600}
        fontSize='16px'
        lineHeight='20px'
        spacing='0px 0px 0px 8px'
        color={neutral[6]}
      >
        {name}
      </TypographyElement>
    </div>
  )
}
