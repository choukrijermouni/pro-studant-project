import {
  TypographyElement,
  blue,
  red
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { useSelector } from 'react-redux'
import { AdminRole } from 'constants/'

const useStyle = createUseStyles(style)

export default () => {
  const {
    learnersBox,
    learnersInfo,
    getLicence,
    learners
  } = useStyle()
  const { TeamsWithNoManagers, TeamsWithNoLearners, Total } = useSelector(state => state.teams)
  const { user } = useSelector(({ identity }) => identity)
  const isAdmin = user?.role?.includes(AdminRole)
  return (
    <div className={learnersBox}>
      {
        isAdmin
          ? (
            <>
              <div className={learnersInfo}>
                <TypographyElement
                  component='h4'
                  variant='heading4'
                  align='left'
                  spacing='20px 0 5px 0'
                >
                  {Text.allTeams}
                </TypographyElement>
                <TypographyElement
                  component='h1'
                  align='left'
                  fontSize='60px'
                  spacing='20px 0 21px 0'
                  color={blue[0]}
                  fontWeight={550}
                >
                  {Total}
                </TypographyElement>
              </div>
              <div className={learnersInfo}>
                <TypographyElement
                  component='h4'
                  variant='heading4'
                  align='left'
                  spacing='20px 0 5px 0'
                >
                  {Text.teamsWithoutManager}
                </TypographyElement>
                <div className={getLicence}>
                  <TypographyElement
                    component='h1'
                    align='left'
                    fontSize='60px'
                    spacing='20px 0 30px 0'
                    color={TeamsWithNoManagers ? red[3] : blue[0]}
                    fontWeight={550}
                  >
                    {TeamsWithNoManagers}
                  </TypographyElement>
                </div>
              </div>
              <div className={learnersInfo}>
                <TypographyElement
                  component='h4'
                  variant='heading4'
                  align='left'
                  spacing='20px 0 5px 0'
                >
                  {Text.emptyTeams}
                </TypographyElement>
                <div className={learners}>
                  <TypographyElement
                    component='h1'
                    align='left'
                    fontSize='60px'
                    spacing='20px 15px 30px 0'
                    color={TeamsWithNoLearners ? red[3] : blue[0]}
                    fontWeight={550}
                  >
                    {TeamsWithNoLearners}
                  </TypographyElement>
                </div>
              </div>
            </>)
          : null
      }
    </div>
  )
}
