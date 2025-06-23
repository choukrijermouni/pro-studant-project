import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  TypographyElement,
  Banner,
  green,
  red
} from '@pro_boa/ui'
import { clearMessageAction, closeBannerAction } from './store'
import { createUseStyles } from 'react-jss'
import style from './style'

const useStyle = createUseStyles(style)

const openBannerTimeout = 6000
const clearMessageTimeout = 500

export default () => {
  const { message, openBanner, success } = useSelector(({ notification }) => notification)
  const dispatch = useDispatch()
  useEffect(() => {
    let timer = null
    if (openBanner) {
      timer = setTimeout(() => {
        dispatch(closeBannerAction())
      }, openBannerTimeout)
    } else {
      timer = setTimeout(() => {
        dispatch(clearMessageAction())
      }, clearMessageTimeout)
    }
    return () => clearTimeout(timer)
  }, [openBanner])

  const { slidIn, slidOut } = useStyle({ openBanner })
  return (
    <div className={openBanner ? slidIn : slidOut}>
      <div data-test='Notification'>
        <Banner mode='horizontal' status={success} width='100%'>
          <TypographyElement
            variant='body1'
            fontSize='16px'
            spacing='10px'
            color={success === 'success' ? green[2] : red[2]}
          >
            {message}
          </TypographyElement>
        </Banner>
      </div>
    </div>
  )
}
