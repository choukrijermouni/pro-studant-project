import { MenuItem, Icon, Icons } from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from '../text.json'
import { useState } from 'react'
import Tooltip from 'components/Common/Tooltip'

const useStyle = createUseStyles(style)

export default ({ open }) => {
  const { icon, menuText } = useStyle({ open })
  const [selceted, setSelceted] = useState('')
  return (
    <div>
      <Tooltip show={open} content={Text.menu.admin}>
        <MenuItem
          id='Administrateurs'
          name='MenuItems'
          value='Administrateurs'
          checked={selceted === 'Administrateurs'}
          handleChange={() => {
            setSelceted('Administrateurs')
          }}
        >
          <Icon iconName={Icons.home} style={icon} />
          <span className={menuText}>{Text.menu.admin}</span>
        </MenuItem>
      </Tooltip>
    </div>
  )
}
