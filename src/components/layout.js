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

  useEffect(() => {
    console.log(location)
  }, [location.pathname])
  return (
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
          <Toolbar />
          <Box my={2}>{children}</Box>
          {location.pathname !== "/" && <Footer />}
        </motion.div>
      </AnimatePresence>
      {isMobile && <Toolbar />}
    </>
  )
}

export default connect()(Layout)
