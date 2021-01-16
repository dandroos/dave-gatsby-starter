import React, { useEffect } from "react"
import { connect } from "react-redux"
import { useStaticQuery, graphql } from "gatsby"
import {
  Box,
  Toolbar,
  CssBaseline,
  useMediaQuery,
  useTheme,
} from "@material-ui/core"
import { AnimatePresence, motion } from "framer-motion"
import { setAtTop, setIsMobile } from "../state/actions"

import NavBar from "./NavBar"
import MobileMenu from "./MobileMenu"
import BottomMobileMenu from "./BottomMobileMenu"
import Footer from "./Footer"
import PrivacyPolicy from "./PrivacyPolicy"

const Layout = ({ location, dispatch, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true })

  useEffect(() => {
    dispatch(setIsMobile(isMobile))
  }, [isMobile])

  useEffect(() => {
    document.addEventListener("scroll", () => {
      dispatch(setAtTop(window.scrollY === 0))
    })
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
      <>
        <CssBaseline />
        <NavBar />
        <MobileMenu />
        <BottomMobileMenu />
        <PrivacyPolicy />
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={location.pathname}
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <Box
              py={2}
              minHeight="100vh"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box>
                {location.pathname !== "/" && <Toolbar />}
                {children}
              </Box>
              {location.pathname !== "/" && <Footer />}
            </Box>
          </motion.div>
        </AnimatePresence>
        {isMobile && location.pathname !== "/" && <Toolbar />}
      </>
    )
  )
}

export default connect()(Layout)
