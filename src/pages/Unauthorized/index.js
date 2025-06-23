import { useDispatch, useSelector } from 'react-redux'
import { tryLogout } from 'identity/store'
import { useEffect } from 'react'
import { oidcUserManager } from 'identity'
import { signin } from '@pro_boa/js'

let timer

export default () => {
  const dispatch = useDispatch()
  const { isConnected } = useSelector(({ identity }) => identity)
  useEffect(() => {
    if (isConnected) {
      dispatch(tryLogout())
    } else {
      timer = setTimeout(() => signin(oidcUserManager), 1000)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [isConnected])
  return null
}
