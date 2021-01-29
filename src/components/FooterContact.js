import React from "react"
import { connect } from "react-redux"
import { useStaticQuery, graphql } from "gatsby"
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Link,
} from "@material-ui/core"
import { Phone, Mail, Email } from "mdi-material-ui"

const FooterContact = ({ isMobile }) => {
  const theme = useTheme()
  const data = useStaticQuery(graphql`
    {
      file(
        name: { eq: "contact-and-social" }
        sourceInstanceName: { eq: "content" }
      ) {
        childMarkdownRemark {
          frontmatter {
            address
            phone
            email
          }
        }
      }
    }
  `)
  const contactDetails = data.file.childMarkdownRemark.frontmatter

  const iconStyle = isMobile
    ? { minWidth: "auto", color: theme.palette.primary.contrastText }
    : { color: theme.palette.primary.contrastText }

  return (
    <List dense disablePadding>
      <ListItem style={isMobile ? { flexDirection: "column" } : undefined}>
        <ListItemIcon style={iconStyle}>
          <Mail />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <>
              {contactDetails.address.split(/ ?, ?/g).map((i, ind) => (
                <Typography
                  key={ind}
                  variant="body2"
                  align={isMobile ? "center" : undefined}
                >
                  {i}
                </Typography>
              ))}
            </>
          }
        />
      </ListItem>
      <ListItem style={isMobile ? { flexDirection: "column" } : undefined}>
        <ListItemIcon style={iconStyle}>
          <Phone />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Link
              color="secondary"
              href={`tel:${contactDetails.phone.replace(/ /g, "")}`}
              style={isMobile ? { textAlign: "center" } : undefined}
            >
              {contactDetails.phone}
            </Link>
          }
        />
      </ListItem>
      <ListItem style={isMobile ? { flexDirection: "column" } : undefined}>
        <ListItemIcon style={iconStyle}>
          <Email />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Link
              color="secondary"
              href={`mailto:${contactDetails.email}`}
              style={isMobile ? { textAlign: "center" } : undefined}
            >
              {contactDetails.email}
            </Link>
          }
        />
      </ListItem>
    </List>
  )
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(FooterContact)
