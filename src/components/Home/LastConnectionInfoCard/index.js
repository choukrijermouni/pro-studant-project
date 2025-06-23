import { useEffect, useState } from 'react'
import style from './style'
import Text from './text.json'
import { createUseStyles } from 'react-jss'
import InfoCard from 'components/Common/Cards/InfoCard'
import { useDispatch, useSelector } from 'react-redux'
import {
  RadioButton,
  usePagination,
  neutral,
  TypographyElement
} from '@pro_boa/ui'
import { helpLinks } from 'constants/'
import LastConnectedLearners from './LastConnectedLearners'
import LastConnectedManagers from './LastConnectedManagers'
import { fetchOrganizationLastConnectedLearners, fetchOrganizationLastConnectedManagers } from 'pages/Home/store'

const useStyle = createUseStyles(style)

const learnerType = '6'
const managerType = '5'

export default () => {
  const {
    radioContainer,
    textClass,
    scrollable
  } = useStyle()
  const [radio, setRadio] = useState(learnerType)
  const { lastConnectedUsers, lastConnectedManagers } = useSelector(state => state.organization)
  const { rowsPerPage, skip } = usePagination()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchOrganizationLastConnectedLearners(rowsPerPage, skip))
    dispatch(fetchOrganizationLastConnectedManagers(rowsPerPage, skip))
  }, [rowsPerPage, skip])
  return (
    lastConnectedUsers?.count > 0
      ? (
        <InfoCard title={Text.lastConnection} infoLink={helpLinks.homePage}>
          <div className={textClass}>
            <div className={radioContainer}>
              {
                lastConnectedManagers?.count > 0 && (
                  <>
                    <RadioButton
                      dataTest='radio-button-learner'
                      name='radio'
                      label={Text.app}
                      id='radio2'
                      handleChange={() => setRadio(learnerType)}
                      checked={radio === learnerType}
                    />
                    <RadioButton
                      dataTest='radio-button-manager'
                      name='radio'
                      label={Text.manager}
                      id='radio2_1'
                      checked={radio === managerType}
                      handleChange={() => setRadio(managerType)}
                    />
                  </>
                )
              }
            </div>

            <div className={scrollable}>
              {radio === learnerType
                ? <LastConnectedLearners />
                : <LastConnectedManagers />}
            </div>
          </div>
        </InfoCard>)
      : (
        <InfoCard title={Text.lastConnection} infoLink={helpLinks.homePage}>
          <div className={textClass}>
            <TypographyElement
              variant='heading2'
              color={neutral[5]}
              fontWeight='bolder'
              fontSize='16px'
              lineHeight='26px'
              display='inline'
              spacing='0 8px 0 0'
            >
              {Text.noActivity}
            </TypographyElement>
          </div>
        </InfoCard>)
  )
}
