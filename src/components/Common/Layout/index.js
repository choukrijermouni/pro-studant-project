import TopBar from 'components/Common/Layout/TopBar'
import Sidebar from 'components/Common/Layout/SideBar'
import { createUseStyles } from 'react-jss'
import { useEffect } from 'react'
import { logo } from 'assets'
import {
  Icon,
  Icons
} from '@pro_boa/ui'
import style from './style'
import { useLocation, useParams } from 'react-router'
import {
  HomePath,
  AdminPath,
  AdminProfileNeutralPath
} from 'Routes'
import Menu from 'components/Common/Layout/SideBar/Menu'
import AdminMenu from 'components/Common/Layout/SideBar/AdminMenu'
import Banner from 'components/Common/Banner'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { changeMenuStateAction, fetchOrganizationProfileAction } from 'pages/MyAccount/store'

const useStyle = createUseStyles(style)

const Menus = ({ route, open }) => {
  switch (route) {
    case AdminPath:
      return <AdminMenu open={open} />
    case AdminProfileNeutralPath:
      return <AdminMenu open={open} />
    default:
      return <Menu open={open} />
  }
}

export default ({ children, noInviteBar }) => {
  const scale = window.devicePixelRatio
  const dispatch = useDispatch()
  const location = useLocation()
  const { id } = useParams()
  const open = useSelector(state => state.organizationProfile.isOpenMenu)
  const handleOpen = (value) => {
    dispatch(changeMenuStateAction(value))
  }
  const path = id !== undefined ? location.pathname.substring(location.pathname.lastIndexOf('/'), -1) : location.pathname
  const {
    root,
    main,
    size,
    content,
    container,
    iconHolder,
    iconHeader,
    logoBackground,
    iconHeaderClose
  } = useStyle({ open, scale })
  useEffect(() => {
    dispatch(fetchOrganizationProfileAction())
  }, [])

  return (
    <div className={root}>
      <div className={container}>
        <img
          src={logo}
          alt='logo'
          className={size}
          onClick={() => dispatch(push(HomePath))}
        />
        <div
          onClick={() => handleOpen(!open)}
          className={iconHolder}
        >
          <Icon
            iconName={Icons.navigationMenu}
            style={iconHeader}
          />
          <Icon
            iconName={Icons.sideBarIcon}
            style={iconHeaderClose}
          />
        </div>
      </div>
      <div className={logoBackground} />
      <Sidebar open={open}>
        <Menus
          route={path}
          open={open}
        />
      </Sidebar>
      <TopBar open={open} />
      <main className={main}>
        <div className={content}>
          <div>
            <Banner />
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
