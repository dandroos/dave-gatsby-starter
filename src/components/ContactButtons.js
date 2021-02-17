import React from "react"
import { Typography, Box, Grid, Button, makeStyles } from "@material-ui/core"
import { useStaticQuery, graphql } from "gatsby"
import { Phone, Whatsapp, FacebookMessenger } from "mdi-material-ui"

const useStyles = makeStyles(theme => ({
  iconButtonLabel: {
    display: "flex",
    flexDirection: "column",
  },
}))

const ContactButtons = () => {
  const classes = useStyles()
  const data = useStaticQuery(graphql`
    {
      contact_and_social: file(
        name: { eq: "contact-and-social" }
        sourceInstanceName: { eq: "content" }
      ) {
        childMarkdownRemark {
          frontmatter {
            phone
            facebook
          }
        }
      }
      contact_page: file(
        name: { eq: "contact_page" }
        sourceInstanceName: { eq: "content" }
      ) {
        childMarkdownRemark {
          frontmatter {
            contact_btns_intro
          }
        }
      }
    }
  `)
  const contactDetails = data.contact_and_social.childMarkdownRemark.frontmatter
  const contactPageText = data.contact_page.childMarkdownRemark.frontmatter
  const ContactMethod = ({ label, Icon, link }) => (
    <Button
      classes={{ label: classes.iconButtonLabel }}
      style={{ padding: 30 }}
      fullWidth
      onClick={() => window.open(link, "_blank")}
    >
      <Icon style={{ fontSize: 50 }} />
      <Typography variant="caption">{label}</Typography>
    </Button>
  )

  return (
    <>
      <Typography>{contactPageText.contact_btns_intro}</Typography>
      <Box my={2}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <ContactMethod
              label="Call"
              Icon={Phone}
              link={`tel:${contactDetails.phone.replace(/ /g, "")}`}
            />
          </Grid>
          <Grid item xs={4}>
            <ContactMethod
              label="WhatsApp"
              Icon={Whatsapp}
              link={`https://wa.me/${contactDetails.phone.replace(/ /g, "")}`}
            />
          </Grid>
          <Grid item xs={4}>
            <ContactMethod
              label="Messenger"
              Icon={FacebookMessenger}
              link={`https:/m.me/${contactDetails.facebook}`}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default ContactButtons
