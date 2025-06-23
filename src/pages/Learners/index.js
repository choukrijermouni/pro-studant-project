import {
  TypographyElement,
  blue,
  usePagination,
  useSort,
  Modal
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import Layout from 'components/Common/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  fetchLearnersAction,
  getNoActiveLicenseLearnersAction,
  fetchNeverConnectedLearnersAction,
  setLearnersPagination
} from './store'
import { AdminRole, contactB2B, OnBoardingStateEnum } from 'constants/'
import EmptyPage from 'components/Common/EmptyPage'
import OnBoardingManager from 'pages/OnboardingContainer'
import { TurnOnLoaderAction } from 'store/config'
import { fetchListTeamsAction } from 'pages/Teams/store'
import LearnersSkeleton from './LearnersSkeleton'
import LearnersInfo from './LearnersInfo'
import LearnersWithData from './LearnersWithData'
import Pagination from 'components/Common/DataTable/Pagination'
import LastLicenseModal from 'components/Common/Drawer/AffectLicense/LastLicenseModal'
import { sendNotificationAction, switchLastLicensePopupAction } from 'pages/LearnerProfile/store'
import DataTableSkeleton from 'components/Common/DataTable/DataTableSkeleton'

const useStyle = createUseStyles(style)

export const OrderLicenseModal = ({ orderLicenseIsOpen, setOrderLicenseIsOpen }) => {
  return (
    <Modal
      isOpen={orderLicenseIsOpen}
      handleClose={() => setOrderLicenseIsOpen(!orderLicenseIsOpen)}
    >
      <TypographyElement
        component='h4'
        variant='caption1'
        spacing='10px 16px 11px 16px'
      >
        {`${Text.contact.contactName} ${contactB2B.ContactName} ${Text.contact.in} ${contactB2B.ContactEmail} ${Text.contact.or} ${contactB2B.ContactPhone} ${Text.contact.forLicense}`}
      </TypographyElement>
    </Modal>
  )
}
const sortField = 'CreationDate'
const turnOffLoaderWhenDone = true

export default () => {
  const dispatch = useDispatch()
  const { data, Total, FilteredCount, TotalLearnersWithoutLicense } = useSelector(state => state.learners)
  const { user } = useSelector(({ identity }) => identity)
  const { page, rowsPerPage, setPage, setRowsPerPage, skip } = usePagination()
  useEffect(() => {
    dispatch(getNoActiveLicenseLearnersAction())
  }, [TotalLearnersWithoutLicense])
  useEffect(() => {
    dispatch(fetchNeverConnectedLearnersAction())
    dispatch(fetchListTeamsAction())
  }, [])
  const { field, setField, asc, setAsc } = useSort(sortField)
  const [search, setSearch] = useState('')
  const { isManager } = useSelector(({ organizationProfile }) => organizationProfile)
  const { onBoardingState } = useSelector(state => state.onboarding)
  const [isOpen, setIsOpen] = useState(false)
  const { emailTypes } = useSelector(({ referential }) => referential)
  const { loading } = useSelector(state => state.config)
  useEffect(() => {
    dispatch(setLearnersPagination(skip, rowsPerPage))
  }, [skip, rowsPerPage])
  useEffect(() => { dispatch(TurnOnLoaderAction()) }, [])
  useEffect(() => { setAsc(false) }, [])
  useEffect(() => {
    dispatch(fetchLearnersAction(turnOffLoaderWhenDone, rowsPerPage, skip, field, asc, search, isManager ? user?.Id : null))
  }, [page, rowsPerPage, field, asc, search, user?.Id, skip])
  const { lastLicensePopupClosed } = useSelector(({ profile }) => profile)
  useEffect(() => {
    setIsOpen(!lastLicensePopupClosed)
  }, [lastLicensePopupClosed])
  const handleSearch = value => {
    setSearch(value)
    setPage(0)
  }
  const {
    learnersBox,
    learnersInfo
  } = useStyle({ loading })

  const isAdmin = user?.role?.includes(AdminRole)

  return (
    onBoardingState === OnBoardingStateEnum.Start
      ? <OnBoardingManager />
      : (
        <Layout>
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
          {
            loading
              ? (
                <>
                  <LearnersSkeleton />
                  <DataTableSkeleton titles={[Text.name, Text.team, Text.creationDate, Text.lastConnectionDate, Text.endDate]} />
                </>)
              : Total
                ? (
                  <div>
                    <TypographyElement
                      component='h2'
                      variant='heading2'
                      align='left'
                      spacing='42px 0 30px 0'
                    >
                      {Text.learners}
                    </TypographyElement>
                    <div className={learnersBox}>
                      <div className={learnersInfo}>
                        <TypographyElement
                          component='h4'
                          variant='heading4'
                          align='left'
                          spacing='20px 0 5px 0'
                        >
                          {Text.allLearners}
                        </TypographyElement>
                        <TypographyElement
                          component='h1'
                          align='left'
                          fontSize='60px'
                          spacing='20px 0 21px 0'
                          color={blue[0]}
                          fontWeight={550}
                        >
                          {Total}
                        </TypographyElement>
                      </div>
                      <LearnersInfo />
                    </div>
                    <LearnersWithData
                      handleSearch={handleSearch}
                      search={search}
                      setField={setField}
                      field={field}
                      asc={asc}
                      setAsc={setAsc}
                      setPage={setPage}
                    />
                    <Pagination
                      data={data}
                      setRowsPerPage={setRowsPerPage}
                      count={FilteredCount}
                      page={page}
                      skip={skip}
                      rowsPerPage={rowsPerPage}
                      setPage={setPage}
                    />
                  </div>)
                : (
                  <>
                    <TypographyElement
                      component='h2'
                      variant='heading2'
                      align='left'
                      spacing='42px 0 30px 0'
                    >
                      {Text.learners}
                    </TypographyElement>
                    <EmptyPage variant='learner' manager={!isAdmin} Title={isAdmin ? Text.title : Text.managerTitle} SubTitle={isAdmin ? Text.subTitle : Text.managerSubTitle} />
                  </>)
          }
        </Layout>)
  )
}
