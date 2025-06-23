import {
  Row,
  TypographyElement,
  Button,
  Col,
  TextArea,
  TextInput
} from '@pro_boa/ui'
import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { teams, AdminRole } from 'constants/'
import { useDispatch, useSelector } from 'react-redux'
import { addTeamAction } from 'pages/Teams/store'
import { scrollUp } from 'helpers'

const useStyle = createUseStyles(style)

export default ({ handleClose }) => {
  const dispatch = useDispatch()
  const {
    root,
    flex,
    textArea,
    avatars,
    invitesBox,
    container,
    overlay,
    disabled,
    titleClass,
    header,
    row
  } = useStyle()
  const [selected, setSelected] = useState(teams[0])
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')
  const { user } = useSelector(({ identity }) => identity)
  return (
    <div className={root}>
      {
        user?.role?.includes(AdminRole)
          ? (
            <>
              <div className={header}>
                <Col pos='left' className='col' grid={9}>
                  <TypographyElement
                    component='h3'
                    variant='heading3'
                    align='left'
                    display='flex'
                    className={titleClass}
                  >
                    {Text.suivi}
                  </TypographyElement>
                </Col>
              </div>
              <Row>
                <Row className={row}>
                  <div className={container}>
                    <TypographyElement
                      variant='body1'
                      fontSize='12px'
                      lineHeight='18px'
                      margin='24px 0 8px 0'
                    >
                      {Text.subHeader}
                    </TypographyElement>
                    <div className={invitesBox}>
                      <div className={avatars}>
                        {teams.map((element, id) =>
                          <div key={id} className={flex} data-test={`team-avatar-${id}`}>
                            <img
                              id={id}
                              src={element}
                              alt='teamTag'
                            />
                            <div
                              id={element}
                              className={selected === element ? disabled : overlay}
                              onClick={(e) => setSelected(e.target.id)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <TypographyElement
                        variant='body1'
                        fontSize='12px'
                        lineHeight='18px'
                        margin='24px 0 4px 0'
                      >
                        {Text.teamName}
                      </TypographyElement>
                      <TextInput
                        dataTest='team-name-input'
                        label=''
                        value={value}
                        handleChange={(e) => setValue(e.target.value)}
                        id='1'
                        type='text'
                        placeholder={Text.teamName}
                      />
                      <TypographyElement
                        variant='body1'
                        fontSize='12px'
                        lineHeight='18px'
                        margin='24px 0 4px 0'
                      >
                        {Text.description}
                      </TypographyElement>
                      <TextArea
                        dataTest='team-description-input'
                        label=''
                        textareaClassName={textArea}
                        id='1'
                        type='text'
                        placeholder={Text.description}
                        value={description}
                        handleChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    dataTest='create-team-button'
                    disabled={!value}
                    label={Text.createTeam}
                    width='100%'
                    handleClick={() => {
                      dispatch(addTeamAction(value, description, selected))
                      handleClose()
                      scrollUp()
                    }}

                  />
                </Row>
              </Row>
            </>)
          : null
      }
    </div>
  )
}
