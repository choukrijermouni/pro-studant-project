import {
  Row,
  TypographyElement,
  Button,
  Col,
  SelectList,
  neutral,
  Icon,
  Icons
} from '@pro_boa/ui'
import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLearnersInfosAction, fetchLearnersProgressionAction, fetchVideosWatchedAction } from 'pages/Learners/store'
import { dateToStringFormat, scrollUp } from 'helpers'
import moment from 'moment'

const useStyle = createUseStyles(style)

export default ({ handleClose, setOpen }) => {
  const { input, root, header, paperDate, calendarIconClass } = useStyle()

  const dispatch = useDispatch()

  const types = [
    { Id: 1, Value: Text.suivi },
    { Id: 2, Value: Text.users },
    { Id: 3, Value: Text.learning }
  ]

  const [selectType, setSelectType] = useState({
    selectedItemId: null,
    selectedItemValue: ''
  })
  const { from, to } = useSelector(state => state.learners)
  const handleExport = () => {
    handleClose && handleClose()
    scrollUp()
    if (selectType?.selectedItemId === types[0].Id) {
      dispatch(fetchLearnersProgressionAction(moment(from).format('YYYY-MM-DD'), moment(to).format('YYYY-MM-DD')))
    } else if (selectType?.selectedItemId === types[1].Id) {
      dispatch(fetchLearnersInfosAction())
    } else if (selectType?.selectedItemId === types[2].Id) {
      dispatch(fetchVideosWatchedAction(moment(from).format('YYYY-MM-DD'), moment(to).format('YYYY-MM-DD')))
    }
  }
  return (
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
          margin='16px 0 4px 0'
        >
          {Text.dateRanges}
        </TypographyElement>
        <div className={paperDate}>
          <TypographyElement
            component='p'
            fontSize='13px'
            lineHeight='16px'
            color={neutral[6]}
            handleClick={() => setOpen(true)}
          >
            {dateToStringFormat(from, to)}
            <Icon iconName={Icons.calendar} style={calendarIconClass} />
          </TypographyElement>
        </div>
      </Row>
      <Row justify='left'>

        <TypographyElement
          variant='body1'
          fontSize='12px'
          lineHeight='18px'
          margin='16px 0 4px 0'
        >
          {Text.type}
        </TypographyElement>
        <span className={input}>
          <SelectList
            id='reportType'
            items={types}
            placeholder={Text.placeholder}
            selectedItem={selectType?.selectedItemValue}
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
          disabled={!selectType?.selectedItemValue || (Math.abs(moment(from).diff(to, 'years', true)) > 1 && selectType?.selectedItemId === types[2].Id)}
          handleClick={handleExport}
        />
      </Row>
    </div>
  )
}
