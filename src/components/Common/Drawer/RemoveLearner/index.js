import {
  TypographyElement,
  neutral,
  red,
  Button,
  ButtonVariation
} from '@pro_boa/ui'
import style from './style'
import { createUseStyles } from 'react-jss'
import Text from './text.json'
import LearnerCard from 'components/Common/Cards/LearnerCard'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAction } from 'pages/LearnerProfile/store'
import { scrollUp } from 'helpers'

const useStyle = createUseStyles(style)

export default ({ handleClose, isLearnerProfile, setPage }) => {
  const { Photo, FirstName, LastName, TeamName, HasActiveLicense, Id } = useSelector(({ profile }) => profile)
  const dispatch = useDispatch()
  const {
    container
  } = useStyle()
  return (
    <div className={container}>
      <TypographyElement
        component='h3'
        variant='heading3'
        align='left'
      >
        {Text.title}
      </TypographyElement>
      <LearnerCard Photo={Photo} FirstName={FirstName} LastName={LastName} TeamName={TeamName} />
      <TypographyElement
        fontWeight={600}
        fontSize='16px'
        lineHeight='20px'
        spacing='0px 0px 16px 8px'
        color={HasActiveLicense ? red[3] : neutral[6]}
      >
        {HasActiveLicense ? Text.warning : Text.confirmMessage}
      </TypographyElement>
      <TypographyElement
        fontWeight='bold'
        fontSize='16px'
        lineHeight='20px'
        spacing='0px 0px 0px 8px'
        color={neutral[5]}
      >
        {HasActiveLicense ? Text.warningSecondary : Text.confirmMessageSecondary}
      </TypographyElement>
      {HasActiveLicense
        ? (
          <Button
            handleClick={() => {
              window.Intercom('showNewMessage')
              scrollUp()
              handleClose()
            }}
            width='100%'
            marginButton='32px 0 0 0'
            height={54}
            label={Text.contact}
          />)
        : (
          <>
            <Button
              handleClick={() => {
                scrollUp()
                dispatch(deleteUserAction(isLearnerProfile, [Id]))
                scrollUp()
                handleClose()
              }}
              width='100%'
              marginButton='32px 0 0 0'
              height={54}
              label={Text.confirm}
            />
            <Button
              handleClick={() => {
                scrollUp()
                handleClose()
              }}
              width='100%'
              variation={ButtonVariation.secondary}
              marginButton='16px 0 0 0'
              height={54}
              label={Text.cancel}
            />
          </>)}
    </div>
  )
}
