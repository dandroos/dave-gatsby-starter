import React from "react"
import { Provider } from "react-redux"
import store from "./src/state/store"
import { ThemeProvider } from "@material-ui/core"
import theme from "./src/theme"

const wrapWithProvider = ({ element }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </Provider>
  )
}

export default wrapWithProvider
