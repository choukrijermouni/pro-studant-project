import { useEffect } from 'react'
import { signoutCallback, oidcUserManager } from 'identity'
import { useDispatch } from 'react-redux'
import { logoutSuccess } from 'identity/store'
import { signin } from '@pro_boa/js'

export default () => {
  const dispatch = useDispatch()
  useEffect(() => {
    signoutCallback()
      .then(() => {
        dispatch(logoutSuccess())
        signin(oidcUserManager)
      })
      .catch(() => {
        dispatch(logoutSuccess())
      })
  }, [])

  return (
    null
  )
}
