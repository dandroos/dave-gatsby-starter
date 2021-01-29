import React from "react"
import { connect } from "react-redux"
import { useStaticQuery, graphql, Link } from "gatsby"
import {
  Button,
  Typography,
  Link as MLink,
  Box,
  IconButton,
} from "@material-ui/core"
import { Facebook, Twitter, Instagram } from "mdi-material-ui"
import { internal } from "../navigation-config"

const FooterNavigation = ({ isMobile }) => {
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
    }
  `)

  const socialLinks = data.file.childMarkdownRemark.frontmatter

  return isMobile ? (
    <Box>
      {internal.map((i, ind) => (
        <Box key={ind} display="inline">
          <Button size="small" variant="text" component={Link} to={i.link}>
            {i.label}
          </Button>
          <Typography display="inline">
            {ind + 1 !== internal.length ? "|" : null}
          </Typography>
        </Box>
      ))}
      <Box>
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
    </Box>
  ) : (
    <Box>
      {internal.map((i, ind) => (
        <Typography
          key={ind}
          variant="button"
          style={{ cursor: "pointer" }}
          paragraph
        >
          <MLink component={Link} to={i.link} color="secondary">
            {i.label}
          </MLink>
        </Typography>
      ))}
      <Box>
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
    </Box>
  )
}

const SocialButton = ({ Icon, link }) => (
  <IconButton color="inherit" onClick={() => window.open(link, "_blank")}>
    <Icon />
  </IconButton>
)

const mapStateToProps = state => ({
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(FooterNavigation)
