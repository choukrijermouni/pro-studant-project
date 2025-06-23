import {
  blue,
  neutral
} from '@pro_boa/ui'

export default ({
  root: {
    minWidth: 312,
    maxWidth: 320
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  totalLicencesContainer: {
    backgroundColor: 'rgba(2,197,140,0.1)',
    borderRadius: 8,
    width: 39,
    height: 39,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 24
  },
  licensesLeftContainer: {
    backgroundColor: 'rgba(2,197,140,0.09)',
    height: 86,
    borderRadius: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  licenseTypesContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  subTypeContainer: {
    height: 23,
    width: 23,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3767da2e'
  },
  remainingLicensesContainer: {
    marginLeft: 24
  },
  row: {
    width: '100%',
    margin: '12px 0 20px 0'
  },
  messageContainer: {
    display: 'flex',
    textDecoration: 'none',
    padding: 16,
    alignItems: 'center'
  },
  helpIconClass: {
    width: 26
  },
  tipStyle: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 30
  },
  spanStyle: {
    color: blue[0],
    textDecoration: 'none'
  },
  IntercomSpanStyle: {
    color: blue[0],
    textDecoration: 'none',
    cursor: 'pointer'
  },
  searchBar: {
    width: '100%'
  },
  learnersContainer: {
    width: '100%',
    marginTop: 16,
    maxHeight: 366,
    borderRadius: 4,
    padding: 16,
    border: `1px solid ${neutral[3]}`,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 7
    },
    '&::-webkit-scrollbar-thumb': {
      background: blue[1],
      borderRadius: 50
    }
  }
})
