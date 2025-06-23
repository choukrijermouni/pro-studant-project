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
import { removeManagerFromTeamAction } from 'pages/ManagerDetails/store'

const useStyle = createUseStyles(style)

export default () => {
  const { icon, input, slidIn, slidOut, titleClass, header, container } = useStyle()
  const dispatch = useDispatch()
  const [arrowStateDetach, setArrowStateDetach] = useState(true)
  const managerTeams = useSelector(({ manager }) => manager?.Teams !== null ? manager.Teams : [])
  const managerId = useSelector(({ manager }) => manager?.Id)
  const [selectedItemDetach, setSelectedItemDetach] = useState({ Id: null, Name: '' })
  return (
    <>
      <div className={header} onClick={() => setArrowStateDetach(!arrowStateDetach)}>
        <Col pos='left' className='col' grid={9}>
          <TypographyElement
            component='h3'
            variant='heading3'
            align='left'
            display='flex'
            className={titleClass}
          >
            {Text.removeTeam}
          </TypographyElement>
        </Col>
        <Col pos='right' className='col' grid={3}>
          {
            arrowStateDetach
              ? <Icon iconName={Icons.roundedUp} style={icon} dataTest='icon-round-up-remove' />
              : <Icon iconName={Icons.roundedDown} style={icon} dataTest='icon-round-down-remove' />
          }
        </Col>
      </div>
      <div className={arrowStateDetach ? slidIn : slidOut}>
        <Row className={container} justify='center'>
          <span className={input}>
            <SearchableSelectList
              iconDataTest='icon-search-remove-team'
              dataTest='searchable-select-list-remove-team'
              id='teams'
              items={managerTeams}
              placeholder={Text.allTeams}
              name='teams'
              valueField='Name'
              selectedItem={selectedItemDetach.Name}
              gutterBottom={16}
              onSelectedItem={(item) => {
                setSelectedItemDetach({
                  Name: item.Name,
                  Id: item.Id
                })
              }}
              handleChange={(e) => setSelectedItemDetach({
                Name: e.target.value,
                toggleSuggestionList: (e.target.value !== '')
              })}
            />
          </span>
          <Button
            dataTest='remove-team-button'
            marginButton='24px 0 0 0'
            label={Text.remove}
            width='100%'
            handleClick={() => dispatch(removeManagerFromTeamAction(selectedItemDetach?.Id, managerId))}
            disabled={!selectedItemDetach.Name || !selectedItemDetach.Id}
          />
        </Row>
      </div>
    </>
  )
}
