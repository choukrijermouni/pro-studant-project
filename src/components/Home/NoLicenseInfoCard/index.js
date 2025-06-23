import style from './style'
import Text from './text.json'
import { createUseStyles } from 'react-jss'
import NoLicencesUserCard from 'components/Home/NoLicencesUserCard'
import InfoCard from 'components/Common/Cards/InfoCard'
import { fetchOrganizationLearnersAction } from 'pages/Home/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  TypographyElement,
  yellow,
  neutral,
  Button,
  ButtonSize,
  ButtonVariation,
  usePagination
} from '@pro_boa/ui'
import { calculatePercentage } from 'helpers'
import { helpLinks } from 'constants/'
import UserInvitedCard from 'components/Common/Cards/UserInvitedCard'
import { noResults } from 'assets'

const useStyle = createUseStyles(style)

export default () => {
  const dispatch = useDispatch()
  const { textClass, paginationFooter, illustrationClass, emptyContainer, scrollable } = useStyle()
  const { page, rowsPerPage, skip, setPage } = usePagination()
  useEffect(() => {
    dispatch(fetchOrganizationLearnersAction(rowsPerPage, skip))
  }, [rowsPerPage, skip, page])
  const { noLicenseUsers } = useSelector(state => state.organization)
  const isLoading = useSelector(state => state.organization.noLicenseUsers.loading)
  return (
    noLicenseUsers?.data?.length > 0
      ? (
        <InfoCard title={Text.noLicence} infoLink={helpLinks.homePage}>
          <>
            <div className={textClass}>
              <TypographyElement
                variant='heading2'
                color={yellow[3]}
                fontWeight='bolder'
                fontSize='60px'
                lineHeight='26px'
                display='inline'
                spacing='0 8px 0 0'
              >
                {`${calculatePercentage(noLicenseUsers?.total, noLicenseUsers?.count)}%`}
              </TypographyElement>
              <TypographyElement
                variant='heading2'
                color={neutral[5]}
                fontWeight='bolder'
                fontSize='16px'
                lineHeight='26px'
                display='inline'
                spacing='0 8px 0 0'
              >
                {Text.noLicences}
              </TypographyElement>
            </div>
          </>
          <div className={scrollable}>
            {
              noLicenseUsers?.data?.map((learner, index) => {
                return (
                  <div key={index}>
                    {
                      learner?.InvitationId
                        ? <UserInvitedCard data={learner} />
                        : <NoLicencesUserCard Data={learner} />
                    }
                  </div>
                )
              })
            }
            {noLicenseUsers?.count > noLicenseUsers?.data?.length && (
              <div className={paginationFooter}>
                <Button
                  variation={ButtonVariation.secondary}
                  width={160}
                  height={30}
                  size={ButtonSize.small}
                  label={Text.showMore}
                  handleClick={() => setPage(page + 1)}
                  disabled={isLoading}
                />
              </div>
            )}
          </div>
        </InfoCard>)
      : (
        <InfoCard title={Text.noLicence} iconLink={helpLinks.homePage}>
          <div className={emptyContainer}>
            <object type='image/svg+xml' data={noResults} className={illustrationClass}>svg-animation</object>
            <TypographyElement
              variant='body'
              color={neutral[5]}
              fontSize='16px'
              lineHeight='26px'
              display='inline'
              spacing='0 8px 0 0'
            >
              {Text.noDataLicences}
            </TypographyElement>
          </div>
        </InfoCard>)
  )
}
