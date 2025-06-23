import { createUseStyles } from 'react-jss'
import {
  TypographyElement,
  neutral,
  Paper,
  Icon,
  Icons,
  blue,
  Skeleton
} from '@pro_boa/ui'
import Text from './text.json'
import style from './style'

const useStyles = createUseStyles(style)

export default ({ title, children, width, infoLink = '', download, suivi, noKnowMore = false, loading }) => {
  const {
    paperClass,
    help,
    containerClass,
    textClass,
    buttonClass,
    bigContainerClass,
    paperContainerClass,
    iconButton,
    downloadButton,
    know
  } = useStyles({ width })
  return (
    <div className={paperContainerClass}>
      <Paper className={paperClass}>
        <div className={bigContainerClass}>
          <div className={containerClass}>
            <div className={textClass}>
              {
                loading
                  ? <Skeleton lines={1} height={30} width='100%' />
                  : (
                    <>
                      <TypographyElement
                        variant='heading2'
                        color={neutral[6]}
                        fontWeight='bolder'
                        fontSize='22px'
                        lineHeight='26px'
                      >
                        {title}
                      </TypographyElement>
                      {infoLink
                        ? (
                          <a
                            rel='noopener noreferrer'
                            target='_blank'
                            href={infoLink}
                            className={help}
                          >
                            <TypographyElement
                              fontSize='14px'
                              lineHeight='22px'
                              color={neutral[3]}
                            >
                              {Text.q}
                            </TypographyElement>
                          </a>
                          )
                        : null}
                      <TypographyElement
                        variant='heading2'
                        color={blue[0]}
                        fontWeight='bolder'
                        fontSize='18x'
                        lineHeight='26px'
                        cursor='pointer'
                        className={know}
                        display={noKnowMore ? 'none' : 'flex'}
                      >
                        {Text.knowMore}
                      </TypographyElement>
                    </>
                    )
              }

            </div>
            <div className={buttonClass}>
              {download
                ? (
                  <div className={downloadButton}>
                    <Icon iconName={Icons.download} style={iconButton} />
                    <TypographyElement
                      component='h4'
                      variant='caption1'
                      align='left'
                      color={neutral[6]}
                      fontWeight={500}
                    >
                      {Text.download}
                    </TypographyElement>
                  </div>)
                : suivi
                  ? Text.knowMore
                  : ''}
            </div>
          </div>
          {children}
        </div>
      </Paper>
    </div>
  )
}
