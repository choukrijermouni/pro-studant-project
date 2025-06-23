import {
  neutral,
  blue
} from '@pro_boa/ui'
export default {
  notificationPaper: {
    width: 449,
    height: 'auto',
    maxHeight: 603,
    backgroundColor: neutral[0],
    position: 'relative',
    top: 24,
    right: 250,
    display: 'flex',
    flexDirection: 'column'
  },
  notificationCardsContainer: {
    width: ' 100%',
    height: 'calc(100% - 124px)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    marginBottom: 47,
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: 5
    },
    '&::-webkit-scrollbar-thumb': {
      background: blue[1],
      borderRadius: 50
    }
  },
  notificationContainer: {
    width: 20,
    height: 20
  },
  notificationHeader: {
    height: 78,
    display: 'flex',
    marginTop: '-22px',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '12px 12px 12px 24px'
  },
  notificationFooter: {
    height: 47,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    backgroundColor: neutral[0],
    bottom: 0,
    padding: 12,
    borderTop: `.3px ${neutral[2]} solid`
  },
  triangle: {
    position: 'relative',
    top: '-17px',
    left: 213
  },
  cursor: {
    cursor: 'pointer'
  }
}
