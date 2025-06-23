import { createUseStyles } from 'react-jss'
import style from './style'
import { Paper, TypographyElement, Avatar, neutral, Icon, Icons } from '@pro_boa/ui'
import { avatarName } from 'helpers'
import moment from 'moment'
import { DMYDateFormat, amazonBucket } from 'constants/'
import Text from './text.json'

export default ({ padding, margin, Data = [], handleClick }) => {
  const useStyle = createUseStyles(style)
  const { row, card, icon, avatarContainer, fontStyle, flex, emailCard } = useStyle({ padding, margin })
  return (
    <Paper className={row}>
      <div className={flex} onClick={handleClick}>
        <div className={fontStyle}>
          <div className={avatarContainer}>
            <Avatar
              img={Data?.Photo
                ? `${amazonBucket.bucketBaseUrl}${Data?.Photo}`
                : null}
              name={avatarName(`${Data?.FirstName} ${Data?.LastName}`)}
              size='size_1'
            />
          </div>
          <TypographyElement
            component='h3'
            variant='heading3'
            align='left'
            fontSize={16}
            spacing='20px'
            color={neutral[6]}
          >
            {Data?.FirstName} {Data?.LastName}
          </TypographyElement>
        </div>
        <div title={Text.creation} className={card}>
          <Icon iconName={Icons.calendar} style={icon} />
          <TypographyElement
            component='h4'
            variant='caption1'
            align='left'
            spacing='10px 16px 11px 16px'
            color={neutral[4]}
          >
            {Data?.CreationDate ? moment(Data?.CreationDate).format(DMYDateFormat) : Text.none}
          </TypographyElement>
        </div>
        <div title={Text.lastConnection} className={card}>
          <Icon iconName={Icons.lastUserLogin} style={icon} />
          <TypographyElement
            component='h4'
            variant='caption1'
            align='left'
            spacing='10px 16px 11px 16px'
            color={neutral[4]}
          >
            {Data?.LastConnectionDate ? moment(Data?.LastConnectionDate).format(DMYDateFormat) : Text.none}
          </TypographyElement>
        </div>
        <div title={Text.email} className={emailCard}>
          <Icon iconName={Icons.envelope} style={icon} />
          <TypographyElement
            component='h4'
            variant='caption1'
            align='left'
            spacing='10px 16px 11px 16px'
            color={neutral[4]}
          >
            {Data?.Email}
          </TypographyElement>
        </div>
      </div>
    </Paper>
  )
}
