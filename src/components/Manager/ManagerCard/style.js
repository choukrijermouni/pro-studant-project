import { blue } from '@pro_boa/ui'
export default {
  row: {
    marginBottom: 16,
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
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '11vw'
  },
  icon: {
    fontSize: 16,
    color: blue[1]
  },
  teamTag: {
    width: 43,
    height: 43,
    backgroundColor: blue[0],
    borderRadius: '50%',
    marginLeft: 16
  },
  managerCard: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 24
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  avatarContainer: {
    transition: 'transform 0.2s ease'
  },
  noTeamMessageClass: {
    display: 'flex',
    alignItems: 'center'
  },
  nameContainer: {
    width: '15vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 25
  },
  iconSkeleton: {
    display: 'flex',
    width: 30
  },
  spaceSekelton: {
    padding: '20px 2px',
    height: 68
  },
  avatarspaceSkeleton: {
    padding: '20px 2px',
    height: 68
  },
  deleteStyle: {
    position: 'absolute',
    right: '2rem',
    top: '2rem'
  },
  inviteStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}
