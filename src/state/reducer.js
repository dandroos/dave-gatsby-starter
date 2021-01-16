import {
  SET_IS_MOBILE,
  SET_SHOW_MOBILE_MENU,
  SET_AT_TOP,
  SET_SHOW_PRIVACY_POLICY,
} from "./types"

const initialState = {
  isMobile: null,
  showMobileMenu: false,
  atTop: true,
  showPrivacyPolicy: false,
}

export default (state = initialState, { type, payload }) => {
  const newState = Object.assign({}, state)

  switch (type) {
    case SET_IS_MOBILE:
      newState.isMobile = payload
      break
    case SET_SHOW_MOBILE_MENU:
      newState.showMobileMenu = payload
      break
    case SET_AT_TOP:
      newState.atTop = payload
      break
    case SET_SHOW_PRIVACY_POLICY:
      newState.showPrivacyPolicy = payload
      break
    default:
      break
  }

  return newState
}
