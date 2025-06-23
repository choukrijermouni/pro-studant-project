import {
  blue
} from '@pro_boa/ui'

export default {
  radioContainer: {
    display: 'flex',
    width: 216,
    justifyContent: 'space-between',
    margin: '12px 0 12px 0'
  },
  textClass: {
    marginBottom: 24
  },
  paginationFooter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  scrollable: {
    borderTop: '1px solid #F0F5F9',
    height: 288,
    padding: 16,
    overflow: 'hidden auto',
    '&::-webkit-scrollbar': {
      width: 5
    },
    '&::-webkit-scrollbar-thumb': {
      background: blue[1],
      borderRadius: 50
    }
  }
}
