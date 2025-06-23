import {
  Avatar,
  TypographyElement,
  neutral,
  red,
  Icon,
  Icons,
  blue
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import { externalLink, help } from 'assets'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { MyAccountPath } from 'Routes'
import { helpLinks, amazonBucket } from 'constants/'
import { Popover, PopoverContent, PopoverTrigger } from 'components/Common/PopOver'
import Text from './text'
import { tryLogout } from 'identity/store'
import { avatarName } from 'helpers'

const useStyle = createUseStyles(style)

export default () => {
  const { avatar, iconHeader, container, root, avatarPopoverContainer, linkStyle, profileInfoContainer, devider, deviderContainer, linkContainer, iconStyle, bigDeviderContainer, contactContainer, contactIconStyle, linkTextStyle } = useStyle()
  const { Photo } = useSelector(state => state.organizationProfile)
  const { FirstName, LastName } = useSelector(state => state.organizationProfile)
  const { user } = useSelector(state => state.identity)
  const dispatch = useDispatch()
  const name = `${FirstName} ${LastName}`
  const { isManager } = useSelector(({ organizationProfile }) => organizationProfile)
  return (
    <div className={root}>
      <div>
        <div className={container}>
          <Popover>
            <PopoverTrigger>
              <a target='_blank' rel='noreferrer'>
                <img src={help} alt='notification' className={iconHeader} />
              </a>
            </PopoverTrigger>
            <PopoverContent>
              <div>
                <a href={helpLinks.start} className={linkStyle} target='_blank' rel='noreferrer'>
                  <div className={linkContainer}>
                    <TypographyElement
                      component='p'
                      color={neutral[6]}
                      fontWeight='bold'
                      fontSize='16px'
                      lineHeight='20px'
                    >
                      {Text.links.start}
                    </TypographyElement>
                    <img src={externalLink} alt='external' className={iconStyle} />
                  </div>
                </a>
                {isManager
                  ? (
                    <a href={helpLinks.managerGuid} className={linkStyle} target='_blank' rel='noreferrer'>
                      <div className={linkContainer}>
                        <TypographyElement
                          component='p'
                          color={neutral[6]}
                          fontWeight='bold'
                          fontSize='16px'
                          lineHeight='20px'
                        >
                          {Text.links.manager}
                        </TypographyElement>
                        <img src={externalLink} alt='external' className={iconStyle} />
                      </div>
                    </a>)
                  : (
                    <a href={helpLinks.admins} className={linkStyle} target='_blank' rel='noreferrer'>
                      <div className={linkContainer}>
                        <TypographyElement
                          component='p'
                          color={neutral[6]}
                          fontWeight='bold'
                          fontSize='16px'
                          lineHeight='20px'
                        >
                          {Text.links.admin}
                        </TypographyElement>
                        <img src={externalLink} alt='external' className={iconStyle} />
                      </div>
                    </a>)}
                <a href={helpLinks.undestand} className={linkStyle} target='_blank' rel='noreferrer'>
                  <div className={linkContainer}>
                    <TypographyElement
                      component='p'
                      color={neutral[6]}
                      fontWeight='bold'
                      fontSize='16px'
                      lineHeight='20px'
                    >
                      {Text.links.understand}
                    </TypographyElement>
                    <img src={externalLink} alt='external' className={iconStyle} />
                  </div>
                </a>
                <a href={helpLinks.news} className={linkStyle} target='_blank' rel='noreferrer'>
                  <div className={linkContainer}>
                    <TypographyElement
                      component='p'
                      color={neutral[6]}
                      fontWeight='bold'
                      fontSize='16px'
                      lineHeight='20px'
                    >
                      {Text.links.news}
                    </TypographyElement>
                    <img src={externalLink} alt='external' className={iconStyle} />
                  </div>
                </a>
                <div className={bigDeviderContainer}>
                  <div className={devider} />
                </div>

                <a href={helpLinks.faq} className={linkStyle} target='_blank' rel='noreferrer'>
                  <div className={linkContainer}>
                    <TypographyElement
                      component='p'
                      color={neutral[6]}
                      fontWeight='bold'
                      fontSize='16px'
                      lineHeight='20px'
                    >
                      {Text.qanda}
                    </TypographyElement>
                    <img src={externalLink} alt='notification' className={iconStyle} />
                  </div>
                </a>

                <a href={helpLinks.help} className={linkStyle} target='_blank' rel='noreferrer'>
                  <div className={linkContainer}>
                    <TypographyElement
                      component='p'
                      color={neutral[6]}
                      fontWeight='bold'
                      fontSize='16px'
                      lineHeight='20px'
                    >
                      {Text.help}
                    </TypographyElement>
                    <img src={externalLink} alt='notification' className={iconStyle} />
                  </div>
                </a>
                <div className={contactContainer} onClick={() => window.Intercom('showNewMessage')}>
                  <Icon iconName={Icons.support} style={contactIconStyle} />
                  <TypographyElement
                    color={blue[0]}
                    fontWeight='bold'
                    fontSize='16px'
                    lineHeight='20px'
                  >
                    {Text.contact}
                  </TypographyElement>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger>
              <div className={avatar}>
                <Avatar img={Photo ? `${amazonBucket.bucketBaseUrl}${Photo}` : null} name={avatarName(name)} size='size_1' />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div>
                <div className={avatarPopoverContainer}>
                  <Avatar img={Photo ? `${amazonBucket.bucketBaseUrl}${Photo}` : null} name={avatarName(name)} size='size_1' />
                  <div className={profileInfoContainer}>
                    <TypographyElement
                      color={neutral[6]}
                      fontWeight='bold'
                      fontSize='16px'
                      lineHeight='20px'
                    >
                      {FirstName} {LastName}
                    </TypographyElement>
                    <TypographyElement
                      color={neutral[5]}
                      fontWeight='regular'
                      fontSize='14px'
                      lineHeight='18px'
                    >
                      {Text.roleLabels[user?.role]}
                    </TypographyElement>
                  </div>
                </div>
                <TypographyElement
                  className={linkTextStyle}
                  fontWeight='bold'
                  fontSize='16px'
                  margin='16px 0 0 0'
                  spacing='16px'
                  lineHeight='20px'
                  cursor='pointer'
                  handleClick={() => dispatch(push(MyAccountPath))}
                >
                  {Text.profile}
                </TypographyElement>
                <div className={deviderContainer}>
                  <div className={devider} />
                </div>
                <TypographyElement
                  className={linkTextStyle}
                  color={red[4]}
                  fontWeight='bold'
                  fontSize='16px'
                  spacing='16px'
                  lineHeight='20px'
                  handleClick={() => dispatch(tryLogout())}
                  cursor='pointer'
                >
                  {Text.logout}
                </TypographyElement>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}
