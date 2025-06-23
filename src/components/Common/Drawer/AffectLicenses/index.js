import {
  TypographyElement,
  Button
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLicenseInfoAction } from 'pages/Home/store'
import { useEffect, useState } from 'react'
import { amazonBucket, annualLicenseType, monthlyLicenseType, trialLicenseType } from 'constants/'
import { affectBulkLicensesAction, getNoActiveLicenseLearnersAction } from 'pages/Learners/store'
import LicenseSelectList from './LicenseSelectList'
import RemainingLicenses from './RemainingLicenses'
import LearnerSelectItem from './LearnerSelectItem'
import SearchBar from 'components/Common/SearchBar'

const useStyle = createUseStyles(style)
const noLoaderAction = true

export default ({ handleClose }) => {
  const dispatch = useDispatch()
  const {
    root,
    header,
    searchBar,
    learnersContainer
  } = useStyle()
  const { OrganizationLicenseDetails = [], TotalLicensesRemaining } = useSelector(({ organization }) => organization.licenseInfo)
  const { noLicenseLearners = [] } = useSelector(({ learners }) => learners)
  const LicenseDetails = (licenseType) => OrganizationLicenseDetails?.find(license => license?.OrganizationLicenseType === licenseType)
  const [noLicenseLearnersState, setNoLicenseLearnersState] = useState(noLicenseLearners)
  const learnersList = [...noLicenseLearnersState]
  useEffect(() => {
    dispatch(fetchLicenseInfoAction(noLoaderAction))
    dispatch(getNoActiveLicenseLearnersAction())
  }, [])
  const initialSelectedLicense = LicenseDetails(annualLicenseType)?.LicenseTypeRemaining
    ? annualLicenseType
    : LicenseDetails(monthlyLicenseType)?.LicenseTypeRemaining
      ? monthlyLicenseType
      : LicenseDetails(trialLicenseType)?.LicenseTypeRemaining
        ? trialLicenseType
        : null
  const [selectedLicense, setSelectedLicense] = useState(initialSelectedLicense)
  const [selectedLearners, setSelectedLearners] = useState([])
  const handleChangeSelectedLicense = (license) => {
    setSelectedLicense(license)
    setSelectedLearners([])
  }
  useEffect(() => {
    setNoLicenseLearnersState(noLicenseLearners)
  }, [noLicenseLearners.length])
  const [learnersUpdatedList, setLearnersUpdatedList] = useState(learnersList)
  const handleAddItem = (learner) => {
    if (learner && !selectedLearners.includes(learner.Id)) {
      setSelectedLearners([...selectedLearners, learner.Id])
    }
  }
  useEffect(() => {
    setLearnersUpdatedList(learnersList)
  }, [learnersList.length])
  const handleRemoveItem = (learner) => {
    const updatedItems = selectedLearners.filter(item => item !== learner.Id)
    setSelectedLearners(updatedItems)
  }
  const [search, setSearch] = useState('')
  const handleSearch = value => {
    const filteredData = learnersList.filter(item =>
      (item.FirstName && item.FirstName.toLowerCase().includes(value.toLowerCase())) ||
      (item.LastName && item.LastName.toLowerCase().includes(value.toLowerCase())) ||
      (item.Email && item.Email.toLowerCase().includes(value.toLowerCase()))
    )
    setLearnersUpdatedList(filteredData)
    setSearch(value)
  }
  const licensesRemaining = LicenseDetails(selectedLicense)?.LicenseTypeRemaining
  return (
    <div className={root}>
      <div className={header}>
        <TypographyElement
          component='h3'
          variant='heading3'
          align='left'
          display='flex'
        >
          {Text.title}
        </TypographyElement>
      </div>
      <RemainingLicenses OrganizationLicenseDetails={OrganizationLicenseDetails} TotalLicensesRemaining={TotalLicensesRemaining} />
      {LicenseDetails(annualLicenseType)?.LicenseTypeRemaining && LicenseDetails(monthlyLicenseType)?.LicenseTypeRemaining
        ? <LicenseSelectList selectedLicense={selectedLicense} setSelectedLicense={handleChangeSelectedLicense} />
        : null}
      <div>
        <div className={header}>
          <TypographyElement
            fontWeight={600}
            fontSize='13px'
            lineHeight='16px'
            margin='24px 0 0 0'
          >
            {Text.learners}
          </TypographyElement>
          <TypographyElement
            fontWeight={600}
            fontSize='13px'
            lineHeight='16px'
            margin='24px 0 0 0'
            color='#9CAEC1'
          >
            {`(${selectedLearners.length}/${licensesRemaining} ${Text.selected}`}
          </TypographyElement>
        </div>
        <div className={searchBar}>
          <SearchBar
            label={Text.searchPlaceHolders}
            height={45}
            handleChange={handleSearch}
            value={search}
          />
        </div>
        <div className={learnersContainer}>
          {learnersUpdatedList.map((learner, key) => {
            return (
              <LearnerSelectItem
                disabled={!selectedLearners.includes(learner.Id) && selectedLearners.length >= licensesRemaining}
                key={key}
                selected={selectedLearners.includes(learner.Id)}
                name={`${learner.FirstName} ${learner.LastName}`}
                image={learner.Photo ? `${amazonBucket.bucketBaseUrl}${learner.Photo}` : null}
                handleAdd={() => handleAddItem(learner)}
                handleRemove={() => handleRemoveItem(learner)}
              />
            )
          })}
        </div>
        <Button
          handleClick={() => {
            dispatch(affectBulkLicensesAction({ learnersIds: [...selectedLearners], organizationLicenseType: selectedLicense }))
            handleClose()
          }}
          disabled={!selectedLearners.length}
          width='100%'
          marginButton='32px 0 0 0'
          height={54}
          label={Text.affect}
        />
      </div>
    </div>
  )
}
