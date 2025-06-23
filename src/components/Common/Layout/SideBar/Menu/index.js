import { MenuItem, Icon, Icons } from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from '../text.json'
import { push } from 'connected-react-router'
import { HomePath, ManagersPath, LearnersPath, TeamsPath, RapportsPath, ManagerProfilePath } from 'Routes'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { AdminRole } from 'constants/'
import Tooltip from 'components/Common/Tooltip'

const useStyle = createUseStyles(style)

export default ({ open }) => {
  const { icon, menuText } = useStyle({ open })
  const location = useLocation()
  const dispatch = useDispatch()
  const { user } = useSelector(({ identity }) => identity)
  return (
    <div>
      {user?.role?.includes(AdminRole)
        ? (
          <Tooltip show={open} content={Text.menu.home}>
            <MenuItem
              id='home'
              name='MenuItems'
              value='home'
              checked={location.pathname === HomePath}
              handleChange={() => {
                dispatch(push(HomePath))
              }}
            >
              <Icon iconName={Icons.home} style={icon} />
              <span className={menuText}>{Text.menu.home}</span>
            </MenuItem>
          </Tooltip>
          )
        : null}
      <Tooltip show={open} content={Text.menu.learners}>
        <MenuItem
          id='learners'
          name='MenuItems'
          value='learners'
          checked={user?.role?.includes(AdminRole) ? location.pathname === LearnersPath : location.pathname === HomePath}
          handleChange={() => {
            dispatch(push(user?.role?.includes(AdminRole) ? LearnersPath : HomePath))
          }}
        >
          <Icon iconName={Icons.users} style={icon} />
          <span className={menuText}>{Text.menu.learners}</span>
        </MenuItem>
      </Tooltip>
      <Tooltip show={open} content={Text.menu.teams}>
        <MenuItem
          id='teams'
          name='MenuItems'
          value='teams'
          checked={location.pathname === TeamsPath}
          handleChange={() => {
            dispatch(push(TeamsPath))
          }}
        >
          <Icon iconName={Icons.teams} style={icon} />
          <span className={menuText}>{Text.menu.teams}</span>
        </MenuItem>
      </Tooltip>
      {user?.role?.includes(AdminRole)
        ? (
          <Tooltip show={open} content={Text.menu.teamsManager}>
            <MenuItem
              id='teamsManager'
              name='MenuItems'
              value='teamsManager'
              checked={location.pathname === ManagersPath || location.pathname === ManagerProfilePath}
              handleChange={() => {
                dispatch(push(ManagersPath))
              }}
            >
              <Icon iconName={Icons.admin} style={icon} />
              <span className={menuText}>{Text.menu.teamsManager}</span>
            </MenuItem>
          </Tooltip>)
        : null}
      {user?.role?.includes(AdminRole)
        ? (
          <Tooltip show={open} content={Text.menu.report}>
            <MenuItem
              id='rapports'
              name='MenuItems'
              value='rapports'
              checked={location.pathname === RapportsPath}
              handleChange={() => dispatch(push(RapportsPath))}
            >
              <Icon iconName={Icons.report} style={icon} />
              <span className={menuText}>{Text.menu.report}</span>
            </MenuItem>
          </Tooltip>)
        : null}
    </div>
  )
}
