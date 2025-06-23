import {
  neutral
} from '@pro_boa/ui'

export default {
  managersContainer: {
    width: '100%',
    marginBottom: 20,
    maxHeight: '73px',
    border: `1px solid ${neutral[3]}`,
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 4
  },
  teamTag: {
    width: 40,
    height: 40,
    borderRadius: '50%'
  },
  managersCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 8
  },
  managersNames: {
    display: 'flex',
    flexDirection: 'row'
  }
}
