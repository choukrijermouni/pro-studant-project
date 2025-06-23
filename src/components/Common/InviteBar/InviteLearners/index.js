import {
  Row,
  TypographyElement,
  TextArea,
  neutral,
  Icon,
  Icons,
  Col,
  Status
} from '@pro_boa/ui'
import { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { help } from 'assets'
import InviteModal from 'components/Common/InviteBar/InviteModal/InviteModalContainer'
import { helpLinks, AdminRole } from 'constants/'
import validate from './validator'
import { useSelector } from 'react-redux'

const useStyle = createUseStyles(style)

export default () => {
  const { header, invites, icon, root, messageContainer, pointer, slidIn, slidOut, helpIconClass } = useStyle()
  const [arrowInvite, setArrowInvite] = useState(true)
  const [learnersEmail, setLearnersEmail] = useState('')
  const [error, setError] = useState(null)
  useEffect(async () => await validate(learnersEmail, setError), [learnersEmail])
  const editEmails = (learners = []) => {
    setLearnersEmail(learners.join('\n'))
  }
  const { user } = useSelector(({ identity }) => identity)
  return (
    user?.role?.includes(AdminRole)
      ? (
        <div className={root}>
          <div className={pointer} onClick={() => setArrowInvite(!arrowInvite)}>
            <Row className={header}>
              <Col pos='left' grid={9}>
                <TypographyElement
                  component='h3'
                  variant='heading3'
                  align='left'
                >
                  {Text.invite}
                </TypographyElement>
              </Col>
              <Col pos='right' grid={3}>
                {
                  arrowInvite
                    ? <Icon iconName={Icons.roundedUp} style={icon} handleIconClick={() => setArrowInvite(!arrowInvite)} />
                    : <Icon iconName={Icons.roundedDown} style={icon} handleIconClick={() => setArrowInvite(!arrowInvite)} />
                }
              </Col>
            </Row>
          </div>
          <Row className={arrowInvite ? slidIn : slidOut}>
            <TextArea
              dataTest='invite-learners-textArea'
              ErrorMessageDataTest='invite-learners-textArea-error-message'
              label=''
              value={learnersEmail}
              handleChange={(e) => setLearnersEmail(e.target.value)}
              textareaClassName={invites}
              id='1'
              type='text'
              placeholder={Text.placeholder}
              status={learnersEmail.length && error ? Status.error : null}
              message={error || null}
            />
            <InviteModal
              editEmails={editEmails}
              learnersEmail={learnersEmail}
              disableSubmit={learnersEmail.length === 0 || error}
            />
            <a className={messageContainer} href={helpLinks.learners} target='_blank' rel='noopener noreferrer'>
              <img src={help} alt='helpIcon' className={helpIconClass} />
              <TypographyElement
                component='h4'
                variant='smallText'
                align='left'
                spacing='30px 0 30px 10px'
                color={neutral[3]}
              >
                {Text.inviteMessage}
              </TypographyElement>
            </a>
          </Row>
        </div>
        )
      : null
  )
}
