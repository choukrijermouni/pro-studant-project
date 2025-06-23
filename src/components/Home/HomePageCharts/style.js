import { blue, neutral } from '@pro_boa/ui'
const icon = {
  height: 30,
  width: 30
}
export default {
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  selectClass: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16
  },
  textClass: {
    paddingTop: 24,
    marginBottom: 24
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
    left: '45%',
    top: -15,
    height: icon.height,
    width: icon.width
  },
  secendIcon: {
    position: 'absolute',
    left: 5,
    top: 30,
    height: icon.height,
    width: icon.width
  },
  thirdIcon: {
    position: 'absolute',
    left: -25,
    top: 135,
    height: icon.height,
    width: icon.width
  },
  fourthIcon: {
    position: 'absolute',
    left: '10%',
    top: 260,
    height: icon.height,
    width: icon.width
  },
  fifthIcon: {
    position: 'absolute',
    right: '10%',
    top: 260,
    height: icon.height,
    width: icon.width
  },
  sixthIcon: {
    position: 'absolute',
    right: -22,
    top: 135,
    height: icon.height,
    width: icon.width
  },
  seventhIcon: {
    position: 'absolute',
    right: 5,
    top: 30,
    height: icon.height,
    width: icon.width
  },
  eighthIcon: {
    position: 'absolute',
    right: '45%',
    top: 295,
    height: icon.height,
    width: icon.width
  },
  barChartStyle: {
    width: '80%',
    height: 'auto'
  },
  calendarIconClass: {
    fontSize: 18,
    color: blue[0],
    lineHeight: 0,
    marginLeft: 8
  },
  paperDate: {
    backgroundColor: neutral[0],
    padding: '12px 12px',
    alignItems: 'center',
    cursor: 'pointer'
  },
  selectListContainer: {
    width: 200,
    marginRight: 16
  }
}
