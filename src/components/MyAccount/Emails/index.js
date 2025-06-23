import {
  Row,
  TypographyElement,
  neutral,
  SelectList,
  Button,
  CheckBox
} from '@pro_boa/ui'
import style from './style'
import Text from './text.json'
import { createUseStyles } from 'react-jss'
import { useState } from 'react'

const useStyle = createUseStyles(style)

const dayRanges = [
  { Id: 1, Name: 'Chaque lundi à 17h00' },
  { Id: 2, Name: 'Chaque mardi à 17h00' },
  { Id: 3, Name: 'Chaque mercredi à 17h00' },
  { Id: 4, Name: 'Chaque jeudi à 17h00' },
  { Id: 5, Name: 'Chaque samedi à 17h00' },
  { Id: 6, Name: 'Chaque vendredi à 17h00' }
]

export default () => {
  const {
    rootClass,
    checkBox,
    containerStyle
  } = useStyle()
  const userDr = dayRanges.find(dr => dr.Id === 6)
  const [userDayRange, setDayRanges] = useState(userDr ? { Id: userDr.Id, Name: userDr.Name } : { Id: 0, Name: '' })
  return (
    <>
      <TypographyElement
        variant='heading2'
        fontSize='16px'
        lineHeight='16px'
        color={neutral[6]}
        spacing='24px 0 24px 0'
      >
        {Text.rapport}
      </TypographyElement>
      <div className={rootClass}>
        <Row className={containerStyle}>
          <SelectList
            valueField='Name'
            items={dayRanges}
            selectedItem={userDayRange.Name}
            onSelectedItem={(item) => {
              setDayRanges(item)
            }}
            gutterBottom={16}
          />
          <TypographyElement
            variant='heading2'
            fontSize='16px'
            lineHeight='16px'
            color={neutral[6]}
            spacing='39px 0 24px 0'
          >
            {Text.newsletter}
          </TypographyElement>
          <CheckBox className={checkBox} label={Text.oneTime} id='newsLetter' />
        </Row>
        <Row>
          <Button label={Text.save} width='200px' />
        </Row>
      </div>
    </>
  )
}
