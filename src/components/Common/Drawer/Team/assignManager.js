import {
  Row,
  TypographyElement,
  Button,
  Col,
  SelectList,
  usePagination,
  useSort
} from '@pro_boa/ui'
import { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useDispatch, useSelector } from 'react-redux'
import style from './style'
import Text from './text.json'
import { fetchManagersAction } from 'pages/Manager/store'
import { assignManagerAction } from 'pages/TeamDetails/store'
import { AdminRole } from 'constants/'
import TeamLogoAndManagers from 'components/Common/Drawer/Team/common/header'
import { scrollUp } from 'helpers'
import { fetchTeamAction } from 'pages/Teams/store'

const useStyle = createUseStyles(style)

export default ({ handleClose, id }) => {
  useEffect(() => {
    id && dispatch(fetchTeamAction(id))
  }, [id])
  const dispatch = useDispatch()
  const { Id } = useSelector(state => state.teamDetails)
  const team = useSelector(state => state.teamDetails)
  const { rowsPerPage, skip } = usePagination()
  const { asc, field } = useSort('FirstName')
  const { input, header, root, titleClass, container } = useStyle()
  const teamManagers = useSelector(state => state.teamDetails).Managers || []
  const managers = useSelector(state => state.teamDetails).managersList || []
  useEffect(() => {
    dispatch(fetchManagersAction(rowsPerPage, skip, asc, field, ''))
  }, [rowsPerPage, skip, asc, field])
  const removeDuplicates = (globalData, unneededData) => {
    return globalData && unneededData ? globalData?.filter((el) => !unneededData?.find(e => (e?.Id === el?.Id))) : globalData
  }
  const reformedData = removeDuplicates(managers, teamManagers)?.map(element => {
    return {
      id: element.Id,
      Value: `${element.FirstName} ${element.LastName}`
    }
  })
  const { user } = useSelector(({ identity }) => identity)
  const [selectData, setSelectData] = useState({ selectedItemId: 1, selectedItemValue: '', reformedData: reformedData })
  const isAdmin = user?.role?.includes(AdminRole)
  return (
    <div className={root}>
      {isAdmin
        ? (
          <>
            {
              reformedData.length
                ? (
                  <>
                    <div
                      className={header}
                      data-test='add-manager-header'
                    >
                      <Col pos='left' className='col' grid={9}>
                        <TypographyElement
                          component='h3'
                          variant='heading3'
                          align='left'
                          display='flex'
                          className={titleClass}
                        >
                          {Text.addManager}
                        </TypographyElement>
                      </Col>
                    </div>
                    <TeamLogoAndManagers title={team?.Name ? team?.Name : Text.noName} team={team} managers={teamManagers} />
                    <TypographyElement
                      fontSize='12px'
                      lineHeight='16px'
                      spacing='0 0 4px 0'
                    >
                      {Text.managerName}
                    </TypographyElement>
                    <div data-test='add-manager-body'>
                      <Row className={container} justify='left'>
                        <span className={input}>
                          <SelectList
                            id='invite-manager'
                            dataTest='add-manager-select-input'
                            iconDataTest='add-manager-select-icon'
                            items={reformedData}
                            placeholder={Text.allManagers}
                            gutterBottom={16}
                            selectedItem={selectData.selectedItemValue}
                            onSelectedItem={(item) => {
                              setSelectData({
                                ...selectData,
                                selectedItemValue: item.Value,
                                selectedItemId: item.id
                              })
                            }}
                          />
                        </span>
                        <Button
                          dataTest='add-manager-button'
                          disabled={selectData.selectedItemValue === ''}
                          marginButton='24px 0 0 0'
                          handleClick={() => {
                            scrollUp()
                            dispatch(assignManagerAction(id || Id, selectData.selectedItemId))
                            scrollUp()
                            handleClose()
                          }}
                          label={Text.add}
                          width='100%'
                        />
                      </Row>
                    </div>
                  </>)
                : null
            }
          </>)
        : null}
    </div>
  )
}
