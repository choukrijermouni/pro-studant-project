import {
  TypographyElement,
  Button,
  Icon,
  Icons,
  blue,
  neutral
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { InvitedProfilePath, LearnerProfileNeutralPath } from 'Routes'
import { useEffect, useState } from 'react'
import SearchBar from 'components/Common/SearchBar'
import {
  fetchInvitedLearnerInfosAction, setLearnersReportDatesAction
} from './store'
import { AdminRole } from 'constants/'
import { TurnOnLoaderAction } from 'store/config'
import DataTable from 'components/Common/DataTable'
import { CreationDateRow, EndDateRow, InvitedLearnerRow, LastConnectionDateRow, NameRow, TeamNameRow } from './Rows'
import { useDrawer } from 'components/Common/Drawer/drawerContext'
import DateRange from 'components/Common/DateRange'
import moment from 'moment'

const useStyle = createUseStyles(style)

export default ({ handleSearch, search, setField, asc, setAsc, field, setPage }) => {
  const dispatch = useDispatch()
  const { openDrawer, closeDrawer } = useDrawer()
  const [open, setOpen] = useState(false)
  const handleSelect = values => {
    dispatch(setLearnersReportDatesAction(moment(values.selection.startDate)._d, moment(values.selection.endDate)._d))
  }
  const { data, from, to } = useSelector(state => state.learners)
  const { user } = useSelector(({ identity }) => identity)
  const { organizationLicenseTypes = {} } = useSelector(({ referential }) => referential)
  const { loading } = useSelector(state => state.config)
  useEffect(() => {
    dispatch(setLearnersReportDatesAction(moment()._d, moment()._d))
  }, [])
  const {
    icon,
    cardStyle,
    headerContainer,
    firstPart,
    searchBar,
    secondPart,
    arrow,
    button
  } = useStyle({ loading })
  const [listUsers, setListUsers] = useState(data)
  useEffect(() => {
    setListUsers(data)
  }, [data])
  const isAdmin = user?.role?.includes(AdminRole)
  const config = {
    costumRowRender: (item) => {
      return (
        <InvitedLearnerRow learnerSide item={item} />
      )
    },
    costumRowCondition: (item) => !!item.InvitationId,
    handleRowClick: (data) => {
      dispatch(TurnOnLoaderAction())
      if (data.InvitationId) {
        dispatch(fetchInvitedLearnerInfosAction(data))
        dispatch(push(InvitedProfilePath))
      } else dispatch(push(`${LearnerProfileNeutralPath}/${data.Id}`))
    },
    columns: [
      {
        property: 'FirstName',
        title: Text.name,
        sortable: true,
        render: (item, props, value) => {
          return (
            <NameRow value={value} />
          )
        }
      },
      {
        property: 'TeamName',
        title: Text.team,
        render: (item) => {
          return (
            <TeamNameRow item={item} />
          )
        }
      },
      {
        property: 'CreationDate',
        title: Text.creationDate,
        sortable: true,
        render: (item) => {
          return (
            <CreationDateRow item={item} />
          )
        }
      },
      {
        property: 'LastConnectionDate',
        title: Text.lastConnectionDate,
        sortable: true,
        render: (item) => {
          return (
            <LastConnectionDateRow item={item} />
          )
        }
      },
      {
        property: 'EndDate',
        title: Text.endDate,
        sortable: true,
        render: (item, props, value) => {
          return (
            <EndDateRow setPage={setPage} item={item} value={value} organizationLicenseTypes={organizationLicenseTypes} />
          )
        }
      }
    ]
  }
  return (
    <>
      <DateRange
        open={open}
        setOpen={setOpen}
        handleChange={handleSelect}
        rangeColors={blue[0]}
        selectionRange={{ startDate: from, endDate: to, key: 'selection' }}
      />
      <div className={headerContainer}>
        <div className={firstPart}>
          <div className={searchBar}>
            <SearchBar
              height={45}
              width={300}
              handleChange={handleSearch}
              value={search}
            />
          </div>
        </div>
        <div className={secondPart}>
          <div
            className={cardStyle}
            onClick={() => openDrawer({
              componentName: 'downloadLearnersReport',
              props: {
                setOpen: setOpen,
                open: open,
                from: from,
                to: to
              }
            })}
          >
            <Icon iconName={Icons.download} style={icon} />
            <TypographyElement
              component='p'
              fontSize='13px'
              lineHeight='16px'
              spacing='0 0 0 8px'
              color={neutral[6]}
            >
              {Text.downloadSuivi}
            </TypographyElement>
            <Icon iconName={Icons.roundedDown} style={arrow} />
          </div>
          {isAdmin
            ? (
              <Button
                handleClick={() => openDrawer(
                  {
                    componentName: 'createLearner',
                    props: {
                      handleClose: closeDrawer
                    }
                  }
                )}
                size='big'
                variation='primary'
                className={button}
                label={Text.createTeam}
                width={200}
              />)
            : null}
        </div>
      </div>
      <div>
        <DataTable
          loading={loading}
          data={listUsers}
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
    </>
  )
}
