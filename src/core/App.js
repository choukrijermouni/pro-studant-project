import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Routes from 'Routes'
import { store, persistor } from 'store/index'
import { IntercomProvider } from 'react-use-intercom'
import { INTERCOM_APP_ID } from 'constants/'
import Intercom from 'components/Common/Intercom'
import { DrawerProvider } from '../components/Common/Drawer/drawerContext'

export default _ =>
  <ReduxProvider store={store}>
    <PersistGate persistor={persistor}>
      <IntercomProvider appId={INTERCOM_APP_ID}>
        <Intercom />
        <DrawerProvider>
          <Routes />
        </DrawerProvider>
      </IntercomProvider>
    </PersistGate>
  </ReduxProvider>

if (window.Cypress) {
  window.store = store
}
