import {
  neutral
} from '@pro_boa/ui'

export default {
  top: {
    position: 'fixed',
    width: '100%',
    boxShadow: `inset 0 -1px 0 0 ${neutral[2]}`,
    backgroundColor: neutral[0],
    height: 86,
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
    zIndex: '999',
    flexWrap: 'wrap',
    alignContent: 'center',
    alignItems: 'center',
    minWidth: 1150
  },
  title: {
    transition: 'padding-left 0.5s'
  },
  spacing: {
    marginLeft: 343
  }
}
