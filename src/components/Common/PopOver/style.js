import {
  neutral
} from '@pro_boa/ui'

export default {
  wrapper: {
    position: 'relative'
  },
  container: (topPosition) => ({
    borderRadius: 4,
    border: `1px solid ${neutral[3]}`,
    backgroundColor: '#fff',
    position: 'absolute',
    transform: 'translate(-50%, 0)',
    right: '-126px',
    top: topPosition || '65px',
    zIndex: '100',
    minWidth: '15rem',
    width: 'max-content'
  })
}
