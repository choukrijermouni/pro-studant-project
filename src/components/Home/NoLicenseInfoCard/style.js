import {
  blue
} from '@pro_boa/ui'
export default {
  emptyContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%'
  },
  illustrationClass: {
    marginBottom: 24,
    maxWidth: 124
  },
  textClass: {
    paddingTop: 24,
    marginBottom: 24
  },
  paginationFooter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30
  },
  scrollable: {
    borderTop: '1px solid #F0F5F9',
    height: 414,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
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
