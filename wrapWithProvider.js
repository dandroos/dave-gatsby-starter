import React from "react"
import { Provider } from "react-redux"
import store from "./src/state/store"
import { ThemeProvider, CssBaseline } from "@material-ui/core"
import theme from "./src/theme"

const wrapWithProvider = ({ element }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {element}
      </ThemeProvider>
    </Provider>
  )
}

export default wrapWithProvider
