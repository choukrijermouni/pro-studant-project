import {
  TypographyElement,
  Button,
  SelectList
} from '@pro_boa/ui'
import style from './style'
import { createUseStyles } from 'react-jss'
import Text from './text.json'
import LearnerCard from '../../Cards/LearnerCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { attachUserToTeamAction, deleteUserFromTeamAction, fetchLearnerProfileAction } from 'pages/LearnerProfile/store'
import { scrollUp } from 'helpers'

const useStyle = createUseStyles(style)

const NoTeam = {
  Id: 0,
  Name: Text.noTeam
}

export default ({ setPage, handleClose, id }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchLearnerProfileAction(id))
  }, [id])
  const { Photo, FirstName, LastName, TeamId = '', Id, TeamName = '' } = useSelector(({ profile }) => profile)
  const { list } = useSelector(state => state.teams)
  const [selectData, setSelectData] = useState(TeamId ? { Id: TeamId, Name: TeamName } : NoTeam)
  useEffect(() => {
    if (TeamId) setSelectData({ Id: TeamId, Name: TeamName })
    else setSelectData(NoTeam)
  }, [TeamId])
  const {
    container
  } = useStyle()
  return (
    <div className={container}>
      <TypographyElement
        component='h3'
        variant='heading3'
        align='left'
      >
        {Text.title}
      </TypographyElement>
      <LearnerCard Photo={Photo} FirstName={FirstName} LastName={LastName} TeamName={TeamName} />
      <TypographyElement
        variant='body1'
        fontSize='12px'
        lineHeight='18px'
        margin='0 0 4px'
      >
        {Text.teamName}
      </TypographyElement>
      <SelectList
        dataTest='change-team-select'
        width='100%'
        id='country'
        selectedItem={selectData?.Name}
        items={[...list, NoTeam]}
        valueField='Name'
        placeholder={Text.allTeams}
        name='country'
        onSelectedItem={(item) => setSelectData(item)}
      />
      <Button
        handleClick={() => {
          scrollUp()
          TeamId && selectData?.Id === NoTeam.Id ? dispatch(deleteUserFromTeamAction(Id, TeamId)) : dispatch(attachUserToTeamAction(Id, selectData, TeamId))
          handleClose()
        }}
        width='100%'
        marginButton='32px 0 0 0'
        height={54}
        label={Text.edit}
      />

    </div>
  )
}
