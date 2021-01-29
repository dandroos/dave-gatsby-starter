import React from "react"
import { connect } from "react-redux"
import { setShowPrivacyPolicy } from "../state/actions"
import { Box, Typography, Link } from "@material-ui/core"

const FooterLegal = ({ dispatch }) => {
  const checkYear = () => {
    const now = new Date()
    if (now.getFullYear() !== 2020) {
      return `2020-${now.getFullYear()}`
    }
    return "2020"
  }
  return (
    <Box>
      <Typography variant="caption">
        View our{" "}
        <Link
          color="secondary"
          onClick={() => dispatch(setShowPrivacyPolicy(true))}
          style={{ cursor: "pointer" }}
        >
          privacy policy
        </Link>
        .
      </Typography>
      <Typography display="block" variant="caption">
        All content &copy; {checkYear()} David Andrews
      </Typography>
    </Box>
  )
}

export default connect()(FooterLegal)
