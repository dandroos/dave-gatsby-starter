import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { connect } from "react-redux"
import {
  Dialog,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Fab,
  Slide,
  Button,
  Typography,
} from "@material-ui/core"
import { Facebook, Twitter, Instagram, Close, Share } from "mdi-material-ui"
import { internal } from "../navigation-config"
import { setShowMobileMenu, setSharerProps } from "../state/actions"

const MobileMenu = ({ dispatch, isOpen }) => {
  const data = useStaticQuery(graphql`
    {
      file(
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
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const socialLinks = data.file.childMarkdownRemark.frontmatter
  const { title } = data.site.siteMetadata

  const handleClose = () => {
    dispatch(setShowMobileMenu(false))
  }
  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Slide}
    >
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Fab
          style={{ position: "absolute", top: 15, right: 15 }}
          onClick={handleClose}
        >
          <Close />
        </Fab>
        <Typography variant="h2">{title}</Typography>
        <List style={{ width: "100%" }}>
          {internal.map((i, ind) => (
            <ListItem
              key={ind}
              component={Link}
              to={i.link}
              button
              onClick={handleClose}
              activeStyle={{ fontWeight: "bold" }}
            >
              <ListItemText
                primary={i.label}
                primaryTypographyProps={{
                  variant: "button",
                  align: "center",
                  style: { fontWeight: "inherit" },
                }}
              />
            </ListItem>
          ))}
        </List>
        <Box mt={2}>
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
          />
        </Box>
        <Box mt={2}>
          <Button
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
    </Dialog>
  )
}

const SocialButton = ({ Icon, link }) => (
  <IconButton onClick={() => window.open(link, "_blank")}>
    <Icon />
  </IconButton>
)

const mapStateToProps = state => ({
  isOpen: state.showMobileMenu,
})

export default connect(mapStateToProps)(MobileMenu)
