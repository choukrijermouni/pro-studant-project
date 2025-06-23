import {
  Spacing,
  neutral
} from '@pro_boa/ui'

export default {
  userIcon: {
    display: 'flex',
    margin: () => Spacing(0, 3, 0, 0),
    alignItems: 'center'
  },
  paper: {
    width: ({ width }) => width || 368,
    display: 'flex',
    alignItems: 'center',
    height: 119
  },
  icon: {
    height: '61%',
    background: neutral[0],
    display: 'flex',
    width: 115,
    justifyContent: 'center',
    fontSize: 35,
    padding: 22,
    zIndex: 1,
    borderRadius: '4px 0 0 4px',
    backgroundColor: neutral[0],
    boxShadow: '0 0 36px 0 rgb(194 212 230 / 23%)'
  },
  text: {
    width: '71%',
    height: '100%',
    background: ({ cardColor }) => cardColor,
    display: 'flex',
    alignItems: 'center',
    transition: 'background .5s linear'
  },
  textActive: {
    background: `${neutral[0]} !important`,
    boxShadow: ({ cardColor }) => `inset 0 -2px 0 0 ${cardColor}, 0 0 36px 0 rgba(194,212,230,0.23)`
  }
}
