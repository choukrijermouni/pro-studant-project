import Text from './text.json'
import { Button } from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import { useSelector } from 'react-redux'
import { useDrawer } from '../Drawer/drawerContext'

const useStyle = createUseStyles(style)

export default ({ hide, report, manager, variant }) => {
  const { button } = useStyle({ hide, report, manager })
  const { openDrawer, closeDrawer } = useDrawer()
  const { isManager } = useSelector(({ organizationProfile }) => organizationProfile)
  const emptyPagesVariants = {
    learner: {
      action: () => openDrawer(
        {
          componentName: 'createLearner',
          props: {
            handleClose: closeDrawer
          }
        }
      ),
      label: Text.createLearner
    },
    team: {
      action: () => openDrawer(
        {
          componentName: 'createTeam',
          props: {
            handleClose: closeDrawer
          }
        }
      ),
      label: Text.createTeam
    },
    manager: {
      action: (e) => openDrawer(
        {
          componentName: 'inviteManager',
          props: {
            handleClose: closeDrawer
          }
        }
      ),
      label: Text.inviteManager
    }
  }
  return (
    <>
      {(variant && !isManager)
        ? (
          <Button
            handleClick={() => emptyPagesVariants[variant].action(true)}
            size='big'
            variation='primary'
            className={button}
            label={emptyPagesVariants[variant].label}
            width={200}
          />)
        : null}
    </>
  )
}
