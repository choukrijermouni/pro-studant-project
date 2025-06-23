import Layout from 'components/Common/Layout'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  fetchTeamAction,
  fetchTeamLearnersAction,
  getManagersListAction,
  getTeamLearnersRecapAction,
  getTeamRecapAction
} from './store'
import {
  usePagination,
  useSort
} from '@pro_boa/ui'
import TeamDetails from 'components/Team/TeamDetails'

const sortField = 'CreationDate'

export default () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { page, rowsPerPage, skip } = usePagination()
  const { asc, field } = useSort(sortField)
  const { loading } = useSelector(state => state.config)
  useEffect(() => {
    dispatch(fetchTeamAction(id))
    dispatch(getTeamRecapAction(id))
    dispatch(getTeamLearnersRecapAction(id))
    dispatch(getManagersListAction())
  }, [id])
  useEffect(() => {
    dispatch(fetchTeamLearnersAction(id, rowsPerPage, skip, asc, field))
  }, [id, rowsPerPage, skip, asc, field, page])
  return (
    <Layout menu='team'>
      <TeamDetails loading={loading} />
    </Layout>
  )
}
