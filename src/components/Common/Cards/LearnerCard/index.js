import {
  TypographyElement,
  Avatar,
  neutral
} from '@pro_boa/ui'
import style from './style'
import { createUseStyles } from 'react-jss'
import { avatarName } from 'helpers'
import { amazonBucket } from 'constants/'
import Text from './text.json'

const useStyle = createUseStyles(style)

export default ({ Photo, FirstName, LastName, TeamName }) => {
  const name = `${FirstName} ${LastName}`
  const {
    learnerCardContainer
  } = useStyle()
  return (
    <div className={learnerCardContainer}>
      <Avatar
        size='size_1'
        name={avatarName(name)}
        img={Photo ? `${amazonBucket.bucketBaseUrl}${Photo}` : null}
      />
      <div>
        <TypographyElement
          fontWeight={800}
          fontSize='16px'
          lineHeight='20px'
          spacing='0px 0px 0px 8px'
          color={neutral[6]}
        >
          {name || ''}
        </TypographyElement>
        <TypographyElement
          fontWeight={600}
          fontSize='16px'
          lineHeight='20px'
          spacing='0px 0px 0px 8px'
          color={neutral[5]}
        >
          {(TeamName && TeamName.length > 16 ? TeamName.slice(0, 16 - 1) + '…' : TeamName) || Text.noTeam}
        </TypographyElement>
      </div>
    </div>
  )
}
