import {
  neutral,
  green,
  red
} from '@pro_boa/ui'

export default {
  dot: {
    height: ({ size }) => size !== 'size_4' ? '13%' : '21%',
    width: ({ size }) => size === 'size_2' ? '23%' : '19%',
    backgroundColor: ({ IsActive }) => IsActive ? green[2] : red[2],
    borderRadius: '50%',
    border: `2px solid ${neutral[0]}`,
    position: 'relative',
    left: '65%',
    zIndex: 1,
    top: ({ size }) => size !== 'size_4' ? '15%' : '21%',
    marginTop: '-26px'
  }
}
