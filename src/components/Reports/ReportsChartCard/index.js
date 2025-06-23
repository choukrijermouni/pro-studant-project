import {
  TypographyElement,
  red,
  Skeleton
} from '@pro_boa/ui'
import { createUseStyles } from 'react-jss'
import style from './style'
import Text from './text.json'
import { Doughnut } from 'react-chartjs-2'
import { doughnutData, doughnutOptions } from '../../../helpers/home'

const useStyle = createUseStyles(style)

export default (
  {
    headerText,
    consumed = 0,
    left = 0,
    total = 0,
    primaryColor,
    secondaryColor,
    userChartCard,
    loading
  }
) => {
  const {
    paperContainer,
    licenseInfoContainer,
    licenseInfoStyle,
    chartContainer,
    chartInner,
    primaryDot,
    secondaryDot,
    skeletonContainer
  } = useStyle({ primaryColor, secondaryColor, loading })
  return (
    <div className={paperContainer}>
      {
        loading
          ? <Skeleton lines={1} height={30} margin='20px 0 16px 0' width='100%' />
          : (
            <TypographyElement
              component='h2'
              variant='heading4'
              align='left'
              spacing='20px 0 16px 0'
            >
              {headerText || Text.helperText}
            </TypographyElement>)
      }
      {
        loading
          ? <Skeleton lines={2} height={20} margin='0 0 0 10px' width='80%' />
          : (
            <>
              <div className={licenseInfoContainer}>
                <div className={licenseInfoStyle}>
                  <div>
                    <span className={primaryDot} />
                  </div>
                  <TypographyElement
                    component='h4'
                    variant='body1'
                    align='center'
                    fontSize='15px'
                    spacing='0 0 0 10px'
                  >
                    {userChartCard ? Text.userWithLicense : Text.consumed} ({consumed})
                  </TypographyElement>
                </div>
                <div className={licenseInfoStyle}>
                  <div>
                    <span className={secondaryDot} />
                  </div>
                  <TypographyElement
                    component='h4'
                    variant='body1'
                    align='center'
                    fontSize='15px'
                    spacing='0px 0 0 10px'
                    color={!userChartCard && left === 0 ? red[2] : null}
                  >
                    {userChartCard ? Text.userWithoutLicense : Text.left} ({left})
                  </TypographyElement>
                </div>
              </div>
            </>
            )
      }
      <div className={chartContainer}>
        {
          loading
            ? <div className={skeletonContainer} />
            : (
              <>
                <Doughnut
                  data={doughnutData(primaryColor, secondaryColor, consumed, left)}
                  options={doughnutOptions}
                />
                <div className={chartInner}>
                  <TypographyElement
                    component='h4'
                    variant='body1'
                    align='left'
                    spacing='0px 0 0 0'
                    fontSize='30px'
                    color={primaryColor}
                  >
                    {total}
                  </TypographyElement>
                </div>
              </>
              )
        }
      </div>
    </div>
  )
}
