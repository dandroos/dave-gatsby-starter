import { createMuiTheme, responsiveFontSizes } from "@material-ui/core"
import { useStaticQuery, graphql } from "gatsby"

const data = useStaticQuery(graphql`
  {
    file(name: { eq: "colors" }, sourceInstanceName: { eq: "content" }) {
      childMarkdownRemark {
        frontmatter {
          primary
          secondary
        }
      }
    }
  }
`)

const { primary, secondary } = data.file.childMarkdownRemark.frontmatter

const theme = createMuiTheme({
  palette: {
    primary: {
      main: `#${primary}`,
    },
    secondary: {
      main: `#${secondary}`,
    },
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
