import {
  blue
} from '@pro_boa/ui'

export default {
  '@keyframes fadeOut': {
    '0%': {
      opacity: 1
    },
    '100%': {
      opacity: 0
    }
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0
    },
    '100%': {
      opacity: 1
    }
  },
  icon: {
    fontSize: 16,
    color: blue[0],
    marginRight: 15
  },
  menuText: {
    transition: 'opacity 0.3s',
    display: ({ open }) => open ? 'inline' : 'none',
    animation: ({ open }) => open ? '$fadeIn 0.3s forwards ' : '$fadeOut 0.5s forwards',
    whiteSpace: 'nowrap'
  }
}
