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
import { detachManagerAction } from 'pages/TeamDetails/store'
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
  const { organizationId } = useSelector(state => state.organization)
  useEffect(() => {
    dispatch(fetchManagersAction(rowsPerPage, skip, asc, field, ''))
  }, [rowsPerPage, skip, asc, field])
  const reformedDetachData = teamManagers?.filter(element => !element.InvitationId).map(element => {
    return {
      id: element.Id,
      Value: `${element.FirstName} ${element.LastName}`
    }
  })
  const { user } = useSelector(({ identity }) => identity)
  const [selectDetachData, setSelectDetachData] = useState({ selectedDetachItemId: 1, selectedDetachItemValue: '', reformedDetachData: reformedDetachData })
  const isAdmin = user?.role?.includes(AdminRole)
  return (
    <div className={root}>
      {isAdmin
        ? (
          <>
            {reformedDetachData?.length
              ? (
                <>
                  <div
                    data-test='detach-manager-header'
                    className={header}
                  >
                    <Col pos='left' className='col' grid={9}>
                      <TypographyElement
                        component='h4'
                        variant='heading3'
                        align='left'
                        display='flex'
                        className={titleClass}
                      >
                        {Text.removeManager}
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
                  <div
                    data-test='detach-manager-body'
                  >
                    <Row className={container} justify='left'>
                      <span className={input}>
                        <SelectList
                          id='detach-manager-select-input'
                          dataTest='detach-manager-select-input'
                          iconDataTest='detach-manager-select-icon'
                          items={reformedDetachData}
                          placeholder={Text.allManagers}
                          gutterBottom={16}
                          selectedItem={selectDetachData.selectedDetachItemValue}
                          onSelectedItem={(item) => {
                            setSelectDetachData({
                              ...selectDetachData,
                              selectedDetachItemValue: item.Value,
                              selectedDetachItemId: item.id
                            })
                          }}
                        />
                      </span>
                      <Button
                        dataTest='detach-manager-button'
                        disabled={selectDetachData.selectedDetachItemValue === ''}
                        marginButton='24px 0 0 0'
                        handleClick={() => {
                          scrollUp()
                          dispatch(detachManagerAction(organizationId, Id, selectDetachData.selectedDetachItemId))
                          scrollUp()
                          handleClose()
                        }}
                        label={Text.remove}
                        width='100%'
                      />
                    </Row>
                  </div>
                </>)
              : null}
          </>)
        : null}
    </div>
  )
}
