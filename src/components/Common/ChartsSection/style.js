import { neutral, blue } from '@pro_boa/ui'
export default {
  cardsContainer: {
    display: 'flex',
    marginTop: 24,
    columnGap: 20
  },
  textClass: {
    paddingTop: 24
  },
  containerActions: {
    display: 'flex',
    margin: '18px 0',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  paperDate: {
    backgroundColor: neutral[0],
    minWidth: 200,
    padding: '8px 12px',
    alignItems: 'center',
    border: '1px solid #F0F5F9',
    cursor: 'pointer',
    '& > p': {
      minWidth: 200
    }
  },
  barChartStyle: {
    width: '100%',
    height: 218,
    marginTop: 16
  },
  ChartSkeletonStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  calendarIconClass: {
    fontSize: 18,
    color: blue[0],
    lineHeight: 0,
    marginLeft: 8
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
  icon: {
    fontSize: 16,
    color: blue[1],
    transition: 'transform 0.2s ease'
  },
  arrow: {
    fontSize: 16,
    color: blue[1],
    fontWeight: 200,
    marginLeft: 25
  },
  firstPart: {
    minWidth: 200,
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
  button: {
    minWidth: 200,
    height: '45px !important'
  },
  iconButton: {
    fontSize: 14,
    backgroundColor: neutral[2],
    color: blue[0],
    marginRight: 8,
    transition: 'transform 0.2s ease'
  },
  downloadButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    height: 45,
    width: 184,
    borderRadius: 4,
    backgroundColor: `${blue[0]}2D`,
    border: 'none',
    outline: 'none',
    '&:hover > $iconButton': {
      transform: 'translateY(-3px)'
    },
    '&:hover': {
      backgroundColor: `${blue[1]}2D`
    }
  }
}
