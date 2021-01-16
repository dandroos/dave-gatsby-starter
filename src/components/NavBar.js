import React from "react"
import { graphql, navigate, Link, useStaticQuery } from "gatsby"
import { connect } from "react-redux"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@material-ui/core"
import { Menu } from "mdi-material-ui"
import { internal, external } from "../navigation-config"
import { setShowMobileMenu } from "../state/actions"

const NavBar = ({ dispatch, atTop, isMobile }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <AppBar color={atTop ? "transparent" : "primary"}>
      <Toolbar
        variant={atTop ? "regular" : "dense"}
        style={{ transition: "all .5s" }}
      >
        <Typography
          variant="h5"
          variantMapping={{ h5: "h1" }}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          {data.site.siteMetadata.title}
        </Typography>
        <Box flexGrow={1} />
        {isMobile ? (
          <IconButton
            onClick={() => dispatch(setShowMobileMenu(true))}
            edge="end"
          >
            <Menu />
          </IconButton>
        ) : (
          <Box>
            {internal.map(i => (
              <Button variant="text" component={Link} to={i.link}>
                {i.label}
              </Button>
            ))}
            <Box display="inline">
              {external.map((i, ind) => (
                <IconButton
                  edge={ind + 1 === external.length ? "end" : "false"}
                  onClick={() => window.open(i.link, "_blank")}
                >
                  <i.icon />
                </IconButton>
              ))}
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => ({
  atTop: state.atTop,
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(NavBar)
