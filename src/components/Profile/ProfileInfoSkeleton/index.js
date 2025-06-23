import { createUseStyles } from 'react-jss'
import {
  Avatar,
  Skeleton
} from '@pro_boa/ui'
import style from './style'

const useStyles = createUseStyles(style)
export default ({ manager }) => {
  const {
    header,
    infos,
    skeletonContainer,
    titleStyle
  } = useStyles()
  return (
    <>
      <div className={infos}>
        <Avatar
          size='size_4'
          loading
        />
        <div>
          <div className={titleStyle}>
            <Skeleton lines={1} height={40} margin='20px 10px 30px 20px' width='100%' />
            <Skeleton lines={1} height={40} margin='20px 0 30px' width={50} />
          </div>
          <div className={header}>
            {
              !manager &&
              (
                <>
                  <div className={skeletonContainer}><Skeleton lines={1} height={40} margin='0px 0px 0px 20px' width={170} /></div>
                  <div className={skeletonContainer}><Skeleton lines={1} height={40} margin='0px 0px 0px 20px' width={170} /></div>
                </>)
            }
            <div className={skeletonContainer}><Skeleton lines={1} height={40} margin='0px 0px 0px 20px' width={170} /></div>
          </div>
        </div>
      </div>
    </>
  )
}
