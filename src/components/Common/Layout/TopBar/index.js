import Profile from 'components/Profile'
import { createUseStyles } from 'react-jss'
import style from './style'
import { TypographyElement, neutral } from '@pro_boa/ui'
import { drawerWidth, drawerWidthClosed } from 'constants/'
import { useSelector } from 'react-redux'
import Text from './text.json'
const useStyle = createUseStyles(style)

export default ({ open }) => {
  const { top, spacing, title } = useStyle({ open })
  const { Name } = useSelector(({ organization }) => organization)
  const { FirstName, LastName } = useSelector(state => state.organizationProfile)
  return (
    <div className={top}>
      <TypographyElement
        component='heading4'
        lineHeight='16px'
        color={neutral[6]}
        className={title}
        spacing={`0 0 0 ${open ? drawerWidth + 38 : drawerWidthClosed + 38}px`}
      >
        {Text.welcome} {FirstName} {LastName} - {Name}
      </TypographyElement>
      <div className={spacing} />
      <Profile />
    </div>
  )
}
