import {
  TypographyElement,
  blue,
  red,
  ButtonSize,
  ButtonVariation,
  Button
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { useDispatch, useSelector } from 'react-redux'
import {
  resendWelcomeMessageAction
} from './store'
import { AdminRole } from 'constants/'
import { fetchLearnerProfileAction } from 'pages/LearnerProfile/store'
import moment from 'moment'
import { useDrawer } from 'components/Common/Drawer/drawerContext'

const useStyle = createUseStyles(style)

export default ({ setOrderLicenseIsOpen }) => {
  const dispatch = useDispatch()
  const { openDrawer, closeDrawer } = useDrawer()
  const { TotalLearnersWithoutLicense, TotalLearnersNotConnected, OrganizationRemainingLicenses } = useSelector(state => state.learners)
  const { user } = useSelector(({ identity }) => identity)
  const { noLicenseLearners = [], neverConnectedLearners = [], lastResendWelcomeDate } = useSelector(({ learners }) => learners)
  const { loading } = useSelector(state => state.config)
  const neverConnectedLearnersIds = neverConnectedLearners?.map(learner => learner.Id)
  const {
    learnersInfo,
    getLicence,
    learners
  } = useStyle({ loading })
  const isAdmin = user?.role?.includes(AdminRole)
  const handdleAffectLicenseButtonClick = () => {
    if (TotalLearnersWithoutLicense === 1 && noLicenseLearners.length) {
      dispatch(fetchLearnerProfileAction(noLicenseLearners[0]?.Id))
      openDrawer(
        {
          componentName: 'affectLicense',
          props: {
            id: noLicenseLearners[0]?.Id,
            handleClose: closeDrawer
          }
        }
      )
    } else {
      openDrawer(
        {
          componentName: 'affectLicenses',
          props: {
            handleClose: closeDrawer
          }
        }
      )
    }
  }
  return (

    <>
      <div className={learnersInfo}>
        {
          isAdmin
            ? (
              <>
                <TypographyElement
                  component='h4'
                  variant='heading4'
                  align='left'
                  spacing='20px 0 5px 0'
                >
                  {Text.learnersWithoutLicense}
                </TypographyElement>
                <div className={getLicence}>
                  <TypographyElement
                    component='h1'
                    fontSize='60px'
                    align='left'
                    spacing='20px 0 21px 0'
                    color={TotalLearnersWithoutLicense ? red[2] : blue[0]}
                    fontWeight={550}
                  >
                    {TotalLearnersWithoutLicense}
                  </TypographyElement>
                  <div>
                    <TypographyElement
                      component='h4'
                      variant='caption2'
                      align='left'
                      spacing='0 0 5px 0'
                      color={red[2]}
                    >
                      {OrganizationRemainingLicenses} {Text.licenseLeft}
                    </TypographyElement>
                    {OrganizationRemainingLicenses && TotalLearnersWithoutLicense
                      ? (
                        <Button
                          variation={ButtonVariation.secondary}
                          width={220}
                          color={red[2]}
                          borderColor={red[2]}
                          height={35}
                          size={ButtonSize.small}
                          label={Text.affectLicense}
                          handleClick={() => {
                            handdleAffectLicenseButtonClick()
                          }}
                        />)
                      : (
                        <Button
                          variation={ButtonVariation.primary}
                          width={220}
                          height={35}
                          size={ButtonSize.small}
                          label={Text.orderLicense}
                          handleClick={() => openDrawer(
                            {
                              componentName: 'orderLicensesNew',
                              props: {
                                handleClose: closeDrawer
                              }
                            }
                          )}
                        />)}
                  </div>
                </div>
              </>)
            : (
              <>
                <TypographyElement
                  component='h4'
                  variant='heading4'
                  align='left'
                  spacing='20px 0 5px 0'
                >
                  {Text.courslessLearners}
                </TypographyElement>
                <div className={getLicence}>
                  <TypographyElement
                    component='h1'
                    fontSize='60px'
                    align='left'
                    spacing='20px 0 21px 0'
                    color={TotalLearnersWithoutLicense ? red[2] : blue[0]}
                    fontWeight={550}
                  >
                    {TotalLearnersWithoutLicense}
                  </TypographyElement>
                </div>
              </>)
        }
      </div>
      <div className={learnersInfo}>
        <TypographyElement
          component='h4'
          variant='heading4'
          align='left'
          spacing='20px 0 5px 0'
        >
          {Text.neverConnectedLearners}
        </TypographyElement>
        <div className={learners}>
          <TypographyElement
            component='h1'
            align='left'
            fontSize='60px'
            spacing='20px 15px 12px 0'
            color={TotalLearnersNotConnected ? red[2] : blue[0]}
            fontWeight={550}
          >
            {TotalLearnersNotConnected}
          </TypographyElement>
          <div>
            <TypographyElement
              component='h4'
              variant='caption2'
              align='left'
              spacing={TotalLearnersNotConnected ? '0 0 5px 0' : '0 0 34px'}
              color={TotalLearnersNotConnected ? red[2] : blue[0]}
            >
              {Text.Learners}
            </TypographyElement>
            {isAdmin && TotalLearnersNotConnected
              ? (
                <Button
                  variation={ButtonVariation.secondary}
                  width={220}
                  color={red[2]}
                  borderColor={red[2]}
                  height={35}
                  disabled={moment().isBefore(moment(lastResendWelcomeDate).add(3, 'days'))}
                  size={ButtonSize.small}
                  label={Text.reinviteLearner}
                  handleClick={() => dispatch(resendWelcomeMessageAction([...neverConnectedLearnersIds]))}
                />)
              : null}
          </div>
        </div>
      </div>
    </>
  )
}
