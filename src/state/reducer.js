import {
  SET_IS_MOBILE,
  SET_SHOW_MOBILE_MENU,
  SET_AT_TOP,
  SET_SHOW_PRIVACY_POLICY,
  SET_SHARER_PROPS,
  SET_LOCATION,
} from "./types"

const initialState = {
  location: null,
  isMobile: null,
  showMobileMenu: false,
  atTop: true,
  showPrivacyPolicy: false,
  sharerProps: {
    visible: false,
    href: "",
    title: "",
  },
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
    case SET_SHARER_PROPS:
      newState.sharerProps = payload
      break
    case SET_LOCATION:
      newState.location = payload
      break
    default:
      break
  }

  return newState
}
