import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import {
  TypographyElement,
  Icon,
  Icons,
  neutral,
  usePagination,
  useSort,
  red,
  Skeleton
} from '@pro_boa/ui'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { goBack, push } from 'connected-react-router'
import { InvitedProfilePath, LearnerProfileNeutralPath } from 'Routes'
import SearchBar from 'components/Common/SearchBar'
import { fetchTeamLearnersAction, setTeamLearnersPagination } from 'pages/TeamDetails/store'
import { amazonBucket, OrganizationTeamImages, totalViewQueryFields, AdminRole, helpLinks, defaultField } from 'constants/'
import { exportLearnersToExcel, exportTeamLearnersInfoToExcel } from 'helpers'
import ChartsSection from 'components/Common/ChartsSection'
import EmptyPage from 'components/Common/EmptyPage'
import { fetchInvitedLearnerInfosAction } from 'pages/Learners/store'
import DataTable from 'components/Common/DataTable'
import { CreationDateRow, EndDateRow, LastConnectionDateRow, NameRow } from 'pages/Learners/Rows'
import { Popover, PopoverContent, PopoverTrigger } from 'components/Common/PopOver'
import { useDrawer } from 'components/Common/Drawer/drawerContext'
import TeamDetailsSkeleton from '../TeamDetailsSkeleton'
import ChartsSectionSkeleton from 'components/Common/skeletons/ChartsSectionSkeleton'
import { sendNotificationAction, switchLastLicensePopupAction } from 'pages/LearnerProfile/store'
import LastLicenseModal from 'components/Common/Drawer/AffectLicense/LastLicenseModal'
import Pagination from 'components/Common/DataTable/Pagination'

const useStyle = createUseStyles(style)

export const Title = ({ text, style }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div className={style} />
      <TypographyElement
        variant='heading2'
        color={neutral[4]}
        fontWeight='bolder'
        fontSize='12px'
        lineHeight='20px'
        display='inline'
        spacing='1px 10px'
      >
        {text}
      </TypographyElement>
    </div>
  )
}

