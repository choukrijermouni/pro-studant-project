import {
  TypographyElement,
  Button,
  Col,
  SelectList,
  TextInput
} from '@pro_boa/ui'
import { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { useDispatch, useSelector } from 'react-redux'
import { validateInviteManagerEmail } from 'helpers/validator'
import { fetchAllTeamsAction } from 'pages/Teams/store'
import { useFormik } from 'formik'
import { inviteManagerToTeamAction } from 'pages/Manager/store'
import { scrollUp } from 'helpers'

const useStyle = createUseStyles(style)

export default ({ handleClose }) => {
  const { input, root, header, textarea } = useStyle()
  const dispatch = useDispatch()
  const { isManager, Id } = useSelector(({ organizationProfile }) => organizationProfile)
  useEffect(() => {
    dispatch(fetchAllTeamsAction(isManager ? Id : null))
  }, [])
  const { allTeams } = useSelector(state => state.teams)

  const [teams, setTeams] = useState([])
  const [selectData, setSelectData] = useState({ selectedItemId: null, selectedItemValue: '' })
  useEffect(() => {
    const reformedData = allTeams?.Items?.map(element => {
      element.Value = element.Name
      return element
    })
    setTeams(reformedData)
  }, [allTeams])

  const { handleChange, handleBlur, touched, errors, values, isValid, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: {
      inviteEmail: ''
    },
    validate: () => validateInviteManagerEmail(values),
    onSubmit: (values) => {
      scrollUp()
      dispatch(inviteManagerToTeamAction(values.inviteEmail, selectData?.selectedItemId))
      handleClose()
    }
  })
  return (
    <div className={root}>
      <div className={header}>
        <Col pos='left' className='col' grid={9}>
          <TypographyElement
            component='h3'
            variant='heading3'
            align='left'
          >
            {Text.titleInvite}
          </TypographyElement>
        </Col>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={input}>
          <TypographyElement
            variant='body1'
            fontSize='12px'
            lineHeight='18px'
            margin='0 0 4px'
          >
            {Text.label.email}
          </TypographyElement>
          <TextInput
            textareaClassName={textarea}
            type='text'
            placeholder={Text.placeholder}
            value={values.inviteEmail}
            name='inviteEmail'
            status={(errors.inviteEmail && touched.inviteEmail) && 'error'}
            message={errors.inviteEmail && touched.inviteEmail ? errors.inviteEmail : ''}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        </div>
        <span className={input}>
          <TypographyElement
            variant='body1'
            fontSize='12px'
            lineHeight='18px'
            margin='0 0 4px'
          >
            {Text.label.team}
          </TypographyElement>
          <SelectList
            id='SelectTeam'
            items={teams}
            placeholder={Text.selectTeam}
            selectedItem={selectData?.selectedItemValue}
            gutterBottom={16}
            onSelectedItem={(item) => {
              setSelectData({
                selectedItemValue: item.Value,
                selectedItemId: item.Id
              })
            }}
          />
        </span>
        <Button
          marginButton='24px 0 0 0'
          label={Text.download}
          width='100%'
          disabled={!selectData?.selectedItemValue || !isValid}
          type='submit'
        />
      </form>
    </div>
  )
}
