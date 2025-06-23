import { blue } from '@pro_boa/ui'
export default {
  row: {
    margin: 16,
    display: 'flex',
    justifyContent: 'flex-start',
    minHeight: 50,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 12
  },
  checkBox: {
    width: '0px !important'
  },
  cardContainer: {
    cursor: 'pointer'
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '11vw'
  },
  ManagersCard: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 24,
    width: ({ scale }) => scale > 1 ? '21vw' : '25vw'
  },
  icon: {
    fontSize: 16,
    color: blue[1]
  },
  teamTag: {
    width: 43,
    height: 43,
    borderRadius: '50%',
    marginLeft: 16
  },
  fontStyle: {
    width: 210
  },
  teamNameClass: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  nameContainer: {
    width: '15vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  iconSkeleton: {
    display: 'flex',
    width: 30
  },
  avatarspaceSkeleton: {
    padding: '20px 2px',
    height: 68
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  }
}
