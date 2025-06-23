
import { push } from 'connected-react-router'
import { signin } from 'identity/store'
import { HomePath } from 'Routes'
import { useEffect } from 'react'
import { callback } from '@pro_boa/js'
import { oidcUserManager } from 'identity'
import { useDispatch } from 'react-redux'
import { initOnboarding } from 'pages/OnboardingContainer/store'

export default () => {
  const dispatch = useDispatch()
  const signinUser = (user) => {
    dispatch(signin(user))
    dispatch(push(HomePath))
  }
  useEffect(() => {
    callback(oidcUserManager)
      .then((user) => {
        signinUser(user)
        dispatch(initOnboarding(user.profile.OnBoardingState))
      })
      .catch((e) => {
        dispatch(push(HomePath))
      })
  })

  return <>User loading ...</>
}
