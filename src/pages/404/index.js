import style from './style'
import { createUseStyles } from 'react-jss'
import Layout from 'components/Common/Layout'
import {
  TypographyElement,
  neutral,
  Icon,
  Icons
} from '@pro_boa/ui'
import { page404 } from 'assets'
import Text from './text.json'
import { salesB2B } from 'constants/'

const useStyle = createUseStyles(style)

export default () => {
  const {
    image,
    imageContainer,
    text,
    contactCard,
    contact,
    icon
  } = useStyle()
  return (
    <Layout>
      <div className={imageContainer}>
        <TypographyElement
          component='h2'
          variant='heading2'
          align='left'
          spacing='104px 0 0 0'
          color={neutral[6]}
        >
          {Text.title}
        </TypographyElement>
        <TypographyElement
          component='h3'
          variant='heading3'
          align='left'
          spacing='0 0 0 0'
          color={neutral[5]}
        >
          {Text.subTitle}
        </TypographyElement>
        <object type='image/svg+xml' data={page404} className={image}>svg-animation</object>
        <div className={text}>
          <TypographyElement
            component='h3'
            variant='heading3'
            align='center'
            spacing='0 0 0 0'
            color={neutral[5]}
          >
            {Text.contactMessage}
          </TypographyElement>
        </div>
        <div className={contactCard}>
          <div className={contact}>
            <Icon iconName={Icons.smartPhone} style={icon} />
            <TypographyElement
              component='h4'
              variant='heading4'
              align='left'
              spacing='17px 0 16px 16px'
              fontWeight='bold'
              color={neutral[5]}
            >
              {salesB2B.SalesPhone}
            </TypographyElement>
          </div>
          <div className={contact}>
            <Icon iconName={Icons.envelope} style={icon} />
            <TypographyElement
              component='h4'
              variant='heading4'
              align='left'
              spacing='17px 0 16px 16px'
              fontWeight='bold'
              color={neutral[5]}
            >
              {salesB2B.SalesEmail}
            </TypographyElement>
          </div>
        </div>
      </div>
    </Layout>
  )
}
