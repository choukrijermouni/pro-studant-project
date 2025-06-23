import Text from './text.json'
import style from './style'
import {
  TypographyElement,
  usePagination,
  blue,
  neutral,
  useSort,
  Skeleton
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import { useEffect, useState } from 'react'
import { fetchLastAffectedLearnersAction } from 'pages/Home/store'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { LearnerProfileNeutralPath } from 'Routes'
import { helpLinks } from 'constants/'
import { help } from 'assets'
import SearchBar from 'components/Common/SearchBar'
import DateRange from 'components/Common/DateRange'
import moment from 'moment'
import DataTable from 'components/Common/DataTable'
import { OperationDateRow, OrganizationLicenseTypeRow, NameRow, AdminNameRow } from './Rows'
import ReportAlertBanner from 'components/Common/ReportAlertBanner'
import Pagination from 'components/Common/DataTable/Pagination'

const useStyle = createUseStyles(style)
const defaultField = 'OperationDate'
export default ({ open, setOpen, from, setFromDate, to, setToDate }) => {
  const dispatch = useDispatch()
  const {
    headerContainer,
    titleClass,
    linkHelp,
    iconHelp,
    containerActions
  } = useStyle()
  const { lastAffectedLearners } = useSelector(state => state.organization)
  const [search, setSearch] = useState('')
  const { page, rowsPerPage, skip, setPage, setRowsPerPage } = usePagination()
  const { field, setField, asc, setAsc } = useSort(defaultField)
  useEffect(() => {
    setAsc(false)
  }, [])
  const handleSearch = value => {
    setSearch(value)
    setPage(0)
  }
  useEffect(() => {
    dispatch(fetchLastAffectedLearnersAction(rowsPerPage, skip, search, field, asc, from, to))
  }, [page, field, rowsPerPage, asc, search, from, to, skip])
  const handleSelect = values => {
    setFromDate(moment(values.selection.startDate)._d)
    setToDate(moment(values.selection.endDate)._d)
  }
  const { organizationLicenseTypes } = useSelector(state => state.referential)
  const { loading } = useSelector(state => state.config)
  const config = {
    handleRowClick: (data) => {
      dispatch(push(`${LearnerProfileNeutralPath}/${data.UserId}`))
    },
    columns: [
      {
        property: 'FirstName',
        title: Text.name,
        render: (item, props, value) => {
          return (
            <NameRow value={value} />
          )
        }
      },
      {
        property: 'OperationDate',
        title: Text.operationDate,
        sortable: true,
        render: (item) => {
          return (
            <OperationDateRow item={item} />
          )
        }
      },
      {
        property: 'AdminName',
        title: Text.admin,
        render: (item) => {
          return (
            <AdminNameRow item={item} />
          )
        }
      },
      {
        property: 'OrganizationLicenseType',
        title: Text.licenseType,
        sortable: true,
        render: (item, props, value) => {
          return (
            <OrganizationLicenseTypeRow value={value} organizationLicenseTypes={organizationLicenseTypes} />
          )
        }
      }
    ]
  }
  return (
    <>
      <div className={headerContainer}>
        <TypographyElement
          component='h2'
          variant='heading2'
          align='left'
          spacing='24px 0 16px 0'
          display='flex'
          className={titleClass}
        >
          {Text.affectationHistory}
          <a rel='noopener noreferrer' target='_blank' href={helpLinks.affectationHistory} className={linkHelp}><img src={help} alt='help' className={iconHelp} /></a>
        </TypographyElement>
      </div>
      {
        !loading
          ? (
            <>
              <div className={containerActions}>
                <SearchBar
                  noWidthPreset
                  marginRight={12}
                  height={45}
                  width={300}
                  label={search}
                  handleChange={handleSearch}
                />
                <DateRange
                  open={open}
                  setOpen={setOpen}
                  handleChange={handleSelect}
                  rangeColors={blue[0]}
                  selectionRange={{ startDate: from, endDate: to, key: 'selection' }}
                />
              </div>
            </>)
          : (
            <Skeleton lines={1} height={45} width={300} />)
      }

      {
        lastAffectedLearners.Total && lastAffectedLearners.FilteredCount
          ? (
            <>
              <div>
                <DataTable
                  loading={loading}
                  data={lastAffectedLearners?.Items}
                  config={config}
                  selectedField={field}
                  sort={asc}
                  handleSort={(e) => {
                    setField(e)
                    setPage(0)
                    setAsc(!asc)
                  }}
                />
              </div>
              <Pagination
                data={lastAffectedLearners?.Items}
                setRowsPerPage={setRowsPerPage}
                count={lastAffectedLearners.FilteredCount}
                page={page}
                skip={skip}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
              />
            </>)
          : (
            <ReportAlertBanner mode='horizontal' status='alert' width='100%'>
              <TypographyElement
                variant='body1'
                fontSize='16px'
                spacing='10px'
                color={neutral[6]}
              >
                {
                  !lastAffectedLearners.Total && !lastAffectedLearners.FilteredCount
                    ? Text.noOperation
                    : Text.noOperationFiltered
                }
              </TypographyElement>
            </ReportAlertBanner>)
      }
    </>
  )
}
