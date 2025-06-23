import { blue, neutral, Spacing } from '@pro_boa/ui'

export default {
  icon: {
    color: blue[0],
    fontWeight: 200
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    border: `.5px solid ${neutral[1]}`,
    cursor: 'pointer',
    height: 40,
    width: 40
  },
  titleStyle: {
    display: 'flex',
    marginTop: 40
  },
  help: {
    width: 26,
    height: 26,
    borderRadius: '50%',
    backgroundColor: neutral[1],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    margin: '40px 0',
    cursor: 'pointer'
  },
  iconHelp: {
    margin: '16px 0 0 0'
  },
  IntercomSpanStyle: {
    color: blue[0],
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: 800
  },
  fontStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 25,
    whiteSpace: 'nowrap'
  },
  paginationFooter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
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
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  linkTextStyle: {
    cursor: 'pointer',
    '&:hover': {
      color: blue[0]
    }
  }
}
