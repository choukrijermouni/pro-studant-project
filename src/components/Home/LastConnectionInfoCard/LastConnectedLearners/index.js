import { useEffect } from 'react'
import style from './style'
import Text from './text.json'
import { createUseStyles } from 'react-jss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrganizationLastConnectedLearners } from 'pages/Home/store'
import {
  usePagination,
  Button,
  ButtonVariation,
  ButtonSize
} from '@pro_boa/ui'
import LastConnectionUserCard from 'components/Home/LastConnectionUserCard'

const useStyle = createUseStyles(style)

export default () => {
  const {
    textClass,
    paginationFooter
  } = useStyle()
  const dispatch = useDispatch()
  const { lastConnectedUsers } = useSelector(state => state.organization)
  const { page, rowsPerPage, skip, setPage } = usePagination()
  useEffect(() => {
    dispatch(fetchOrganizationLastConnectedLearners(rowsPerPage, skip))
  }, [rowsPerPage, skip, page])
  const { loading } = useSelector(state => state.config)
  return (
    lastConnectedUsers?.count > 0
      ? (
        <div className={textClass}>
          {lastConnectedUsers?.data?.map((learner, index) => {
            return (
              <div key={index}>
                {learner?.InvitationId
                  ? null
                  : <LastConnectionUserCard data={learner} loading={loading} />}
              </div>
            )
          })}
          {lastConnectedUsers?.count > lastConnectedUsers?.data?.length && (
            <div className={paginationFooter}>
              <Button
                variation={ButtonVariation.secondary}
                width={160}
                height={30}
                size={ButtonSize.small}
                label={Text.showMore}
                handleClick={() => setPage(page + 1)}
              />
            </div>
          )}
        </div>
        )
      : null
  )
}
