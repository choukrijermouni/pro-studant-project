const initialState = {
  message: '',
  openBanner: false,
  success: false
}

export const reducer = (state = initialState, { type, data }) => {
  switch (type) {
    case OPEN_BANNER:
      return {
        ...state,
        message: data.message,
        openBanner: true,
        success: data.success
      }
    case CLOSE_BANNER:
      return {
        ...state,
        message: '',
        openBanner: false
      }
    default:
      return state
  }
}

export const openBannerAction = (message, success) => ({ type: OPEN_BANNER, data: { message: message, success: success } })
export const closeBannerAction = () => ({ type: CLOSE_BANNER })

const OPEN_BANNER = 'OPEN_BANNER'
const CLOSE_BANNER = 'CLOSE_BANNER'
