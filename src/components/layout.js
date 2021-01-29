import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Helmet } from "react-helmet"
import {
  Box,
  CssBaseline,
  useMediaQuery,
  useTheme,
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core"
import { useStaticQuery, graphql } from "gatsby"
import { AnimatePresence, motion } from "framer-motion"
import { setLocation, setAtTop, setIsMobile } from "../state/actions"
import color from "color"

import NavBar from "./NavBar"
import MobileMenu from "./MobileMenu"
import BottomMobileMenu from "./BottomMobileMenu"
import Footer from "./Footer"
import PrivacyPolicy from "./PrivacyPolicy"
import Sharer from "./ShareDialog"

const Layout = ({ location, dispatch, children }) => {
  const data = useStaticQuery(graphql`
    {
      file(name: { eq: "style" }, sourceInstanceName: { eq: "content" }) {
        childMarkdownRemark {
          frontmatter {
            dark
            primary
            secondary
          }
        }
      }
    }
  `)

  const { dark, primary, secondary } = data.file.childMarkdownRemark.frontmatter

  const bgColor1 = color(`#${secondary}`).lighten(0.6)
  const bgColor2 = color(`#${secondary}`).lighten(0.8)

  const theme = responsiveFontSizes(
    createMuiTheme({
      palette: {
        primary: {
          main: `#${primary}`,
        },
        secondary: {
          main: `#${secondary}`,
        },
        type: dark ? "dark" : "light",
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
  )
  useEffect(() => {
    setLocation(location.pathname)
  }, [location])
  const myTheme = useTheme()
  const isMobile = useMediaQuery(myTheme.breakpoints.down("sm"), {
    noSsr: true,
  })

  useEffect(() => {
    dispatch(setIsMobile(isMobile))
    //eslint-disable-next-line
  }, [isMobile])

  useEffect(() => {
    document.addEventListener("scroll", () => {
      dispatch(setAtTop(window.scrollY === 0))
    })
    //eslint-disable-next-line
  }, [])
  const duration = 0.5

  const variants = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        duration,
        delay: duration,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration,
      },
    },
  }

  return (
    location && (
      <ThemeProvider theme={theme}>
        <Helmet>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <CssBaseline />
        <Sharer />
        <NavBar />
        <MobileMenu />
        <BottomMobileMenu />
        <PrivacyPolicy />
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={-100}
          style={{
            background: `linear-gradient(to top left, ${bgColor1}, ${bgColor2})`,
          }}
        />
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={location.pathname}
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <Box
              minHeight="100vh"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box>{children}</Box>
              {location.pathname !== "/" && <Footer />}
            </Box>
          </motion.div>
        </AnimatePresence>
        {isMobile && location.pathname !== "/" && <Box height={56} />}
      </ThemeProvider>
    )
  )
}

export default connect()(Layout)
