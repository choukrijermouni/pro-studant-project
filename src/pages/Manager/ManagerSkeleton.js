import {
  TypographyElement,
  Skeleton
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { useSelector } from 'react-redux'
import DataTableSkeleton from 'components/Common/DataTable/DataTableSkeleton'

const useStyle = createUseStyles(style)

export default () => {
  const { loading } = useSelector(state => state.config)

  const {
    learnersBox,
    headerContainer,
    ctaStyle
  } = useStyle({ loading })

  return (
    <div>
      <TypographyElement
        component='h2'
        variant='heading2'
        align='left'
        spacing='42px 0 30px 0'
      >
        {Text.learners}
      </TypographyElement>
      <div className={learnersBox}>
        <div className={headerContainer}>
          <div className={ctaStyle}>
            <Skeleton lines={1} height={45} width={300} />
          </div>
          <div className={ctaStyle}>
            <Skeleton lines={1} height={45} width={300} />
          </div>
        </div>
        <DataTableSkeleton titles={[Text.name, Text.creationDate, Text.lastConnectionDate, Text.team]} />
      </div>
    </div>
  )
}
