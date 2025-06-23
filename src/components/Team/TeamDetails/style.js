import { blue, neutral } from '@pro_boa/ui'

const icon = {
  height: 30,
  width: 30
}
export default {
  cardsContainer: {
    display: 'flex',
    marginTop: 24,
    columnGap: 15
  },
  chartSection: {
    marginTop: 74
  },
  textClass: {
    paddingTop: 24
  },
  radarContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  radarSubContainer: {
    width: 300
  },
  overlay: {
    width: 300,
    height: 300,
    position: 'absolute'
  },
  firstIcon: {
    position: 'absolute',
    top: 13,
    left: '23%',
    height: icon.height,
    width: icon.width
  },
  secondIcon: {
    position: 'absolute',
    top: 112,
    left: '-5%',
    height: icon.height,
    width: icon.width
  },
  thirdIcon: {
    position: 'absolute',
    top: 232,
    left: 8,
    height: icon.height,
    width: icon.width
  },
  fourthIcon: {
    position: 'absolute',
    top: 291,
    left: '44%',
    height: icon.height,
    width: icon.width
  },
  fifthIcon: {
    position: 'absolute',
    top: 232,
    right: '5%',
    height: icon.height,
    width: icon.width
  },
  sixthIcon: {
    position: 'absolute',
    top: 112,
    right: -10,
    height: icon.height,
    width: icon.width
  },
  seventhIcon: {
    position: 'absolute',
    top: 16,
    right: 63,
    height: icon.height,
    width: icon.width
  },
  icon: {
    cursor: 'pointer',
    fontSize: 20,
    color: blue[0],
    transition: 'transform 0.2s ease'
  },
  iconContainer: {
    marginTop: 42,
    display: 'flex',
    alignItems: 'center'
  },
  selectList: {
    width: '100%'
  },
  licenseButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 24,
    padding: 8,
    width: 140,
    cursor: 'pointer',
    height: 45,
    borderRadius: 4,
    backgroundColor: neutral[1]
  },
  teamTag: {
    width: 43,
    height: 43,
    borderRadius: '50%',
    marginLeft: 16
  },
  Bio: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 24,
    overflow: 'auto',
    paddingBottom: 12,
    '&::-webkit-scrollbar': {
      height: 5
    },
    '&::-webkit-scrollbar-thumb': {
      background: blue[1]
    },
    overflowY: 'hidden'
  },
  checkBox: {
    width: '120px !important'
  },
  cardContent: {
    display: 'flex'
  },
  leftSide: {
    width: 300
  },
  circle: {
    border: '2px solid #3767DA',
    width: 12,
    height: 12,
    backgroundColor: 'rgba(55,103,218,0.2)',
    borderRadius: 15
  },
  circle1: {
    border: '2px solid #F7B500',
    width: 12,
    height: 12,
    backgroundColor: 'rgba(247,181,0,0.25)',
    borderRadius: 15
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 9
  },
  userContainer: {
    cursor: 'pointer'
  },
  searchBar: {
    width: 300
  },
  selectItem: {
    width: '34%',
    minWidth: 165
  },
  filterStyle: {
    width: '20%',
    minWidth: 150
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
  cardStyle: {
    height: 45,
    padding: '0 14px',
    whiteSpace: 'nowrap',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${blue[0]}2D`,
    cursor: 'pointer',
    '&:hover > $icon': {
      transform: 'translateY(-3px)'
    },
    '&:hover': {
      backgroundColor: `${blue[1]}2D`
    }
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '48px 0 24px',
    minWidth: 900
  },
  BioStyle: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center'
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 24
  },
  paperDate: {
    backgroundColor: neutral[0],
    padding: '8px 12px',
    alignItems: 'center',
    cursor: 'pointer'
  },
  containerActions: {
    display: 'flex',
    margin: '18px 0'
  },
  calendarIconClass: {
    fontSize: 18,
    color: blue[0],
    lineHeight: 0,
    marginLeft: 8
  },
  showMoreContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 50
  },
  titleClass: {
    alignItems: 'center'
  },
  BioStyleNoManager: {
    display: 'flex',
    alignItems: 'center'
  },
  nameStyle: {
    whiteSpace: 'nowrap',
    cursor: 'default'
  },
  teamInfosSkeleton: {
    display: 'flex',
    alignItems: 'center',
    width: '450px',
    margin: '0 16px'
  },
  descriptionSkeleton: {
    display: 'flex',
    width: 200
  },
  managerSkeleton: {
    display: 'flex',
    width: 267,
    alignItems: 'flex-end'
  },
  userCardWrapper: {
    marginBottom: 30
  },
  avatarManagerSkeleton: {
    position: 'relative',
    top: 9
  },
  dotsPopoverContainer: {
    backgroundColor: 'rgba(24,59,86,0.04)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 16,
    gap: 3,
    cursor: 'pointer',
    height: 38,
    width: 38,
    borderRadius: 4
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: '50%',
    backgroundColor: blue[0]
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
  disabledLinkTextStyle: {
    '&:hover': {
      cursor: 'default'
    }
  },
  teamNameStyle: {
    minWidth: 120
  },
  managerContainer: {
    marginLeft: 10,
    display: 'flex'
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
  disabledLinkContainer: {
    padding: '5px 10px',
    cursor: 'default',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}
