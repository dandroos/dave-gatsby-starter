import React from "react"
import { Box, Typography } from "@material-ui/core"

const FooterSection = ({ title, align, children }) => {
  return (
    <Box align={align}>
      {title && (
        <Typography variant="h4" paragraph>
          {title}
        </Typography>
      )}
      {children}
    </Box>
  )
}

export default FooterSection
