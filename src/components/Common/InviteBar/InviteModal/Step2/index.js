import {
  TypographyElement,
  SearchInput,
  Avatar,
  AvatarSize,
  Button,
  ButtonVariation,
  ButtonSize
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { avatarName } from 'helpers'
import { useState } from 'react'

const useStyles = createUseStyles(style)
export default ({ learners, cancelEdit, editEmails, closeModal }) => {
  const {
    modal,
    licenseButtons,
    line,
    emailsBox,
    emailRow,
    alignAvatar
  } = useStyles()
  const [email, setEmail] = useState(learners)
  const [searchValue, setSearchValue] = useState('')
  const [filterEmail, setFilterEmail] = useState([])
  const deleteLearner = (targetEmail) => {
    const filteredEmails = email.filter(element => element !== targetEmail)
    setEmail(filteredEmails)
    setSearchValue('')
    setFilterEmail([])
  }
  return (
    <div className={modal}>
      <TypographyElement
        component='h3'
        variant='heading3'
        align='left'
        spacing='60px 0 20px 0'
      >
        {Text.header}
      </TypographyElement>
      <SearchInput
        placeHolder=''
        id='unique_ID_1'
        height={54}
        value={searchValue}
        handleChange={
          (value) => {
            setSearchValue(value)
            setFilterEmail(email.filter(element => element.toLowerCase().search(value.toLowerCase()) >= 0))
          }
        }
      />
      <div className={emailsBox}>
        {
          (searchValue.length || filterEmail.length ? filterEmail : email).map((element, key) =>
            <div key={key} className={emailRow}>
              <div className={alignAvatar}>
                <Avatar
                  img={null}
                  name={avatarName(element)}
                  size={AvatarSize.size_1}
                />
                <TypographyElement
                  component='h4'
                  variant='caption1'
                  align='left'
                  spacing='0 0 0 12px'
                >
                  {element}
                </TypographyElement>
              </div>
              <Button
                variation={ButtonVariation.secondary}
                size={ButtonSize.big}
                height={31}
                width={115}
                label='Retirer'
                handleClick={() => deleteLearner(element)}
              />
            </div>
          )
        }
      </div>
      <hr className={line} />
      <div className={licenseButtons}>
        <Button
          variation={ButtonVariation.secondary}
          size={ButtonSize.big}
          width={153}
          height={54}
          handleClick={cancelEdit}
          label={Text.abortButton}
        />
        <Button
          disabled={!learners.length}
          variation={ButtonVariation.primary}
          size={ButtonSize.big}
          width={153}
          height={54}
          handleClick={() => {
            editEmails(email)
            if (email.length === 0) closeModal()
            cancelEdit()
          }}
          label={Text.confirmButton}
        />
      </div>
    </div>
  )
}
