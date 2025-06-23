import { StatusColors } from 'constants/'

export default {
  bannerGroup: {
    width: props => props.width ? props.width : props.mode === 'vertical' ? 253 : 351,
    height: props => props.height ? props.height : props.mode === 'vertical' ? 177 : 81,
    minHeight: '30px',
    display: 'flex',
    flexDirection: props => props.mode === 'vertical' ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: props => props.mode === 'vertical' ? 'center' : 'flex-start',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: props => StatusColors[props.status],
    '& > div': {
      boxShadow: 'none',
      padding: '5px'
    }
  },
  iconStyle: {
    lineHeight: 0,
    color: props => StatusColors[props.status],
    fontSize: 40,
    margin: props => props.mode === 'horizontal' ? '5px 5px 5px 24px' : '5px'
  }
}
