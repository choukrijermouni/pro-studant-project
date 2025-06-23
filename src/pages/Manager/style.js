import { neutral, Spacing, blue } from '@pro_boa/ui'

export default {
  root: {
    maxWidth: '100% !important'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '48px 24px 24px 0',
    width: '100%'
  },
  firstPart: {
    width: '48%',
    display: 'flex',
    alignItems: 'center'
  },
  secondPart: {
    width: '48%',
    columnGap: 11,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  searchBar: {
    width: 300
  },
  ctaStyle: {
    width: '25%'
  },
  iconHeader: {
    marginTop: 16,
    marginLeft: 10,
    color: neutral[4],
    cursor: 'pointer'
  },
  showMoreContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 50
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  tableRow: {
    width: '100%',
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(2, 1fr) !important',
    '& td': {
      width: '100%',
      padding: () => Spacing(5, 0, 5, 5)
    }
  },
  popOverContent: {
    padding: '5px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  linkTextStyle: {
    cursor: 'pointer',
    '&:hover': {
      color: blue[0]
    }
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: blue[0]
  },
  dotsPopoverContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: 40,
    gap: 3,
    cursor: 'pointer',
    height: 30
  },
  dotsInvitedPopoverContainer: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    paddingRight: 18,
    gap: 3,
    cursor: 'pointer',
    height: 30
  },
  cellContainer: {
    paddingRight: '40px !important'
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  teamStyle: {
    whiteSpace: 'nowrap'
  },
  linkContainer: {
    padding: '5px 10px',
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'background 0.3s ease',
    '& > p': {
      transition: 'color 0.3s ease'
    },
    '&:hover': {
      backgroundColor: neutral[1]
    },
    '&:hover > p': {
      color: blue[0]
    }
  }
}
