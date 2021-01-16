import React from "react"
import { connect } from "react-redux"
import { Link } from "gatsby"
import {
  Button,
  Typography,
  Link as MLink,
  Box,
  IconButton,
} from "@material-ui/core"
import { internal, external } from "../navigation-config"

const FooterNavigation = ({ isMobile }) => {
  return isMobile ? (
    <Box>
      {internal.map((i, ind) => (
        <>
          <Button size="small" variant="text" component={Link} to={i.link}>
            {i.label}
          </Button>
          <Typography display="inline">
            {ind + 1 !== internal.length ? "|" : null}
          </Typography>
        </>
      ))}
      <Box>
        {external.map(i => (
          <IconButton onClick={() => window.open(i.link, "_blank")}>
            <i.icon />
          </IconButton>
        ))}
      </Box>
    </Box>
  ) : (
    <Box>
      {internal.map(i => (
        <Typography variant="button" style={{ cursor: "pointer" }} paragraph>
          <MLink component={Link} to={i.link} color="inherit">
            {i.label}
          </MLink>
        </Typography>
      ))}
      <Box>
        {external.map(i => (
          <IconButton onClick={() => window.open(i.link, "_blank")}>
            <i.icon />
          </IconButton>
        ))}
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(FooterNavigation)
