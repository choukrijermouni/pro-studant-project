import {
  Paper,
  TypographyElement,
  neutral
} from '@pro_boa/ui'
import classNames from 'classnames'
import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
const useStyles = createUseStyles(style)

export default ({ cardIcon, context, cardColor, width }) => {
  const [active, setActive] = useState(true)
  const { userIcon, paper, icon, text, textActive } = useStyles({ cardColor, width })
  return (
    <div onClick={() => setActive(!active)}>
      <Paper className={paper}>
        <div className={icon}>
          <img src={cardIcon} alt='logo' className={userIcon} />
        </div>
        <div className={classNames(active && textActive, text)}>
          {active &&
            <TypographyElement
              component='h4'
              variant='heading4'
              align='left'
              spacing='50px 24px'
              color={active ? cardColor : neutral[0]}
            >
              {context?.title}
            </TypographyElement>}
          {!active &&
            <div>
              <TypographyElement
                component='h4'
                variant='heading4'
                align='left'
                spacing='21px 24px 0'
                color={active ? cardColor : neutral[0]}
              >
                {context.title}
              </TypographyElement>
              <TypographyElement
                component='h4'
                variant='heading4'
                align='left'
                fontWeight={200}
                spacing='8px 24px 21px'
                color={neutral[0]}
              >
                {context.body}
              </TypographyElement>
            </div>}
        </div>
      </Paper>
    </div>
  )
}
