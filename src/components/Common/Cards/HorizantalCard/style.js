import {
  blue,
  neutral,
  Spacing
} from '@pro_boa/ui'

export default {
  cardGroup: {
    width: '100%',
    display: 'flex',
    borderRadius: 4,
    height: 95,
    backgroundColor: neutral[0],
    boxShadow: '0 0 10px 0 rgba(194,212,230,0.16)',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in',
    overflow: 'hidden',
    '&:hover': {
      boxShadow: '0 0 10px 3px rgba(0,0,0,0.2)'
    }
  },
  CardImage: ({ image }) => ({
    height: 'auto',
    minHeight: 72,
    minWidth: 171,
    margin: Spacing(0, 4, 0, 0),
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url('${image}')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }),
  skeletonImageContainer: {
    height: 'auto',
    minHeight: 72,
    minWidth: 171,
    margin: Spacing(0, 4, 0, 0),
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressionRing: {
    height: '100%',
    width: 160,
    marginRight: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  CardInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: () => Spacing(3, 3, 3, 0),
    width: '100%'
  },
  CardTitle: {
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden'
  },
  infos: {
    margin: () => Spacing(3, 0, 0, 0),
    display: 'flex'
  },
  users: {
    display: 'flex',
    margin: () => Spacing(0, 4, 0, 0),
    alignItems: 'center'
  },
  homeUsers: {
    display: 'flex',
    margin: () => Spacing(0, 3, 0, 0),
    alignItems: 'center',
    minWidth: '40%'
  },
  userIcon: {
    margin: () => Spacing(0, 2, 0, 0),
    fontSize: 16,
    color: blue[0]
  },
  time: {
    display: 'flex',
    margin: () => Spacing(0, 3, 0, 0),
    alignItems: 'center',
    minWidth: '20%'
  },
  homeTime: {
    display: 'flex',
    margin: () => Spacing(0, 3, 0, 0),
    alignItems: 'center',
    minWidth: '80px'
  },
  clockIcon: {
    margin: () => Spacing(0, 2, 0, 0),
    fontSize: 16,
    color: blue[0]
  },
  rate: {
    display: 'flex',
    alignItems: 'center'
  },
  infosAndActions: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%'
  },
  title: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  titleAndCartLabel: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: () => Spacing(0, 0, 3, 0)
  }
}
