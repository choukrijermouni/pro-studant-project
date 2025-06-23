import {
  TypographyElement,
  neutral,
  usePagination,
  useSort,
  Container
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchManagersAction, setManagersPagination } from 'pages/Manager/store'
import { TurnOnLoaderAction } from 'store/config'
import Layout from 'components/Common/Layout'
import ManagerWithData from './managerWithData'
import ManagerSkeleton from './ManagerSkeleton'

const useStyle = createUseStyles(style)

export default () => {
  const {
    root,
    header
  } = useStyle()
  const dispatch = useDispatch()
  const { page, rowsPerPage, skip, setPage, setRowsPerPage } = usePagination()
  const { field, setField, asc, setAsc } = useSort('FirstName')
  const [search, setSearch] = useState('')
  const { loading } = useSelector(state => state.config)
  useEffect(() => { dispatch(TurnOnLoaderAction()) }, [])
  useEffect(() => {
    dispatch(setManagersPagination(skip, rowsPerPage))
  }, [skip, rowsPerPage])
  useEffect(() => {
    dispatch(fetchManagersAction(rowsPerPage, skip, asc, field, search))
  }, [rowsPerPage, skip, asc, field, search])
  return (
    <Layout>
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
        {loading
          ? <ManagerSkeleton />
          : <ManagerWithData
              loading={loading}
              setRowsPerPage={setRowsPerPage}
              page={page}
              setPage={setPage}
              skip={skip}
              setField={setField}
              asc={asc}
              rowsPerPage={rowsPerPage}
              field={field}
              setAsc={setAsc}
              search={search}
              setSearch={setSearch}
            />}
      </Container>
    </Layout>
  )
}
