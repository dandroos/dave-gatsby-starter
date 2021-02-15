import { createMuiTheme, responsiveFontSizes } from "@material-ui/core"
import { primary, secondary } from "./colors"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },
  typography: {
    fontFamily: "EB Garamond",
  },
  overrides: {
    MuiAppBar: {
      colorTransparent: {
        boxShadow: "none",
      },
    },
    MuiBottomNavigationAction: {
      label: { textTransform: "uppercase" },
    },
  },
  props: {
    MuiButton: {
      variant: "contained",
      color: "secondary",
    },
    MuiTextField: {
      variant: "outlined",
    },
  },
})

export default responsiveFontSizes(theme)