export default ({ loading }) => {
  const {
    icon,
    iconContainer,
    teamTag,
    Bio,
    searchBar,
    headerContainer,
    firstPart,
    secondPart,
    cardStyle,
    BioStyle,
    BioStyleNoManager,
    userCardWrapper,
    nameStyle,
    dotsPopoverContainer,
    dot,
    popOverContent,
    linkTextStyle,
    disabledLinkTextStyle,
    teamNameStyle,
    managerContainer,
    linkContainer,
    disabledLinkContainer,
    chartSection
  } = useStyle()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { page, rowsPerPage, skip, setPage, setRowsPerPage } = usePagination()
  const { field, setField, asc, setAsc } = useSort(defaultField)
  const [search, setSearch] = useState('')
  const team = useSelector(state => state.teamDetails)
  useEffect(() => { setAsc(false) }, [])
  const { learners: teamLearners, LearnersCount: learnersCount, Description: description, managersList: allManagers, Managers: teamManagers } = useSelector(state => state.teamDetails)
  const { TeamLearningRecap = [] } = useSelector(state => state.teamDetails)
  const { teamLearnersRecap = [] } = useSelector(state => state.teamDetails)
  const { organizationLicenseTypes = {} } = useSelector(state => state.referential)
  const filteredTeamManagers = teamManagers?.filter(element => !element.InvitationId)
  const [isOpen, setIsOpen] = useState(false)
  const { emailTypes } = useSelector(({ referential }) => referential)
  const { user } = useSelector(({ identity }) => identity)
  useEffect(() => {
    dispatch(setTeamLearnersPagination(skip, rowsPerPage))
  }, [skip, rowsPerPage])
  useEffect(() => {
    dispatch(fetchTeamLearnersAction(id, rowsPerPage, skip, asc, field, search))
  }, [id, rowsPerPage, skip, asc, field, search, page])
  const { lastLicensePopupClosed } = useSelector(({ profile }) => profile)
  useEffect(() => {
    setIsOpen(!lastLicensePopupClosed)
  }, [lastLicensePopupClosed])
  const isAdmin = user?.role?.includes(AdminRole)
  const config = {
    handleRowClick: (data) => {
      if (data.InvitationId) {
        dispatch(fetchInvitedLearnerInfosAction(data))
        dispatch(push(InvitedProfilePath))
      } else dispatch(push(`${LearnerProfileNeutralPath}/${data.Id}`))
    },
    columns: [
      {
        property: 'FirstName',
        title: Text.name,
        sortable: true,
        render: (item, props, value) => {
          return (
            <NameRow value={value} />
          )
        }
      },
      {
        property: 'CreationDate',
        title: Text.creationDate,
        sortable: true,
        render: (item) => {
          return (
            <CreationDateRow item={item} />
          )
        }
      },
      {
        property: 'LastConnectionDate',
        title: Text.lastConnectionDate,
        sortable: true,
        render: (item) => {
          return (
            <LastConnectionDateRow item={item} />
          )
        }
      },
      {
        property: 'EndDate',
        title: Text.endDate,
        sortable: true,
        render: (item, props, value) => {
          return (
            <EndDateRow setPage={setPage} item={item} value={value} organizationLicenseTypes={organizationLicenseTypes} />
          )
        }
      }
    ]
  }
  const { openDrawer, closeDrawer } = useDrawer()
  const popOverContentMap = [
    {
      text: Text.editTeam,
      onHandleClick: () => openDrawer(
        {
          componentName: 'editTeam',
          props: {
            id,
            teamName: team?.Name,
            teamIcon: team?.Image,
            description: team?.Description,
            closeModal: closeDrawer
          }
        }
      )
    },
    {
      text: Text.assignManager,
      onHandleClick: () =>
        allManagers?.length && (filteredTeamManagers?.length !== allManagers?.length)
          ? openDrawer(
              {
                componentName: 'assignManager',
                props: {
                  id,
                  handleClose: closeDrawer
                }
              }
            )
          : null,
      className: allManagers?.length && (filteredTeamManagers?.length !== allManagers?.length) ? linkTextStyle : disabledLinkTextStyle,
      containerClassName: allManagers?.length && (filteredTeamManagers?.length !== allManagers?.length) ? linkContainer : disabledLinkContainer,
      color: allManagers?.length && (filteredTeamManagers?.length !== allManagers?.length) ? neutral[6] : neutral[2]
    },
    {
      text: Text.removeManager,
      onHandleClick: () =>
        filteredTeamManagers?.length
          ? openDrawer({
              componentName: 'removeManager',
              props: {
                id,
                handleClose: closeDrawer
              }
            })
          : null,
      className: filteredTeamManagers?.length ? linkTextStyle : disabledLinkTextStyle,
      containerClassName: filteredTeamManagers?.length ? linkContainer : disabledLinkContainer,
      color: filteredTeamManagers?.length ? neutral[6] : neutral[2]
    },
    {
      text: Text.deleteTeam,
      onHandleClick: () => openDrawer({
        componentName: 'removeTeam',
        props: {
          team,
          handleClose: closeDrawer
        }
      }),
      color: red[3]
    }
  ]
  return (
    <>
      {loading
        ? <TeamDetailsSkeleton />
        : (
          <>
            <LastLicenseModal
              openModal={isOpen}
              handleClose={() => {
                dispatch(sendNotificationAction(emailTypes.OrganizationLicensesDepleted))
                dispatch(switchLastLicensePopupAction(true))
                setIsOpen(false)
              }}
              handleSubmit={() => {
                dispatch(sendNotificationAction(emailTypes.OrganizationLicensesRequested))
                dispatch(switchLastLicensePopupAction(true))
                setIsOpen(false)
              }}
            />
            <div className={iconContainer}>
              <div onClick={() => dispatch(goBack())}><Icon iconName={Icons.roundedLeft} style={icon} /></div>
              <img src={team.Image ? `${team?.Image}` : `${amazonBucket.bucketBaseUrl}${OrganizationTeamImages.TeamIconPath}${OrganizationTeamImages?.Development}`} className={teamTag} />
              <TypographyElement
                dataTest='team-name'
                component='h2'
                variant='heading2'
                align='left'
                spacing='0 20px'
                color={neutral[6]}
                className={teamNameStyle}
              >
                {team?.Name ? team?.Name : Text.noName}
              </TypographyElement>
              {
                isAdmin
                  ? (
                    <>
                      <Popover>
                        <PopoverTrigger>
                          <div className={dotsPopoverContainer}>
                            <span className={dot} />
                            <span className={dot} />
                            <span className={dot} />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent topPosition={40}>
                          <div className={popOverContent}>
                            {popOverContentMap.map((item, index) => (
                              <div
                                key={index}
                                className={item.containerClassName || linkContainer}
                                onClick={() => {
                                  item.onHandleClick()
                                }}
                              >
                                <TypographyElement
                                  key={index}
                                  color={item.color || neutral[6]}
                                  fontWeight='normal'
                                  fontSize='13px'
                                  lineHeight='16px'
                                  className={item.className || linkTextStyle}
                                >
                                  {item.text}
                                </TypographyElement>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </>)
                  : null
              }
            </div>
            {
              description &&
              (
                <TypographyElement
                  component='p'
                  variant='body2'
                  align='left'
                  spacing='16px 0 0 35px'
                  className={nameStyle}
                  color={neutral[4]}
                >
                  {`${Text.description} ${description}`}
                </TypographyElement>)
            }
            {
              teamManagers?.length
                ? (
                  <div
                    className={Bio}
                  >
                    <TypographyElement
                      component='p'
                      variant='body2'
                      align='left'
                      spacing='0 0 0 35px'
                      className={nameStyle}
                      color={neutral[4]}
                    >
                      {Text.rule}
                    </TypographyElement>
                    <div className={managerContainer}>
                      {
                        teamManagers?.map((manager, index) => (
                          !manager.InvitationId &&
                          (
                            <div
                              data-test='manager-avatar'
                              key={manager.Id}
                              className={isAdmin ? BioStyle : BioStyleNoManager}
                            >
                              <TypographyElement
                                component='p'
                                variant='body1'
                                className={nameStyle}
                                align='left'
                                spacing='0'
                              >
                                {index ? ', ' : ''}{manager?.FirstName} {manager?.LastName}
                              </TypographyElement>
                            </div>)
                        ))
                      }
                    </div>
                  </div>)
                : (
                  <div
                    className={BioStyleNoManager}
                  >
                    <TypographyElement
                      component='p'
                      variant='body2'
                      align='left'
                      spacing='12px 0 0 35px'
                      className={nameStyle}
                      color={neutral[4]}
                    >
                      {Text.rule}
                      <TypographyElement
                        display='inline'
                        component='span'
                        variant='body1'
                        align='left'
                        spacing='0 0 0 10px'
                        color={red[2]}
                      >
                        {Text.none}
                      </TypographyElement>
                    </TypographyElement>
                  </div>)
            }
          </>)}
      {learnersCount
        ? (
          <>
            {loading
              ? (
                <div className={chartSection}>
                  <ChartsSectionSkeleton />
                </div>)
              : <ChartsSection id={id} field={totalViewQueryFields.team} infoLink={helpLinks.teamProfile} />}
            {loading
              ? (
                <div className={headerContainer}>
                  <div className={firstPart}>
                    <div className={searchBar}>
                      <Skeleton lines={1} height={45} width={300} />
                    </div>
                  </div>
                  <div className={secondPart}>
                    <Skeleton lines={1} height={45} width={300} />
                    <Skeleton lines={1} height={45} width={300} />
                  </div>
                </div>
                )
              : (
                <div className={headerContainer}>
                  <div className={firstPart}>
                    <div className={searchBar}>
                      <SearchBar
                        height={45}
                        width={300}
                        handleChange={(value) => {
                          setSearch(value)
                          setPage(0)
                        }}
                        value={search}
                      />
                    </div>
                  </div>
                  <div className={secondPart}>
                    <div
                      onClick={() => exportLearnersToExcel(TeamLearningRecap, team?.Name ? team?.Name : Text.noName)}
                      className={cardStyle}
                      data-test='export-recap-to-excel-button'
                    >
                      <Icon iconName={Icons.download} style={icon} />
                      <TypographyElement
                        component='p'
                        fontSize='13px'
                        lineHeight='16px'
                        spacing='0 0 0 16px'
                        color={neutral[6]}
                      >
                        {Text.download}
                      </TypographyElement>
                    </div>
                    <div
                      onClick={() => exportTeamLearnersInfoToExcel(teamLearnersRecap, team?.Name ? team?.Name : Text.noName, organizationLicenseTypes)}
                      className={cardStyle}
                      data-test='export-learners-to-excel-button'
                    >
                      <Icon iconName={Icons.download} style={icon} />
                      <TypographyElement
                        component='p'
                        fontSize='13px'
                        lineHeight='16px'
                        spacing='0 0 0 16px'
                        color={neutral[6]}
                      >
                        {Text.downloadLeanersRecap}
                      </TypographyElement>
                    </div>
                  </div>
                </div>)}
            <div className={userCardWrapper}>
              <DataTable
                loading={loading}
                data={teamLearners}
                config={config}
                selectedField={field}
                sort={asc}
                handleSort={(e) => {
                  setField(e)
                  setAsc(!asc)
                }}
              />
            </div>
            <Pagination
              data={teamLearners}
              setRowsPerPage={setRowsPerPage}
              count={learnersCount}
              page={page}
              skip={skip}
              rowsPerPage={rowsPerPage}
              setPage={setPage}
            />
          </>)
        : (
          <EmptyPage
            Title={isAdmin ? Text.Title : Text.managerTitle}
            SubTitle={isAdmin ? Text.SubTitle : Text.managerSubTitle}
            manager
          />)}
    </>
  )
}
