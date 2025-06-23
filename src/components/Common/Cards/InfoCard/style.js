import {
  neutral,
  blue
} from '@pro_boa/ui'

export default {
  paperClass: {
    boxShadow: 'unset !important',
    height: 414,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    overflow: 'hidden auto',
    '&::-webkit-scrollbar': {
      width: 7
    },
    '&::-webkit-scrollbar-thumb': {
      background: blue[1],
      borderRadius: 50
    }
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
    lineHeight: 0,
    textDecoration: 'none'
  },
  containerClass: {
    display: 'flex',
    width: '100%',
    marginBottom: 20
  },
  textClass: {
    display: 'flex',
    flexGrow: 0.9,
    whiteSpace: 'nowrap'
  },
  buttonClass: {
    display: 'flex',
    width: 140,
    whiteSpace: 'nowrap',
    color: neutral[6]
  },
  bigContainerClass: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  paperContainerClass: {
    marginBottom: 35,
    flex: '50%',
    maxWidth: ({ width }) => width || '50%',
    border: '1px solid #F0F5F9',
    borderRadius: 4
  },
  iconButton: {
    fontSize: 14,
    color: blue[0],
    marginRight: 8
  },
  downloadButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  }
}
