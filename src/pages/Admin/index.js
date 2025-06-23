import Layout from 'components/Common/Layout'
import {
  TypographyElement,
  Icon,
  Icons,
  Skeleton,
  useSort,
  usePagination,
  Button
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchAdminsAction, setAdminsPagination } from './store'
import { useHistory } from 'react-router-dom'
import { help } from 'assets'
import { defaultField, helpLinks } from 'constants/'
import DataTable from 'components/Common/DataTable'
import { CreationDateRow, EmailRow, InvitedAdminRow, LastConnectionDateRow, NameRow } from './Rows'
import Pagination from 'components/Common/DataTable/Pagination'
import SearchBar from 'components/Common/SearchBar'
import { useDrawer } from 'components/Common/Drawer/drawerContext'
import { TurnOnLoaderAction } from 'store/config'
import DataTableSkeleton from 'components/Common/DataTable/DataTableSkeleton'

const useStyle = createUseStyles(style)
const sortField = 'CreationDate'

export default () => {
  const {
    icon,
    container,
    titleStyle,
    iconContainer,
    iconHelp,
    headerContainer,
    firstPart,
    searchBar,
    secondPart,
    ctaStyle
  } = useStyle()
  const dispatch = useDispatch()
  const { page, rowsPerPage, skip, setPage, setRowsPerPage } = usePagination()
  const { field, setField, asc, setAsc } = useSort(defaultField)
  const [search, setSearch] = useState('')
  const [firstAdmin, setFirstAdmin] = useState({})
  useEffect(() => { dispatch(TurnOnLoaderAction()) }, [])
  useEffect(() => setAsc(true), [])
  useEffect(() => {
    dispatch(setAdminsPagination(skip, rowsPerPage))
  }, [skip, rowsPerPage])
  useEffect(() => {
    dispatch(fetchAdminsAction(rowsPerPage, skip, asc, sortField, search))
    setFirstAdmin(data[0])
  }, [])

  useEffect(() => {
    dispatch(fetchAdminsAction(rowsPerPage, skip, asc, field, search))
  }, [rowsPerPage, skip, asc, field, search])
  const { data } = useSelector(({ admins }) => admins)
  const history = useHistory()
  const { openDrawer, closeDrawer } = useDrawer()
  const { loading } = useSelector(state => state.config)
  const config = {
    costumRowRender: (item) => {
      return (
        <InvitedAdminRow item={item} />
      )
    },
    costumRowCondition: (item) => !!item.InvitationId,
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
        property: 'Email',
        title: Text.email,
        render: (item, props, value) => {
          return (
            <EmailRow value={value} FirstAdmin={firstAdmin} />
          )
        }
      }
    ]
  }

  return (
    <Layout>
      <div className={container}>
        <div
          className={iconContainer}
          onClick={() => {
            history.goBack()
          }}
        >
          <Icon iconName={Icons.roundedLeft} style={icon} />
        </div>
        <div className={titleStyle}>
          <TypographyElement
            component='h2'
            variant='heading2'
            align='left'
            fontSize='29px'
            lignHeight='36px'
            display='inline'
            spacing='0 16px 0 0'
          >
            {Text.title}
          </TypographyElement>
          <a href={helpLinks.admins} target='_blank' rel='noreferrer'>
            <img src={help} alt='help' className={iconHelp} />
          </a>
        </div>
        {
          loading
            ? (
              <>
                <div className={headerContainer}>
                  <div className={ctaStyle}>
                    <Skeleton lines={1} height={45} width={300} />
                  </div>
                  <div className={ctaStyle}>
                    <Skeleton lines={1} height={45} width={300} />
                  </div>
                </div>
                <DataTableSkeleton titles={[Text.name, Text.creationDate, Text.lastConnectionDate, Text.email]} />
              </>)
            : (
              <div>
                <div className={headerContainer}>
                  <div className={firstPart}>
                    <div className={searchBar}>
                      <SearchBar
                        height={45}
                        width={250}
                        marginLeft={8}
                        handleChange={(value) => {
                          setSearch(value)
                          setPage(0)
                        }}
                        value={search}
                      />
                    </div>
                  </div>
                  <div className={secondPart}>
                    <Button
                      handleClick={() => openDrawer(
                        {
                          componentName: 'inviteAdmin',
                          props: {
                            handleClose: closeDrawer
                          }
                        }
                      )}
                      size='big'
                      variation='primary'
                      label={Text.invite}
                      width={200}
                    />
                  </div>
                </div>
                <br />
                <DataTable
                  inactive
                  loading={loading}
                  data={data}
                  config={config}
                  selectedField={field}
                  sort={asc}
                  handleSort={(e) => {
                    setField(e)
                    setAsc(!asc)
                  }}
                />
                <Pagination
                  data={data}
                  setRowsPerPage={setRowsPerPage}
                  count={data.length}
                  page={page}
                  skip={skip}
                  rowsPerPage={rowsPerPage}
                  setPage={setPage}
                />
              </div>)
        }
      </div>
    </Layout>
  )
}
