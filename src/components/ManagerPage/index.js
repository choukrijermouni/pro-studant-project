import {
  TypographyElement,
  neutral,
  usePagination,
  useSort,
  Button,
  Container,
  Skeleton
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import ManagerCard from 'components/Manager/ManagerCard'
import SearchBar from 'components/Common/SearchBar'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchManagersAction } from 'pages/Manager/store'
import { defaultSkip } from 'constants/'
import EmptyPage from 'components/Common/EmptyPage'
import { TurnOnLoaderAction } from 'store/config'
import DataTable from 'components/Common/DataTable'
import { CreationDateRow, InvitedManagerRow, LastConnectionDateRow, NameRow, TeamNameRow } from 'pages/Manager/Rows'
import { useDrawer } from 'components/Common/Drawer/drawerContext'

const useStyle = createUseStyles(style)
const defualtManagerLength = 7

export default () => {
  const {
    root,
    headerContainer,
    header,
    showMoreContainer,
    firstPart,
    searchBar,
    secondPart,
    button
  } = useStyle()
  const dispatch = useDispatch()
  const { openDrawer, closeDrawer } = useDrawer()
  const { page, rowsPerPage, skip, setPage } = usePagination()
  const { field, setField, asc, setAsc } = useSort('FirstName')
  const [search, setSearch] = useState('')
  const [rowId, setRowId] = useState(null)
  const { loading } = useSelector(state => state.config)
  const managers = useSelector(({ managers }) => managers.Items)
  const filtredCount = useSelector(({ managers }) => managers.FilteredCount)
  const total = useSelector(({ managers }) => managers.Count)
  const skeletonManagers = [...Array(total || defualtManagerLength)]
  const { Total: teamsCount } = useSelector(state => state.teams)
  useEffect(() => {
    dispatch(TurnOnLoaderAction())
    setPage(1)
  }, [])
  useEffect(() => {
    dispatch(fetchManagersAction(rowsPerPage * page, defaultSkip, asc, field, search))
  }, [rowsPerPage, skip, asc, field, search])
  const config = {
    costumRowRender: (item) => {
      return (
        <InvitedManagerRow item={item} />
      )
    },
    costumRowCondition: (item) => !!item.InvitationId,
    handleRowClick: (item) => setRowId(item.Id),
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
        property: 'Teams',
        title: Text.team,
        render: (item, props, value) => {
          return (
            <TeamNameRow item={item} managerId={rowId} value={value} />
          )
        }
      }
    ]
  }
  return (
    <>
      {loading
        ? (
          <Container nopadding className={root}>
            <div className={header}>
              <TypographyElement
                variant='heading2'
                color={neutral[6]}
                fontWeight='bolder'
                fontSize='29px'
                lineHeight='36px'
                display='inline'
                spacing='42px 0 30px 0'
              >
                {Text.title}
              </TypographyElement>
            </div>
            <div className={headerContainer}>
              <Skeleton lines={1} height={45} width={250} />
            </div>
            {
              skeletonManagers?.map((manager, index) => {
                return (
                  <div key={index}>
                    <ManagerCard
                      loading={loading}
                    />
                  </div>
                )
              })
            }
          </Container>)
        : (
          <Container nopadding className={root}>
            <div className={header}>
              <TypographyElement
                variant='heading2'
                color={neutral[6]}
                fontWeight='bolder'
                fontSize='29px'
                lineHeight='36px'
                display='inline'
                spacing='42px 0 30px 0'
              >
                {Text.title}
              </TypographyElement>
            </div>

            {total
              ? (
                <>
                  <div className={headerContainer}>
                    <div className={firstPart}>
                      <div className={searchBar}>
                        <SearchBar
                          height={45}
                          width={250}
                          marginLeft={8}
                          handleChange={(value) => {
                            setSearch(value)
                            setPage(0)
                          }}
                          value={search}
                        />
                      </div>
                    </div>
                    <div className={secondPart}>
                      <Button
                        handleClick={() => openDrawer(
                          {
                            componentName: 'inviteManager',
                            props: {
                              handleClose: closeDrawer
                            }
                          }
                        )}
                        size='big'
                        variation='primary'
                        className={button}
                        label={Text.invite}
                        width={200}
                      />
                    </div>
                  </div>
                  <DataTable
                    data={managers}
                    config={config}
                    selectedField={field}
                    sort={asc}
                    handleSort={(e) => {
                      setField(e)
                      setAsc(!asc)
                    }}
                  />
                  {filtredCount > managers?.length
                    ? (
                      <div className={showMoreContainer}>
                        <Button
                          handleClick={() => setPage(page + 1)}
                          size='big'
                          variation='secondary'
                          label={Text.showMore}
                          width={200}
                        />
                      </div>)
                    : null}
                </>)
              : (
                <EmptyPage
                  variant={teamsCount ? 'manager' : null}
                  Title={teamsCount ? Text.Title : Text.TitleNoTeam}
                  SubTitle={teamsCount ? Text.SubTitle : Text.SubTitleNoTeam}
                  manager
                />)}
          </Container>)}
    </>
  )
}
