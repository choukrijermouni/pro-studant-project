import {
  neutral,
  blue
} from '@pro_boa/ui'
import { borderColor } from 'constants/'

export default {
  header: {
    display: 'flex',
    backgroundColor: neutral[0]
  },
  infos: {
    display: 'flex'
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: neutral[0],
    marginLeft: 20,
    borderStyle: 'solid',
    borderColor: borderColor,
    borderWidth: 1,
    marginRight: -4,
    cursor: 'pointer',
    paddingLeft: 16
  },
  cardWithoutPointer: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: neutral[0],
    marginLeft: 20,
    marginRight: -4,
    borderStyle: 'solid',
    borderColor: borderColor,
    borderWidth: 1,
    paddingLeft: 16
  },
  cardWithoutPointerSkeleton: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: neutral[0],
    marginLeft: 20,
    marginRight: -4,
    borderStyle: 'solid',
    borderColor: borderColor,
    borderWidth: '1px 0px 1px 1px',
    height: 50,
    width: 200,
    paddingLeft: 16
  },
  teamIcon: {
    width: 30
  },
  icon: {
    display: 'flex',
    fontSize: 15,
    backgroundColor: blue[0],
    padding: 15,
    color: neutral[0],
    borderRadius: '0 4px 4px 0',
    borderStyle: 'solid',
    borderColor: borderColor,
    borderWidth: '1px 1px 1px 0px'
  },
  iconPlus: {
    display: 'flex',
    fontSize: 10,
    padding: 10,
    color: blue[0],
    borderRadius: '0 4px 4px 0',
    borderStyle: 'solid',
    borderColor: borderColor,
    borderWidth: '1px 1px 1px 0px'
  },
  iconLastLogin: {
    fontSize: 15,
    backgroundColor: blue[1],
    padding: '0.2em 0.3em',
    borderRadius: '50%',
    color: neutral[0]
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
    marginTop: 27,
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
  },
  skeletonInfos: {
    display: 'flex',
    padding: '20px 10px 30px 20px'
  },
  infosSkeleton: {
    width: '50%',
    display: 'flex',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  containerSkeleton: {
    width: '50%'
  },
  dotsPopoverContainer: {
    backgroundColor: 'rgba(24,59,86,0.04)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 16,
    margin: '11px 0 30px',
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
    width: '100%',
    display: 'flex',
    cursor: 'default',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}
