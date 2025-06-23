import { SearchInput } from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'

const useStyle = createUseStyles(style)
export default ({ label, marginLeft, height, width, marginRight, handleChange, noWidthPreset }) => {
  const { root } = useStyle({ marginLeft, marginRight, noWidthPreset })
  return (
    <div className={root}>
      <SearchInput
        height={height || 54}
        width={width}
        handleChange={handleChange}
        handleMouseOver={() => { }}
        handleMouseLeave={() => { }}
        placeHolder={label || Text.search}
      />
    </div>
  )
}
