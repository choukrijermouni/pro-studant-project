import {
  Row,
  Button,
  TextInput,
  SelectList
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { AdminRole } from 'constants/'
import { useDispatch, useSelector } from 'react-redux'
import { validateLearner } from 'helpers/validator'
import { useFormik } from 'formik'
import { createLearnerAction } from 'pages/Learners/store'
import { useState } from 'react'

const useStyle = createUseStyles(style)

const labelStyle = {
  component: 'h4',
  variant: 'smallText',
  align: 'left',
  spacing: '0 0 4px 0',
  fontWeight: 'bold'
}

export default ({ selectedLicense, handleClose, teams, quantityButton }) => {
  const dispatch = useDispatch()
  const {
    row
  } = useStyle()
  const { user } = useSelector(({ identity }) => identity)
  const [selectData, setSelectData] = useState({ selectedItemId: null, selectedItemValue: '' })
  const { handleSubmit, handleChange, resetForm, handleBlur, touched, errors, values } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: ''
    },
    validate: validateLearner,
    onSubmit: (values) => {
      dispatch(createLearnerAction(values.firstName, values.lastName, values.email, selectData?.selectedItemId, selectedLicense, quantityButton))
      resetForm()
      handleClose()
    },
    enableReinitialize: true
  })
  if (!user?.role?.includes(AdminRole)) return null
  return (
    <Row>
      <Row className={row}>
        <TextInput
          id='firstName'
          label={Text.firstName}
          value={values.firstName}
          type='text'
          placeholder={Text.firstName}
          status={(errors.firstName && touched.firstName) && 'error'}
          gutterBottom={8}
          typography={labelStyle}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <TextInput
          id='lastName'
          label={Text.lastName}
          type='text'
          placeholder={Text.lastName}
          value={values.lastName}
          status={(errors.lastName && touched.lastName) && 'error'}
          gutterBottom={8}
          typography={labelStyle}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <TextInput
          id='email'
          label={Text.email}
          type='text'
          placeholder={Text.email}
          value={values.email}
          status={(errors.email && touched.email) && 'error'}
          gutterBottom={16}
          typography={labelStyle}
          handleChange={handleChange}
          handleBlur={handleBlur}
          message={(errors.email && touched.email) && errors.email}
        />
        <SelectList
          id='SelectTeam'
          label={Text.label.team}
          items={teams}
          placeholder={Text.placeholderTeams}
          typography={{ fontSize: 12, spacing: '0 0 4px' }}
          selectedItem={selectData?.selectedItemValue}
          gutterBottom={20}
          onSelectedItem={(item) => {
            setSelectData({
              selectedItemValue: item.Value,
              selectedItemId: item.Id
            })
          }}
        />
        <Button
          dataTest='create-team-button'
          disabled={!values || !selectData?.selectedItemValue || !quantityButton}
          label={Text.createTeam}
          width='100%'
          handleClick={handleSubmit}
        />
      </Row>
    </Row>
  )
}
