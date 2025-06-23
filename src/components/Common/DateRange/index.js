import { DateRangePicker } from 'react-date-range'
import {
  Modal
} from '@pro_boa/ui'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { defaultStaticRanges } from 'helpers/defaultRangers'

export default ({ open, setOpen, handleChange, selectionRange, rangeColors }) => {
  return (
    <div id='drawer' onClick={() => setOpen(false)}>
      <Modal isOpen={open} handleClose={() => setOpen(false)}>
        <div onClick={(e) => e.stopPropagation()}>
          <DateRangePicker
            onChange={handleChange}
            showSelectionPreview
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={[selectionRange]}
            staticRanges={defaultStaticRanges}
            direction='horizontal'
            inputRanges={[]}
            rangeColors={[rangeColors]}
          />
        </div>
      </Modal>
    </div>
  )
}
