import {
  neutral
} from '@pro_boa/ui'

export default {
  paperContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 26,
    marginBottom: 16
  },
  paperStyle: {
    width: '100%',
    height: 91,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  icon: {
    width: 52,
    height: 43,
    backgroundColor: 'grey',
    marginRight: 16
  },
  checkBoxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 57,
    alignItems: 'center',
    marginBottom: 16
  },
  checkBoxContainerBorders: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 57,
    alignItems: 'center',
    borderTop: `1px ${neutral[3]} solid`,
    borderBottom: `1px ${neutral[3]} solid`,
    marginBottom: 16
  }
}
