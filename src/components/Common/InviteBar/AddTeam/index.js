import {
  TypographyElement,
  red
} from '@pro_boa/ui'
import { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { useSelector, useDispatch } from 'react-redux'
import { removeManagerAction } from 'pages/ManagerDetails/store'
import DeleteManagerModal from './DeleteManagerModal'
import { fetchListTeamsAction } from 'pages/Teams/store'
import AddManagerForm from './AddManagerForm'
import RemoveManagerForm from './RemoveManagerForm'

const useStyle = createUseStyles(style)

const filterTeamsByManager = (allTeams = [], managerTeams = []) => {
  return allTeams && managerTeams ? allTeams?.filter((el) => !managerTeams?.find(e => (e?.Id === el?.Id))) : allTeams
}

export default () => {
  const { root, area } = useStyle()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchListTeamsAction())
  }, [])
  const [isOpen, setIsOpen] = useState(false)
  const managerTeams = useSelector(({ manager }) => manager?.Teams !== null ? manager.Teams : [])
  const teams = useSelector(({ teams }) => teams?.list)
  const managerId = useSelector(({ manager }) => manager?.Id)
  const managerHasTeams = managerTeams?.length > 0
  const teamsNotManaged = filterTeamsByManager(teams, managerTeams)
  return (
    <div className={root}>
      {teamsNotManaged?.length > 0
        ? (
          <AddManagerForm />
          )
        : null}
      {managerTeams?.length > 0
        ? (
          <RemoveManagerForm />
          )
        : null}
      <div className={area}>
        <TypographyElement
          component='h4'
          variant='smallText'
          align='left'
          spacing='20px 0 30px 0'
          color={red[3]}
          cursor='pointer'
          handleClick={() => setIsOpen(true)}
          dataTest='text-link-remove-manager'
        >
          {Text.removeManager}
        </TypographyElement>
      </div>
      <DeleteManagerModal
        openModal={isOpen}
        handleClose={() => setIsOpen(false)}
        handleSubmit={() => {
          dispatch(removeManagerAction(managerId, managerHasTeams))
          setIsOpen(false)
        }}
      />
    </div>
  )
}
