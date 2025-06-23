import {
  blue,
  InputIcon,
  Icons,
  Button,
  SelectList
} from '@pro_boa/ui'
import style from './style'
import { createUseStyles } from 'react-jss'
import { useState } from 'react'
import Text from './text.json'

const useStyle = createUseStyles(style)

const filter = [
  { Id: 6, Name: 'Filter' }
]

export default () => {
  const {
    input,
    controlIcon,
    inputGroup,
    topSection,
    bottomSection
  } = useStyle()
  const [searchTerm, setSearchTerm] = useState('')
  const userFn = filter.find(fn => fn.Id === 6)
  const [userFilter, setFilter] = useState(userFn ? { Id: userFn.Id, Name: userFn.Name } : { Id: 0, Name: '' })
  return (
    <>
      <div className={topSection}>
        <SelectList
          valueField='Name'
          items={filter}
          selectedItem={userFilter.Name}
          onSelectedItem={(item) => {
            setFilter(item)
          }}
          gutterBottom={16}
        />
        <div className={inputGroup}>
          <input
            value={searchTerm}
            className={input}
            type='text'
            placeholder='text'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputIcon
            cursor='pointer'
            height='133%'
            color={blue[0]}
            iconName={searchTerm.length === 0 ? Icons.search : Icons.close}
            handleClick={() => setSearchTerm('')}
            className={controlIcon}
          />
        </div>
      </div>
      <div className={bottomSection}>
        <Button variation='secondary' width='153px' label={Text.showMore} />
      </div>
    </>
  )
}
