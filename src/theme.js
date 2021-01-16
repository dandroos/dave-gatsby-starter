import { createMuiTheme, responsiveFontSizes } from "@material-ui/core"

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  overrides: {
    MuiAppBar: {
      colorTransparent: {
        boxShadow: "none",
      },
    },
  },
  props: {
    MuiButton: {
      variant: "outlined",
    },
    MuiTextField: {
      variant: "outlined",
    },
  },
})

export default responsiveFontSizes(theme)
