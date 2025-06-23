import { createUseStyles } from 'react-jss'
import style from './style'
import { DataTable, Avatar, neutral, TypographyElement, Container, Icon, Icons } from '@pro_boa/ui'
import history from 'mock/history'
import Text from './text.json'
import Data from 'mock/profile.js'
import { avatarName } from 'helpers'

export default () => {
  const useStyle = createUseStyles(style)
  const { conainerClass, textClass, dot, userContainer, buttonClass, help, avatarContainer, icon } = useStyle()
  return (
    <div>
      <Container>
        <div className={userContainer}>
          <div className={avatarContainer}>
            <div className={dot} />
            <Avatar img={Data.image} name={avatarName(Data.name)} size='size_3' />
          </div>
          <TypographyElement
            variant='heading2'
            color={neutral[6]}
            fontWeight='bolder'
            fontSize='29px'
            lineHeight='36px'
            spacing='0 0 0 16px'
          >
            {Data.name}
          </TypographyElement>
        </div>
        <div className={conainerClass}>
          <div className={textClass}>
            <TypographyElement
              variant='heading2'
              color={neutral[6]}
              fontWeight='bolder'
              fontSize='22px'
              lineHeight='26px'
            >
              {Text.title}
            </TypographyElement>
            <div className={help}>
              <TypographyElement
                fontSize='14px'
                lineHeight='22px'
                color={neutral[3]}
              >
                {Text.q}
              </TypographyElement>
            </div>
          </div>
          <div className={buttonClass}>
            <Icon iconName={Icons.download} style={icon} />
            <TypographyElement
              color={neutral[4]}
              fontWeight='bolder'
              fontSize='14px'
              lineHeight='18px'
              spacing='0 0 0 8px'
            >
              {Text.export}
            </TypographyElement>
          </div>
        </div>
        <DataTable
          data={history}
          config={{
            columns: [
              { property: 'date', title: 'Date/heure' },
              { property: 'accessType', title: 'Type d\'accès' },
              { property: 'place', title: 'Emplacement' },
              { property: 'time', title: 'Durée' }
            ]
          }}
        />
      </Container>

    </div>
  )
}
