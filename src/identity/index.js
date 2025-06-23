import { userManager } from '@pro_boa/js'

const { ProClientId, Authority } = window.pro_boaConfiguration
export const oidcUserManager = userManager(Authority, ProClientId)

export const SignOutPath = '/signout'
export const signoutCallback = () => oidcUserManager.signoutRedirectCallback()
export const accessTokenExpired = (fn) => oidcUserManager.events.addAccessTokenExpired(fn)
export const accessTokenExpiring = (fn) => oidcUserManager.events.addAccessTokenExpiring(fn)
export const userLoaded = (fn) => oidcUserManager.events.addUserLoaded(fn)
export const userUnloaded = (fn) => oidcUserManager.events.addUserUnloaded(fn)
export const userSignedOut = (fn) => oidcUserManager.events.addUserSignedOut(fn)
