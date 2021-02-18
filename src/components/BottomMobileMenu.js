import React from "react"
import { connect } from "react-redux"
import { useStaticQuery, graphql } from "gatsby"
import { AppBar, Typography, Grid, Button, makeStyles } from "@material-ui/core"
import { Phone, Whatsapp, FacebookMessenger } from "mdi-material-ui"

const useStyles = makeStyles(theme => ({
  iconButtonLabel: {
    display: "flex",
    flexDirection: "column",
  },
}))

const BottomMobileMenu = ({ isMobile, siteIsReady }) => {
  const classes = useStyles()
  const data = useStaticQuery(graphql`
    {
      file(
        name: { eq: "contact-and-social" }
        sourceInstanceName: { eq: "content" }
      ) {
        childMarkdownRemark {
          frontmatter {
            facebook
            phone
          }
        }
      }
    }
  `)

  const { facebook, phone } = data.file.childMarkdownRemark.frontmatter

  const ContactMethod = ({ label, Icon, link }) => (
    <Button
      classes={{ label: classes.iconButtonLabel }}
      variant="text"
      color="inherit"
      style={{
        borderRadius: 0,
        padding: 10,
      }}
      fullWidth
      onClick={() => window.open(link, "_blank")}
    >
      <Icon style={{ fontSize: 25 }} />
      <Typography variant="caption">{label}</Typography>
    </Button>
  )

  return typeof isMobile !== "object"
    ? isMobile &&
        siteIsReady && (
          <AppBar
            style={{
              position: "fixed",
              top: "auto",
              bottom: 0,
              left: 0,
              right: 0,
              boxShadow: 0,
            }}
          >
            <Grid container>
              <Grid item xs={4}>
                <ContactMethod
                  link={`tel:${phone.replace(/ /g, "")}`}
                  Icon={Phone}
                  label="Phone"
                />
              </Grid>
              <Grid item xs={4}>
                <ContactMethod
                  link={`https://wa.me/${phone.replace(/ /g, "")}`}
                  Icon={Whatsapp}
                  label="WhatsApp"
                />
              </Grid>
              <Grid item xs={4}>
                <ContactMethod
                  link={`https:/m.me/${facebook}`}
                  Icon={FacebookMessenger}
                  label="Messenger"
                />
              </Grid>
            </Grid>
          </AppBar>
        )
    : null
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
  siteIsReady: state.siteIsReady,
})

export default connect(mapStateToProps)(BottomMobileMenu)
