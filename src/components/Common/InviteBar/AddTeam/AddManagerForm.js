import {
  Row,
  TypographyElement,
  Button,
  Icon,
  Icons,
  Col,
  SearchableSelectList
} from '@pro_boa/ui'
import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { useSelector, useDispatch } from 'react-redux'
import { addManagerToTeamAction } from 'pages/ManagerDetails/store'
const useStyle = createUseStyles(style)

const filterTeamsByManager = (allTeams = [], managerTeams = []) => {
  return allTeams && managerTeams ? allTeams?.filter((el) => !managerTeams?.find(e => (e?.Id === el?.Id))) : allTeams
}

export default () => {
  const { icon, input, slidIn, slidOut, titleClass, header, container } = useStyle()
  const dispatch = useDispatch()
  const [arrowStateAssign, setArrowStateAssign] = useState(true)
  const managerTeams = useSelector(({ manager }) => manager?.Teams !== null ? manager.Teams : [])
  const teams = useSelector(({ teams }) => teams?.list)
  const managerId = useSelector(({ manager }) => manager?.Id)
  const teamsNotManaged = filterTeamsByManager(teams, managerTeams)
  const [selectedItemAssign, setSelectedItemAssign] = useState({ Id: null, Name: '' })
  return (
    <>
      <div className={header} onClick={() => setArrowStateAssign(!arrowStateAssign)}>
        <Col pos='left' className='col' grid={9}>
          <TypographyElement
            component='h3'
            variant='heading3'
            align='left'
            display='flex'
            className={titleClass}
          >
            {Text.assignTeam}
          </TypographyElement>
        </Col>
        <Col pos='right' className='col' grid={3}>
          {
            arrowStateAssign
              ? <Icon iconName={Icons.roundedUp} style={icon} dataTest='icon-round-up-add' />
              : <Icon iconName={Icons.roundedDown} style={icon} dataTest='icon-round-down-add' />
          }
        </Col>
      </div>
      <div className={arrowStateAssign ? slidIn : slidOut}>
        <Row className={container} justify='center'>
          <span className={input}>
            <SearchableSelectList
              iconDataTest='icon-search-add-team'
              dataTest='searchable-select-list-add-team'
              id='teams'
              items={teamsNotManaged}
              placeholder={Text.allTeams}
              name='teams'
              valueField='Name'
              selectedItem={selectedItemAssign.Name}
              gutterBottom={16}
              onSelectedItem={(item) => {
                setSelectedItemAssign({
                  Name: item.Name,
                  Id: item.Id
                })
              }}
              handleChange={(e) => setSelectedItemAssign({
                Name: e.target.value,
                toggleSuggestionList: (e.target.value !== '')
              })}
            />
          </span>
          <Button
            dataTest='add-team-button'
            marginButton='24px 0 0 0'
            label={Text.add}
            width='100%'
            handleClick={() => dispatch(addManagerToTeamAction(selectedItemAssign?.Id, managerId))}
            disabled={!selectedItemAssign.Name || !selectedItemAssign.Id}
          />
        </Row>
      </div>
    </>
  )
}
