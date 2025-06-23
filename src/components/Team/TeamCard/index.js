import React from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import { Paper, TypographyElement, neutral, Icon, Icons, Skeleton, Avatar, AvatarSize } from '@pro_boa/ui'
import Text from './Text.json'
import { teamDev } from 'assets'

const defaultHandleClick = () => {}

export default ({ teamIcon, name, membersCount, managers, loading, handleClick = defaultHandleClick }) => {
  const scale = window.devicePixelRatio
  const useStyle = createUseStyles(style)
  const {
    row,
    card,
    icon,
    teamTag,
    fontStyle,
    cardContainer,
    teamNameClass,
    ManagersCard,
    nameContainer,
    avatarspaceSkeleton,
    flex,
    avatarContainer,
    iconSkeleton
  } = useStyle({ scale })
  const formattedManagers = !loading && managers.map(manager => `${manager.FirstName} ${manager.LastName}`)
  return (
    loading
      ? (
        <Paper className={row}>
          <div className={flex} onClick={handleClick}>
            <div className={nameContainer}>
              <div className={avatarContainer}>
                <Avatar
                  loading
                  size={AvatarSize.size_1}
                />
              </div>
              <span className={avatarspaceSkeleton} />
              <Skeleton lines={1} height={18} width={150} margin='20px 50px 20px 2px' />
            </div>
            <div title={Text.creation} className={card}>
              <div className={iconSkeleton}>
                <Skeleton lines={1} height={18} width={18} />
              </div>
              <Skeleton lines={1} height={18} width={75} margin='20px 2px' />
            </div>
            <div title={Text.team} className={card}>
              <div className={iconSkeleton}>
                <Skeleton lines={1} height={18} width={18} />
              </div>
              <Skeleton lines={1} height={18} width={81} margin='20px 2px' />
            </div>
          </div>
        </Paper>
        )
      : (
        <div className={cardContainer} onClick={handleClick} data-test='team-card'>
          <Paper className={row}>
            <div className={nameContainer}>
              <img src={teamIcon || teamDev} alt='' className={teamTag} />
              <div className={fontStyle}>
                <TypographyElement
                  component='h3'
                  variant='heading3'
                  align='left'
                  fontSize={16}
                  spacing='20px'
                  color={neutral[6]}
                  className={teamNameClass}
                >
                  {name}
                </TypographyElement>
              </div>
            </div>
            <div title={Text.learner} className={card}>
              <Icon iconName={Icons.users} style={icon} />
              <TypographyElement
                component='h4'
                variant='caption1'
                align='left'
                spacing='10px 16px 6px 16px'
                color={neutral[4]}
              >
                {membersCount < 10 ? '0' + membersCount : membersCount}
              </TypographyElement>
            </div>
            <div title={Text.manager} className={ManagersCard}>
              <Icon iconName={Icons.admin} style={icon} />
              <TypographyElement
                component='h4'
                variant='caption1'
                align='left'
                spacing='10px 16px 6px 16px'
                color={neutral[4]}
              >
                {managers.length
                  ? formattedManagers.slice(0, 3).join(' - ')
                  : Text.without}
                {formattedManagers.length > 3 && ' . . . '}
              </TypographyElement>
            </div>
          </Paper>
        </div>
        )
  )
}
