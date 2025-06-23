import { loader } from 'assets'
import { useSelector } from 'react-redux'
import style from './style'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(style)

export default () => {
  const { container, loaderClass } = useStyles()
  const { loading } = useSelector(state => state.config)
  return (
    loading
      ? (
        <div className={container}>
          <object type='image/svg+xml' data={loader} className={loaderClass}>svg-animation</object>
        </div>
        )
      : null
  )
}
