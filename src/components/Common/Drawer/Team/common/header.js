import { neutral, TypographyElement } from '@pro_boa/ui'
import style from './style'
import { createUseStyles } from 'react-jss'
import { amazonBucket, OrganizationTeamImages } from 'constants/'
import Text from '../text.json'

const useStyle = createUseStyles(style)

export default ({ title, team, managers, isManagers = true }) => {
  const { managersContainer, teamTag, managersCol, managersNames } = useStyle()
  return (
    <div className={managersContainer}>
      <img src={team.Image ? `${team?.Image}` : `${amazonBucket.bucketBaseUrl}${OrganizationTeamImages.TeamIconPath}${OrganizationTeamImages?.Development}`} className={teamTag} />
      <div className={managersCol}>
        <TypographyElement
          dataTest='team-name'
          fontSize='16px'
          lineHeight='20px'
          color={neutral[6]}
        >
          {title}
        </TypographyElement>
        {isManagers
          ? (
            <div className={managersNames}>
              {managers?.map((manager, index) => {
                return (
                  <div className={managersNames} key={index}>
                    <TypographyElement
                      dataTest='manager-name'
                      fontSize='14px'
                      fontWeight='400'
                      lineHeight='18px'
                      color={neutral[4]}
                    >
                      {`${manager?.FirstName} ${manager?.LastName}`}, &nbsp;
                    </TypographyElement>
                  </div>
                )
              }
              )}
            </div>)
          : (
            <div className={managersNames}>
              <TypographyElement
                dataTest='manager-name'
                fontSize='14px'
                fontWeight='400'
                lineHeight='18px'
                color={neutral[4]}
              >
                {team?.learners.length} {Text.learners}
              </TypographyElement>
            </div>)}
      </div>
    </div>
  )
}
