import {
  TypographyElement,
  Row,
  Button,
  ButtonVariation,
  ButtonSize
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { congratulations } from 'assets'
import { useDispatch, useSelector } from 'react-redux'
import { updateLearnersAfterInviteAction } from 'pages/Learners/store'

const useStyles = createUseStyles(style)
export default ({ closeModal }) => {
  const dispatch = useDispatch()
  const { modal, line, image } = useStyles()
  const LastName = useSelector(({ identity }) => identity?.user?.family_name)
  return (
    <div>
      <div className={modal}>
        <img className={image} src={congratulations} alt='congratulations' />
        <TypographyElement
          textAlign='center'
          component='h1'
          align='center'
          variant='heading1'
          spacing='0 0 30px 0'
          style={{ textAlign: 'center' }}
        >
          {Text.part1}{LastName}{Text.part2}
        </TypographyElement>
        <hr className={line} />
        <Row className='row' justify='right'>
          <div className='content_2'>
            <Button
              dataTest='close-modal-button'
              variation={ButtonVariation.primary}
              size={ButtonSize.big}
              width={153}
              height={54}
              handleClick={() => {
                closeModal()
                dispatch(updateLearnersAfterInviteAction())
              }}
              label={Text.button}
            />
          </div>
        </Row>
      </div>
    </div>
  )
}
