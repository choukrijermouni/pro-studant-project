import { createUseStyles } from 'react-jss'
import style from './style'

const useStyle = createUseStyles(style)

export default ({ children }) => {
  const scale = window.devicePixelRatio
  const { side, content, rowStyle } = useStyle({ scale })
  return (
    <div className={rowStyle} justify='right'>
      <div className={side}>
        <div className={content}>
          {children}
        </div>
      </div>
    </div>
  )
}
