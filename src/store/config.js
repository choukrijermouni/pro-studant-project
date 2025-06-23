const initialState = {
  loading: false
}

export const reducer = (state = initialState, { type, data }) => {
  switch (type) {
    case TURN_ON_LOADER_STATE:
      return {
        ...state,
        loading: true
      }
    case TURN_OFF_LOADER_STATE:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export const TurnOnLoaderAction = _ => ({ type: TURN_ON_LOADER_STATE })
export const TurnOffLoaderAction = _ => ({ type: TURN_OFF_LOADER_STATE })

const TURN_ON_LOADER_STATE = 'TURN_ON_LOADER_STATE'
const TURN_OFF_LOADER_STATE = 'TURN_OFF_LOADER_STATE'
