import { useEffect } from 'react'
import style from './style'
import Text from './text.json'
import { createUseStyles } from 'react-jss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrganizationLastConnectedManagers } from 'pages/Home/store'
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
  const { lastConnectedManagers } = useSelector(state => state.organization)
  const { page, rowsPerPage, skip, setPage } = usePagination()
  useEffect(() => {
    dispatch(fetchOrganizationLastConnectedManagers(rowsPerPage, skip))
  }, [rowsPerPage, skip, page])
  const { loading } = useSelector(state => state.config)
  return (
    lastConnectedManagers?.count > 0
      ? (
        <div className={textClass}>
          {lastConnectedManagers?.data?.map((manager, index) => {
            return (
              <div key={index}>
                {manager?.InvitationId
                  ? null
                  : <LastConnectionUserCard manager data={manager} loading={loading} />}
              </div>
            )
          })}
          {lastConnectedManagers?.count > lastConnectedManagers?.data?.length && (
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
