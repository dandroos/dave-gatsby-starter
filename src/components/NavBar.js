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
import { Menu, Facebook, Twitter, Instagram, Share } from "mdi-material-ui"
import { internal } from "../navigation-config"
import { setShowMobileMenu, setSharerProps } from "../state/actions"
import Img from "gatsby-image"

const NavBar = ({ dispatch, atTop, isMobile, siteIsReady }) => {
  const data = useStaticQuery(graphql`
    {
      title: site {
        siteMetadata {
          title
        }
      }
      contactDetails: file(
        name: { eq: "contact-and-social" }
        sourceInstanceName: { eq: "content" }
      ) {
        childMarkdownRemark {
          frontmatter {
            facebook
            twitter
            instagram
          }
        }
      }
      logo: file(
        name: { eq: "gatsby-icon-nav" }
        sourceInstanceName: { eq: "images" }
      ) {
        childImageSharp {
          fixed(width: 32, height: 32) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const socialLinks = data.contactDetails.childMarkdownRemark.frontmatter

  return siteIsReady ? (
    <AppBar color={atTop ? "transparent" : "primary"}>
      <Toolbar
        variant={atTop ? "regular" : "dense"}
        style={{ transition: "all .5s" }}
      >
        <Box
          display="flex"
          alignItems="center"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <Img
            fixed={data.logo.childImageSharp.fixed}
            style={{ marginRight: 10 }}
          />
          <Typography variant="h5" variantMapping={{ h5: "h1" }}>
            {data.title.siteMetadata.title}
          </Typography>
        </Box>
        <Box flexGrow={1} />
        {isMobile ? (
          <IconButton
            onClick={() => dispatch(setShowMobileMenu(true))}
            color="inherit"
            edge="end"
          >
            <Menu />
          </IconButton>
        ) : (
          <Box>
            {internal.map((i, ind) => (
              <Button
                key={ind}
                color="inherit"
                variant="text"
                component={Link}
                to={i.link}
                activeStyle={{ fontWeight: "bold" }}
              >
                {i.label}
              </Button>
            ))}
            <Box display="inline">
              <SocialButton
                Icon={Facebook}
                link={`https://facebook.com/${socialLinks.facebook}`}
              />
              <SocialButton
                Icon={Twitter}
                link={`https://twitter.com/${socialLinks.twitter}`}
              />
              <SocialButton
                Icon={Instagram}
                link={`https://instagram.com/${socialLinks.instagram}`}
                end
              />
            </Box>
            <Box display="inline" ml={3}>
              <Button
                size="small"
                onClick={() =>
                  dispatch(
                    setSharerProps({
                      visible: true,
                      title: document.title,
                      href: window.location.href,
                    })
                  )
                }
                startIcon={<Share />}
                variant="outlined"
                color="inherit"
              >
                Share
              </Button>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  ) : null
}

const SocialButton = ({ Icon, link, end }) => (
  <IconButton
    onClick={() => window.open(link, "_blank")}
    edge={end ? "end" : false}
    color="inherit"
  >
    <Icon />
  </IconButton>
)

const mapStateToProps = state => ({
  atTop: state.atTop,
  isMobile: state.isMobile,
  currentLocation: state.location,
  siteIsReady: state.siteIsReady,
})

export default connect(mapStateToProps)(NavBar)
