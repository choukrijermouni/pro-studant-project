import {
  TypographyElement,
  blue
} from '@pro_boa/ui'
import style from './style'
import { createUseStyles } from 'react-jss'

const useStyle = createUseStyles(style)

export default ({ handleClick, selected, info, width }) => {
  const {
    licenseSelectItem
  } = useStyle({ selected, width })
  return (
    <div className={licenseSelectItem} onClick={handleClick}>
      <TypographyElement
        fontWeight={600}
        fontSize='16px'
        lineHeight='20px'
        color={blue[0]}
      >
        {info}
      </TypographyElement>
    </div>
  )
}
