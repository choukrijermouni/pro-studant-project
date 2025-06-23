import style from './style'
import Text from './text.json'
import { createUseStyles } from 'react-jss'
import InfoCard from 'components/Common/Cards/InfoCard'
import LastAffUserCard from 'components/Home/LastAffUserCard'
import { fetchLastAffectedLearnersAction } from 'pages/Home/store'
import {
  TypographyElement,
  green,
  usePagination,
  Button,
  ButtonVariation,
  ButtonSize,
  neutral
} from '@pro_boa/ui'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { defaultOrderAsc, emptySearch, helpLinks } from 'constants/'
import { noResults } from 'assets'

const useStyle = createUseStyles(style)
const defaultField = 'OperationDate'
export default () => {
  const dispatch = useDispatch()
  const { space, textClass, paginationFooter, illustrationClass, emptyContainer, scrollable } = useStyle()
  const { page, rowsPerPage, skip, setPage } = usePagination()
  const { dateFilter } = useSelector(state => state.organization)
  useEffect(() => {
    dispatch(fetchLastAffectedLearnersAction(rowsPerPage, skip, emptySearch, defaultField, defaultOrderAsc, dateFilter?.startDate, dateFilter?.endDate))
  }, [rowsPerPage, dateFilter, skip, page])
  const { lastAffectedLearners } = useSelector(state => state.organization)
  return (
    lastAffectedLearners?.FilteredCount > 0
      ? (
        <InfoCard title={Text.lastAff} infoLink={helpLinks.homePage}>
          <div className={textClass}>
            <div className={space}>
              <TypographyElement
                variant='heading2'
                color={green[2]}
                fontWeight='bolder'
                fontSize='60px'
                lineHeight='26px'
                display='inline'
                spacing='0 8px 0 0'
              >
                {lastAffectedLearners.FilteredCount}
              </TypographyElement>
              <TypographyElement
                variant='heading2'
                color={green[2]}
                fontWeight='bolder'
                fontSize='16px'
                lineHeight='26px'
                display='inline'
                spacing='0 8px 0 0'
              >
                {Text.licences}
              </TypographyElement>
            </div>
          </div>
          <div className={scrollable}>
            {
              lastAffectedLearners?.Items?.map((lastAffectedLearner, index) => {
                return (
                  <div key={index}>
                    <LastAffUserCard data={lastAffectedLearner} />
                  </div>
                )
              })
            }
            {lastAffectedLearners?.FilteredCount > lastAffectedLearners?.Items?.length && (
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
        </InfoCard>)
      : (
        <InfoCard title={Text.lastAff} iconLink={helpLinks.homePage}>
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
              {Text.noLastAffectation}
            </TypographyElement>
          </div>
        </InfoCard>)
  )
}
