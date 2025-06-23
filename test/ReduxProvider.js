import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockInitStore = {

}

const mockStore = configureStore()
const store = mockStore(mockInitStore)

export const ReduxProvider = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
)
