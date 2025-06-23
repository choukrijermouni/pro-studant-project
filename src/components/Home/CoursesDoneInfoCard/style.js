import {
  blue
} from '@pro_boa/ui'

export default {
  LearningCardsContainer: {
    margin: '12px 0 12px 0'
  },
  horizontalCards: {
    marginBottom: 13
  },
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
  paginationFooter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  textClass: {
    marginBottom: 24
  },
  scrollable: {
    borderTop: '1px solid #F0F5F9',
    height: 326,
    marginTop: 46,
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
