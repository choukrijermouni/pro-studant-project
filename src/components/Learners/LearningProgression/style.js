import {
  neutral
} from '@pro_boa/ui'

export default {
  topSection: {
    display: 'flex',
    width: 400
  },
  inputGroup: {
    width: '100%',
    position: 'relative',
    marginLeft: 29
  },
  input: {
    width: '100%',
    height: 43,
    borderRadius: 4,
    border: 'solid 1px',
    borderColor: neutral[3],
    padding: '0 0 0 24px',
    outline: 'none',
    color: neutral[6],
    transition: 'all .2s linear',
    background: neutral[0],
    font: {
      family: 13,
      size: 16
    },
    '&:focus': {
      background: neutral[0]
    }
  },
  controlIcon: {
    fontSize: 16
  },
  card: {
    marginBottom: 16
  },
  bottomSection: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
}
