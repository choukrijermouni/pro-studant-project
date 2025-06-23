import { createUseStyles } from 'react-jss'
import style from './style'
import TeamCard from 'components/Team/TeamCard'
import SearchBar from 'components/Common/SearchBar'
import ProfileInfo from 'components/Profile/ProfileInfo'
import { useEffect, useState } from 'react'
import { fetchManagerDetailsAction, fetchTeamsAction } from 'pages/ManagerDetails/store'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { TeamDetailsNeutralPath } from 'Routes'
import EmptyPage from 'components/Common/EmptyPage'
import Text from './text.json'
import { TurnOnLoaderAction } from 'store/config'
import { takeAll, defaultSkip } from 'constants/'
import { AvatarSize } from '@pro_boa/ui'
import ProfileInfoSkeleton from 'components/Profile/ProfileInfoSkeleton'

const useStyle = createUseStyles(style)
const defaultTeamsLength = 7

const search = (searchTerm, data) => {
  if (searchTerm !== '') {
    const filteredTeams = data.filter(team => {
      const name = team.Name || ''
      return name.toLowerCase().search(searchTerm.toLowerCase()) > -1
    })
    return filteredTeams
  } else {
    return data
  }
}
const filterTeamsByManager = (allTeams = [], managerTeams = []) => {
  return allTeams && managerTeams ? allTeams?.filter((el) => managerTeams?.find(e => (e?.Id === el?.Id))) : allTeams
}

export default () => {
  const {
    profile,
    searchBar,
    headerContainer
  } = useStyle()
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.config)
  const { organizationId } = useSelector(state => state.organization)
  const teams = useSelector(({ manager }) => manager?.AllTeams)
  const managerTeams = useSelector(({ manager }) => manager?.Teams !== null ? manager.Teams : [])
  const { id } = useParams()
  useEffect(() => {
    dispatch(TurnOnLoaderAction())
    dispatch(fetchTeamsAction(organizationId, takeAll, defaultSkip, ''))
  }, [])
  useEffect(() => { dispatch(fetchManagerDetailsAction(id)) }, [id])
  const [searchTerm, setSearchTerm] = useState('')
  const filtredTeams = filterTeamsByManager(teams, managerTeams)
  const searchedTeams = search(searchTerm, filtredTeams)
  const skeletonTeams = [...Array(filtredTeams.length || defaultTeamsLength)]
  const {
    FirstName,
    LastName,
    Photo,
    HasActiveLicense,
    LastConnectionDate,
    Email
  } = useSelector(state => state.manager)
  return (
    loading
      ? (
        <>
          <div className={profile}>
            <ProfileInfoSkeleton />
          </div>
          <div className={headerContainer}>
            <div className={searchBar}>
              <SearchBar height={45} width={250} marginLeft={8} />
            </div>
          </div>
          {
            skeletonTeams?.map((team, index) => {
              return (
                <div key={index}>
                  <TeamCard loading />
                </div>
              )
            })
          }
        </>
        )
      : (
        <>
          <div className={profile}>
            <ProfileInfo
              size={AvatarSize.size_4}
              Name={`${FirstName} ${LastName}`}
              LastConnectionDate={LastConnectionDate}
              Email={Email}
              IsActive={HasActiveLicense}
              Photo={Photo}
              manager
            />
          </div>
          <EmptyPage
            Title={Text.Title}
            SubTitle={Text.SubTitle}
            hide={filtredTeams?.length}
          >
            <div className={headerContainer}>
              <div className={searchBar}>
                <SearchBar height={45} width={250} marginLeft={8} handleChange={setSearchTerm} />
              </div>
            </div>
            {
              searchedTeams?.map(team => {
                return (
                  <div
                    key={team.Id}
                    onClick={() => dispatch(push(`${TeamDetailsNeutralPath}/${team.Id}`))}
                  >
                    <TeamCard
                      teamIcon={team.Image}
                      name={team.Name}
                      membersCount={team.LearnersCount}
                      managers={team.Managers}
                    />
                  </div>
                )
              })
            }
          </EmptyPage>
        </>
        )
  )
}
