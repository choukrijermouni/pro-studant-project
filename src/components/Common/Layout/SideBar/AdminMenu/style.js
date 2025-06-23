import {
  blue
} from '@pro_boa/ui'

export default {
  icon: {
    fontSize: 16,
    color: blue[0],
    marginRight: 15
  },
  menuText: {
    transition: 'opacity 0.3s',
    opacity: ({ open }) => open ? 1 : 0,
    display: ({ open }) => open ? 'inline' : 'none',
    whiteSpace: 'nowrap'
  }
}
