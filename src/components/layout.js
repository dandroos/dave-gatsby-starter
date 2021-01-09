import React, { useEffect } from "react"
import { connect } from "react-redux"
import { useStaticQuery, graphql } from "gatsby"
import { CssBaseline, useMediaQuery, useTheme } from "@material-ui/core"
import { AnimatePresence, motion } from "framer-motion"
import { setIsMobile } from "../state/actions"

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
      <CssBaseline />
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={location.pathname}
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default connect()(Layout)
