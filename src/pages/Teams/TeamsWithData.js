import {
  TypographyElement,
  Button,
  Icon,
  Icons,
  neutral,
  Skeleton
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { TeamDetailsNeutralPath } from 'Routes'
import SearchBar from 'components/Common/SearchBar'
import { AdminRole } from 'constants/'
import { TurnOnLoaderAction } from 'store/config'
import DataTable from 'components/Common/DataTable'
import { ManagersRow, NameRow, TeamCountRow } from './TeamRows'
import { useDrawer } from 'components/Common/Drawer/drawerContext'

const useStyle = createUseStyles(style)

export default ({ handleSearch, setField, asc, setAsc, search, field, loading, setPage }) => {
  const {
    headerContainer,
    firstPart,
    searchBar,
    secondPart,
    icon,
    cardStyle,
    arrow,
    button,
    tableContainer
  } = useStyle()
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.teams)
  const { user } = useSelector(({ identity }) => identity)
  const { openDrawer, closeDrawer } = useDrawer()
  const isAdmin = user?.role?.includes(AdminRole)
  const config = {
    handleRowClick: (data) => {
      dispatch(push(`${TeamDetailsNeutralPath}/${data.Id}`))
      dispatch(TurnOnLoaderAction())
    },
    columns: [
      {
        property: 'Name',
        title: Text.name,
        sortable: true,
        render: (item, props, value) => {
          return (
            <NameRow value={value} />
          )
        }
      },
      {
        property: 'LearnersCount',
        title: Text.learnersCount,
        sortable: true,
        render: (item) => {
          return (
            <TeamCountRow item={item} />
          )
        }
      },
      {
        property: 'Managers',
        title: Text.managers,
        render: (item, props, value) => {
          return (
            <ManagersRow item={item} value={value} />
          )
        }
      }
    ]
  }
  return (
    <>
      {loading
        ? (
          <div className={headerContainer}>
            <div className={firstPart}>
              <div className={searchBar}>
                <Skeleton lines={1} height={45} width={300} />
              </div>
            </div>
            <div className={secondPart}>
              <Skeleton lines={1} height={45} width={300} />
              <Skeleton lines={1} height={45} width={300} />
            </div>
          </div>
          )
        : (
          <div className={headerContainer}>
            <div className={firstPart}>
              <div className={searchBar}>
                <SearchBar
                  height={45}
                  width={300}
                  label={search}
                  handleChange={handleSearch}
                />
              </div>
            </div>
            <div className={secondPart}>
              <div
                className={cardStyle}
                onClick={() => openDrawer(
                  {
                    componentName: 'downloadReport',
                    props: {
                      handleClose: closeDrawer
                    }
                  }
                )}
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
                        componentName: 'createTeam',
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
          )}
      <div className={tableContainer}>
        <DataTable
          loading={loading}
          data={data}
          config={config}
          selectedField={field}
          sort={asc}
          handleSort={(e) => {
            setPage(0)
            setField(e)
            setAsc(!asc)
          }}
        />
      </div>
    </>
  )
}
