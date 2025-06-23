import {
  Row,
  TypographyElement,
  Button,
  Col,
  SelectList
} from '@pro_boa/ui'
import { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { fetchAllTeamsAction } from 'pages/Teams/store'
import { useDispatch, useSelector } from 'react-redux'
import { exportLearnersToExcel, exportTeamLearnersInfoToExcel, scrollUp } from 'helpers'
import { getTeamLearnersRecapAction, getTeamRecapAction } from 'pages/TeamDetails/store'

const useStyle = createUseStyles(style)

export default ({ handleClose }) => {
  const { input, root, header, firstInput } = useStyle()
  const dispatch = useDispatch()
  const { isManager, Id } = useSelector(({ organizationProfile }) => organizationProfile)
  useEffect(() => {
    dispatch(fetchAllTeamsAction(isManager ? Id : null))
  }, [])
  const { allTeams } = useSelector(state => state.teams)
  const { organizationLicenseTypes = {} } = useSelector(state => state.referential)

  const { TeamLearningRecap = [] } = useSelector(state => state.teamDetails)
  const { teamLearnersRecap = [] } = useSelector(state => state.teamDetails)
  const types = [
    { Id: 1, Value: Text.suivi },
    { Id: 2, Value: Text.users }
  ]
  const [teams, setTeams] = useState([])
  const [selectData, setSelectData] = useState({ selectedItemId: null, selectedItemValue: '' })
  const [selectType, setSelectType] = useState({ selectedItemId: null, selectedItemValue: '' })
  useEffect(() => {
    dispatch(getTeamLearnersRecapAction(selectData?.selectedItemId))
    dispatch(getTeamRecapAction(selectData?.selectedItemId))
  }, [selectData?.selectedItemId])

  useEffect(() => {
    const reformedData = allTeams?.Items?.map(element => {
      element.Value = element.Name
      return element
    })
    !isManager && reformedData?.unshift({
      Id: '',
      Value: Text.allTeams
    })
    setTeams(reformedData)
  }, [allTeams])
  const handleExport = () => {
    handleClose && handleClose()
    scrollUp()
    if (selectType?.selectedItemId === types[0].Id) {
      exportLearnersToExcel(TeamLearningRecap, Text.report)
      handleClose()
    } else if (selectType?.selectedItemId === types[1].Id) {
      exportTeamLearnersInfoToExcel(teamLearnersRecap, Text.learnersList, organizationLicenseTypes)
      handleClose()
    }
  }

  return (
    allTeams?.Items?.length
      ? (
        <div className={root}>
          <div className={header}>
            <Col pos='left' className='col' grid={9}>
              <TypographyElement
                component='h3'
                variant='heading3'
                align='left'
              >
                {Text.export}
              </TypographyElement>
            </Col>
          </div>
          <Row justify='left'>
            <TypographyElement
              variant='body1'
              fontSize='12px'
              lineHeight='18px'
              margin='0 0 4px'
            >
              {Text.teamLabel}
            </TypographyElement>
            <span className={firstInput}>
              <SelectList
                id='SelectTeam'
                items={teams}
                placeholder={Text.placeholder}
                selectedItem={selectData?.selectedItemValue}
                gutterBottom={16}
                onSelectedItem={(item) => {
                  setSelectData({
                    selectedItemValue: item.Value,
                    selectedItemId: item.Id
                  })
                }}
              />
            </span>
            <TypographyElement
              variant='body1'
              fontSize='12px'
              lineHeight='18px'
              margin='0 0 4px'
            >
              {Text.type}
            </TypographyElement>
            <span className={input}>
              <SelectList
                id='reportType'
                items={types}
                placeholder={Text.placeholderReport}
                selectedItem={selectType?.selectedItemValue}
                gutterBottom={16}
                onSelectedItem={(item) => {
                  setSelectType({
                    selectedItemValue: item.Value,
                    selectedItemId: item.Id
                  })
                }}
              />
            </span>
            <Button
              marginButton='24px 0 0 0'
              label={Text.download}
              width='100%'
              disabled={!selectData?.selectedItemValue || !selectType?.selectedItemValue}
              handleClick={handleExport}
            />
          </Row>
        </div>)
      : null
  )
}
