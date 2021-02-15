import {
  SET_SITE_IS_READY,
  SET_IS_MOBILE,
  SET_SHOW_MOBILE_MENU,
  SET_AT_TOP,
  SET_SHOW_PRIVACY_POLICY,
  SET_SHARER_PROPS,
  SET_LOCATION,
} from "./types"

export const setSiteIsReady = payload => ({
  type: SET_SITE_IS_READY,
  payload,
})

export const setIsMobile = payload => ({
  type: SET_IS_MOBILE,
  payload,
})

export const setShowMobileMenu = payload => ({
  type: SET_SHOW_MOBILE_MENU,
  payload,
})

export const setAtTop = payload => ({
  type: SET_AT_TOP,
  payload,
})

export const setShowPrivacyPolicy = payload => ({
  type: SET_SHOW_PRIVACY_POLICY,
  payload,
})

export const setSharerProps = payload => ({
  type: SET_SHARER_PROPS,
  payload,
})

export const setLocation = payload => ({
  type: SET_LOCATION,
  payload,
})
