import { createUseStyles } from 'react-jss'
import style from './style'
import classNames from 'classnames'
import {
  Icons,
  Spacing,
  typographyTypes,
  neutral,
  Icon,
  TypographyElement,
  ProgressionRing,
  Button,
  Skeleton
} from '@pro_boa/ui'
import { formatMinutesDuration } from 'helpers'
import Text from './text.json'
import moment from 'moment'

const useStyle = createUseStyles(style)

export default ({ children, isHome, screen, downloadCertificate, ...props }) => {
  const scale = window.devicePixelRatio
  const {
    cardGroup,
    infosAndActions,
    CardInfo,
    titleAndCartLabel,
    CardTitle,
    infos,
    ratingText,
    users,
    userIcon,
    userText,
    time,
    clockIcon,
    clockText,
    CardImage,
    progressionRing,
    skeletonImageContainer,
    homeUsers,
    homeTime
  } = useStyle(props)
  return (
    <div className={classNames(cardGroup, props.className)} onClick={props.onCardClick}>
      {
        props.loading
          ? <div className={skeletonImageContainer}><Skeleton line={1} height={80} width={171} /></div>
          : <div className={CardImage} />
      }
      <div className={infosAndActions}>
        <div className={CardInfo}>
          {
            props.loading
              ? <Skeleton lines={1} height={20} width='80%' />
              : (
                <>
                  <div className={titleAndCartLabel}>
                    <TypographyElement
                      fontSize='16px'
                      fontWeight='700'
                      lineHeight='20px'
                      variant={typographyTypes.heading4}
                      margin={Spacing(0, 3, 0, 0)}
                      align='left'
                      display='-webkit-box'
                      className={CardTitle}
                    >{props.title}
                    </TypographyElement>
                  </div>
                </>
                )
          }
          {
            props.subtitle
              ? (
                <div className={infos}>
                  <TypographyElement
                    color={neutral[5]}
                    fontSize='16px'
                    fontWeight={600}
                    lineHeight='20px'
                    variant={typographyTypes.smallText}
                    className={ratingText}
                  >{props.subtitle}
                  </TypographyElement>
                </div>)
              : isHome
                ? (
                  <div className={infos}>
                    <div className={homeUsers}>
                      {
                        props.loading
                          ? <Skeleton lines={1} height={20} width='80%' />
                          : (
                            <>
                              <Icon iconName={Icons.user} style={clockIcon} />
                              <TypographyElement
                                fontSize={scale > 1 ? '12px' : '16px'}
                                fontWeight={400}
                                lineHeight='15px'
                                variant={typographyTypes.smallText}
                                color={neutral[5]}
                                className={userText}
                                margin={Spacing(0, 3, 0, 0)}
                              >{props.trainerName}
                              </TypographyElement>
                            </>
                            )
                      }

                    </div>
                    <div title={Text.certificationDate} className={homeTime}>
                      {
                        props.loading
                          ? <Skeleton lines={1} height={20} width='100%' />
                          : (
                            <>
                              <Icon iconName={Icons.lastUserLogin} style={userIcon} />
                              <TypographyElement
                                fontSize={scale > 1 ? '12px' : '16px'}
                                fontWeight={400}
                                lineHeight='15px'
                                variant={typographyTypes.smallText}
                                color={neutral[5]}
                                className={clockText}
                              >{moment(props.uploadDate, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                              </TypographyElement>
                            </>
                            )
                      }

                    </div>
                  </div>)
                : (
                  <div className={infos}>
                    <div title={Text.lastConnection} className={users}>
                      {
                        props.loading
                          ? <Skeleton lines={1} height={20} width='80%' />
                          : (
                            <>
                              <Icon iconName={Icons.user} style={userIcon} />
                              <TypographyElement
                                fontSize='16px'
                                fontWeight={400}
                                lineHeight='15px'
                                variant={typographyTypes.smallText}
                                color={neutral[5]}
                                className={userText}
                              >{moment(props.uploadDate).format('DD/MM/YYYY')}
                              </TypographyElement>
                            </>
                            )
                      }

                    </div>
                    <div title={Text.duration} className={time}>
                      {
                        props.loading
                          ? <Skeleton lines={1} height={20} width='80%' />
                          : (
                            <>
                              <Icon iconName={Icons.clock} style={clockIcon} />
                              <TypographyElement
                                fontSize='16px'
                                fontWeight={400}
                                lineHeight='15px'
                                variant={typographyTypes.smallText}
                                color={neutral[5]}
                                className={clockText}
                              >{formatMinutesDuration(props.duration)}
                              </TypographyElement>
                            </>
                            )
                      }

                    </div>
                  </div>)
          }
        </div>
        {!isHome && (
          <div className={props.childrenClassName}>
            {props.progress !== 100
              ? (
                <>
                  <div className={progressionRing}>
                    {
                      props.loading
                        ? <Skeleton lines={1} height={30} width={200} />
                        : (
                          <>
                            <ProgressionRing
                              radius={16}
                              stroke={2}
                              color='#3767DA'
                              backgroundColor='#C8D5E2'
                              progress={props.progress}
                            >
                              <TypographyElement
                                variant='heading4'
                                weight='semibold'
                                align='center'
                                fontSize='10px'
                                color='#3767DA'
                              >{parseInt(props.progress)}%
                              </TypographyElement>
                            </ProgressionRing>
                            <Button variation='information' size='small' width='62px' height='21px'>
                              <TypographyElement
                                variant='heading4'
                                weight='semibold'
                                align='center'
                                fontSize='10px'
                                color={neutral[0]}
                              >
                                {Text.inProgress}
                              </TypographyElement>
                            </Button>
                          </>
                          )
                    }
                  </div>
                </>)
              : (
                <div className={progressionRing}>
                  <Button
                    variation='confirmation'
                    size='small'
                    width='137px'
                    height='34px'
                    handleClick={downloadCertificate}
                  >
                    <TypographyElement
                      variant='heading4'
                      weight='semibold'
                      align='center'
                      fontSize='10px'
                      color={neutral[0]}
                    >
                      {Text.download}
                    </TypographyElement>
                  </Button>
                </div>)}
          </div>)}
      </div>
    </div>
  )
}
