import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Helmet } from "react-helmet"
import { Box, useMediaQuery, useTheme } from "@material-ui/core"
import { AnimatePresence, motion } from "framer-motion"
import {
  setLocation,
  setAtTop,
  setIsMobile,
  setSiteIsReady,
} from "../state/actions"
import color from "color"
import FontFaceObserver from "fontfaceobserver"

import NavBar from "./NavBar"
import MobileMenu from "./MobileMenu"
import BottomMobileMenu from "./BottomMobileMenu"
import Footer from "./Footer"
import PrivacyPolicy from "./PrivacyPolicy"
import Sharer from "./ShareDialog"

const Layout = ({ location, dispatch, children, siteIsReady }) => {
  const theme = useTheme()

  const bgColor1 = color(theme.palette.secondary.main).lighten(0.6)
  const bgColor2 = color(theme.palette.secondary.main).lighten(0.8)

  useEffect(() => {
    setLocation(location.pathname)
  }, [location])
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    noSsr: true,
  })

  useEffect(() => {
    dispatch(setIsMobile(isMobile))
    //eslint-disable-next-line
  }, [isMobile])

  const loadAssets = () => {
    const font = new FontFaceObserver("EB Garamond")
    font.load().then(() => {
      dispatch(setSiteIsReady(true))
    }, loadAssets)
  }

  useEffect(() => {
    document.addEventListener("scroll", () => {
      dispatch(setAtTop(window.scrollY === 0))
    })
    loadAssets()
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
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {siteIsReady ? (
        <>
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
              position: "fixed",
            }}
          />
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={location.pathname}
              variants={variants}
              initial="initial"
              animate="enter"
              exit="exit"
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>{children}</Box>
              {location.pathname !== "/" && <Footer />}
            </motion.div>
          </AnimatePresence>
          {isMobile && location.pathname !== "/" && <Box height={56} />}
        </>
      ) : null}
    </>
  )
}

const mapStateToProps = state => ({
  siteIsReady: state.siteIsReady,
})

export default connect(mapStateToProps)(Layout)
