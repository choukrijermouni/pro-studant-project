import {
  Button,
  Container
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import SearchBar from 'components/Common/SearchBar'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import DataTable from 'components/Common/DataTable'
import { CreationDateRow, InvitedManagerRow, LastConnectionDateRow, NameRow, TeamNameRow } from './Rows'
import { useDrawer } from 'components/Common/Drawer/drawerContext'
import Pagination from 'components/Common/DataTable/Pagination'
import EmptyPage from 'components/Common/EmptyPage'

const useStyle = createUseStyles(style)

export default ({ page, setPage, setField, asc, setAsc, search, setSearch, field, rowsPerPage, skip, setRowsPerPage }) => {
  const {
    root,
    headerContainer,
    firstPart,
    searchBar,
    secondPart,
    button
  } = useStyle()
  const [rowId, setRowId] = useState(null)
  const { openDrawer, closeDrawer } = useDrawer()
  const managers = useSelector(({ managers }) => managers.Items)
  const filtredCount = useSelector(({ managers }) => managers.FilteredCount)
  const total = useSelector(({ managers }) => managers.Count)
  const { Total: teamsCount } = useSelector(state => state.teams)
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
    <Container nopadding className={root}>
      <>
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
                inactive
                data={managers}
                config={config}
                selectedField={field}
                sort={asc}
                handleSort={(e) => {
                  setField(e)
                  setAsc(!asc)
                }}
              />
              <Pagination
                data={managers}
                setRowsPerPage={setRowsPerPage}
                count={filtredCount}
                page={page}
                skip={skip}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
              />
            </>)
          : (
            <EmptyPage
              variant={teamsCount ? 'manager' : null}
              Title={teamsCount ? Text.Title : Text.TitleNoTeam}
              SubTitle={teamsCount ? Text.SubTitle : Text.SubTitleNoTeam}
              manager
            />)}
      </>
    </Container>
  )
}
