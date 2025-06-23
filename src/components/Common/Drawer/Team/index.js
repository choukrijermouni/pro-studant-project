import {
  Row,
  TypographyElement,
  Button,
  Col,
  SelectList,
  red,
  TextInput,
  usePagination,
  useSort
} from '@pro_boa/ui'
import { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTeamAction } from 'pages/Teams/store'
import style from './style'
import Text from './text.json'
import { useParams } from 'react-router-dom'
import { inviteManagerToTeamAction, fetchManagersAction } from 'pages/Manager/store'
import DeleteTeamModal from 'components/DeleteTeamModal'
import { assignManagerAction, detachManagerAction } from 'pages/TeamDetails/store'
import { useFormik } from 'formik'
import { validateInviteManagerEmail } from 'helpers/validator'
import { AdminRole } from 'constants/'
import { TurnOnLoaderAction } from 'store/config'

const useStyle = createUseStyles(style)

export default () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { rowsPerPage, skip } = usePagination()
  const { asc, field } = useSort('FirstName')
  const { input, textarea, area, header, slidOut, root, titleClass, container } = useStyle()
  const teamManagers = useSelector(state => state.teamDetails).Managers || []
  const managers = useSelector(state => state.teamDetails).managersList || []
  const { organizationId } = useSelector(state => state.organization)
  const { handleChange: onFormikHandleChange, handleBlur: onFormikHandleBlur, touched, errors, values, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: {
      inviteEmail: ''
    },
    validate: () => validateInviteManagerEmail(values),
    onSubmit: (values) => {
      dispatch(inviteManagerToTeamAction(values.inviteEmail, id))
    }
  })
  useEffect(() => {
    dispatch(TurnOnLoaderAction())
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
  const reformedDetachData = teamManagers?.map(element => {
    return {
      id: element.Id,
      Value: `${element.FirstName} ${element.LastName}`
    }
  })
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useSelector(({ identity }) => identity)
  const [selectData, setSelectData] = useState({ selectedItemId: 1, selectedItemValue: '', reformedData: reformedData })
  const [selectDetachData, setSelectDetachData] = useState({ selectedDetachItemId: 1, selectedDetachItemValue: '', reformedDetachData: reformedDetachData })
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
                    <div
                      data-test='add-manager-body'
                    >
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
                          handleClick={() => dispatch(assignManagerAction(id, selectData.selectedItemId))}
                          label={Text.add}
                          width='100%'
                        />
                      </Row>
                    </div>
                  </>)
                : null
            }
            {reformedDetachData?.length
              ? (
                <>
                  <div
                    data-test='detach-manager-header'
                    className={header}
                  >
                    <Col pos='left' className='col' grid={9}>
                      <TypographyElement
                        component='h3'
                        variant='heading3'
                        align='left'
                        display='flex'
                        className={titleClass}
                      >
                        {Text.removeManager}
                      </TypographyElement>
                    </Col>
                  </div>
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
                          handleChange={(e) => setSelectDetachData({
                            ...selectDetachData,
                            selectedDetachItemValue: e.target.value,
                            toggleSuggestionList: (e.target.value !== '')
                          })}
                        />
                      </span>
                      <Button
                        dataTest='detach-manager-button'
                        disabled={selectDetachData.selectedDetachItemValue === ''}
                        marginButton='24px 0 0 0'
                        handleClick={() => dispatch(detachManagerAction(organizationId, id, selectDetachData.selectedDetachItemId))}
                        label={Text.remove}
                        width='100%'
                      />
                    </Row>
                  </div>
                </>)
              : null}
            <div
              className={header}
              data-test='invite-manager-header'
            >
              <Col pos='left' className='col' grid={9}>
                <TypographyElement
                  component='h3'
                  variant='heading3'
                  align='left'
                  display='flex'
                  className={titleClass}
                >
                  {Text.titleInvite}
                </TypographyElement>
              </Col>
            </div>
            <Row className={slidOut} justify='left'>
              <div
                className={container}
                data-test='invite-manager-body'
              >
                <form onSubmit={handleSubmit}>
                  <div className={input}>
                    <TextInput
                      dataTest='invite-manager-email-input'
                      ErrorMessageDataTest='manager-email-input-error'
                      label=''
                      textareaClassName={textarea}
                      id='1'
                      type='text'
                      placeholder={Text.placeholder}
                      value={values.inviteEmail}
                      name='inviteEmail'
                      status={(errors.inviteEmail && touched.inviteEmail) && 'error'}
                      message={errors.inviteEmail && touched.inviteEmail ? errors.inviteEmail : ''}
                      handleChange={onFormikHandleChange}
                      handleBlur={onFormikHandleBlur}
                    />
                  </div>
                  <Button
                    dataTest='invite-manager-button'
                    marginButton='24px 0 0 0'
                    label={Text.invite}
                    width='100%'
                    handleClick={handleSubmit}
                    disabled={!values.inviteEmail}
                  />
                </form>
              </div>
            </Row>
            {
              user?.role?.includes(AdminRole) &&
              (
                <>
                  <div
                    className={area}
                    data-test='delete-team-button'
                  >
                    <TypographyElement
                      component='h4'
                      variant='smallText'
                      align='left'
                      spacing='20px 0 30px 24px'
                      color={red[3]}
                      cursor='pointer'
                      handleClick={() => setIsOpen(true)}
                    >
                      {Text.deleteMessage}
                    </TypographyElement>
                  </div>
                  <DeleteTeamModal
                    openModal={isOpen}
                    handleClose={() => setIsOpen(false)}
                    handleSubmit={() => {
                      dispatch(deleteTeamAction(id))
                      setIsOpen(false)
                    }}
                  />
                </>)
            }
          </>)
        : null}
    </div>
  )
}
