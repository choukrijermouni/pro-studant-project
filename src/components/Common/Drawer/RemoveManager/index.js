import {
  TypographyElement,
  neutral,
  Button,
  ButtonVariation
} from '@pro_boa/ui'
import style from './style'
import { createUseStyles } from 'react-jss'
import Text from './text.json'
import LearnerCard from '../LearnerCard'
import { scrollUp } from 'helpers'

const useStyle = createUseStyles(style)

export default ({ setOpenRemoveModal, handleSubmit, FirstName, LastName, teams }) => {
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
      <LearnerCard
        FirstName={FirstName}
        LastName={LastName}
        TeamName={teams}
      />
      <TypographyElement
        fontWeight={600}
        fontSize='16px'
        lineHeight='20px'
        spacing='0px 0px 16px 8px'
        color={neutral[6]}
      >
        {Text.confirmMessage}
      </TypographyElement>
      <TypographyElement
        fontWeight={600}
        fontSize='16px'
        lineHeight='20px'
        spacing='0px 0px 0px 8px'
        color={neutral[5]}
      >
        {Text.confirmMessageSecondary}
      </TypographyElement>
      <Button
        handleClick={() => {
          scrollUp()
          handleSubmit()
          setOpenRemoveModal(false)
        }}
        width='100%'
        marginButton='32px 0 0 0'
        height={54}
        label={Text.confirm}
      />
      <Button
        handleClick={() => {
          setOpenRemoveModal(false)
        }}
        width='100%'
        variation={ButtonVariation.secondary}
        marginButton='16px 0 0 0'
        height={54}
        label={Text.cancel}
      />
    </div>
  )
}
