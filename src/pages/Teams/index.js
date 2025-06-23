import {
  TypographyElement,
  useSort,
  usePagination
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import Layout from 'components/Common/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchTeamsAction, setTeamsPagination } from './store'
import { AdminRole } from 'constants/'
import EmptyPage from 'components/Common/EmptyPage'
import { TurnOnLoaderAction } from 'store/config'
import TeamsSkeleton from './TeamsSkeleton'
import TeamsInfo from './TeamsInfo'
import TeamsWithData from './TeamsWithData'
import Pagination from 'components/Common/DataTable/Pagination'
import DataTableSkeleton from 'components/Common/DataTable/DataTableSkeleton'

const useStyle = createUseStyles(style)

const sortField = 'Name'

export default () => {
  const {
    titleClass
  } = useStyle()
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')
  const { organizationId } = useSelector(state => state.organization)
  const { data, count, Total } = useSelector(state => state.teams)
  const { loading } = useSelector(state => state.config)
  const { page, rowsPerPage, skip, setPage, setRowsPerPage } = usePagination()
  const { field, setField, asc, setAsc } = useSort(sortField)
  const { user } = useSelector(({ identity }) => identity)
  const { isManager } = useSelector(({ organizationProfile }) => organizationProfile)
  useEffect(() => {
    dispatch(TurnOnLoaderAction())
  }, [])
  useEffect(() => {
    dispatch(setTeamsPagination(skip, rowsPerPage))
  }, [skip, rowsPerPage])
  useEffect(() => {
    dispatch(fetchTeamsAction(organizationId, rowsPerPage, skip, asc, field, search, isManager ? user?.Id : null))
  }, [organizationId, page, rowsPerPage, asc, field, search, user?.Id, skip])
  const handleSearch = value => {
    setSearch(value)
    setPage(0)
  }
  const isAdmin = user?.role?.includes(AdminRole)

  return (
    <Layout>
      {loading
        ? (
          <>
            <TeamsSkeleton />
            <DataTableSkeleton titles={[Text.name, Text.learnersCount, Text.managers]} />
          </>)
        : (
          <>
            <TypographyElement
              component='h2'
              variant='heading2'
              align='left'
              spacing='42px 0 30px 0'
              display='flex'
              className={titleClass}
            >
              {Text.teams}
            </TypographyElement>
            {
              Total
                ? (
                  <>
                    <TeamsInfo />
                    <TeamsWithData field={field} setPage={setPage} handleSearch={handleSearch} setField={setField} asc={asc} setAsc={setAsc} search={search} loading={loading} />
                    <Pagination
                      data={data}
                      setRowsPerPage={setRowsPerPage}
                      count={count}
                      page={page}
                      skip={skip}
                      rowsPerPage={rowsPerPage}
                      setPage={setPage}
                    />
                  </>)
                : (
                  <EmptyPage
                    variant='team'
                    Title={isAdmin ? Text.title : Text.managerTitle}
                    SubTitle={isAdmin ? Text.subtitle : Text.managerSubTitle}
                    manager={!isAdmin}
                  />)
            }
          </>)}
    </Layout>
  )
}
