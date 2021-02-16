import React, { useState } from "react"
import { connect } from "react-redux"
import { useStaticQuery, graphql } from "gatsby"
import {
  Toolbar,
  Container,
  Grid,
  TextField,
  Box,
  Button,
  Typography,
  Snackbar,
  makeStyles,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { Phone, Whatsapp, FacebookMessenger } from "mdi-material-ui"
import SEO from "../components/seo"

const useStyles = makeStyles(theme => ({
  iconButtonLabel: {
    display: "flex",
    flexDirection: "column",
  },
}))

const ContactPage = ({ siteIsReady }) => {
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
            contact_heading
            contact_btns_intro
            contact_form_intro
            contact_form_error
            contact_form_sending
            contact_form_success
          }
        }
      }
    }
  `)

  const contactDetails = data.contact_and_social.childMarkdownRemark.frontmatter
  const contactPageText = data.contact_page.childMarkdownRemark.frontmatter

  const [fields, setFields] = useState({
    name: "",
    email: "",
    tel: "",
    msg: "",
  })

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    severity: "success",
  })

  const handleChange = e => {
    setFields({
      ...fields,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }
  const handleSubmit = e => {
    e.preventDefault()

    const encode = data => {
      return Object.keys(data)
        .map(
          key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&")
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...fields,
      }),
    })
      .then(() => {
        setToast({
          open: true,
          msg: contactPageText.contact_form_success,
          severity: "success",
        })
        setFields({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
        //set message})
      })
      .catch(() =>
        setToast({
          open: true,
          msg: contactPageText.contact_form_error,
          severity: "error",
        })
      )
  }

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
      <SEO title="Contact" />
      {siteIsReady ? (
        <>
          <Toolbar />
          <Container>
            <Box py={2}>
              <Typography variant="h2" paragraph>
                {contactPageText.contact_heading}
              </Typography>
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
                      link={`https://wa.me/${contactDetails.phone.replace(
                        / /g,
                        ""
                      )}`}
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
              <Typography paragraph>
                {contactPageText.contact_form_intro}
              </Typography>
              <form
                name="contact"
                action="#"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Name"
                      required
                      id="name"
                      onChange={handleChange}
                      value={fields.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Email"
                      required
                      id="email"
                      type="email"
                      onChange={handleChange}
                      value={fields.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Phone"
                      id="tel"
                      onChange={handleChange}
                      value={fields.tel}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      required
                      label="Message"
                      id="msg"
                      onChange={handleChange}
                      value={fields.msg}
                    />
                  </Grid>
                </Grid>
                <Box mt={2} align="center">
                  <Button component="button" type="submit" fullWidth>
                    Send
                  </Button>
                </Box>
              </form>
            </Box>
          </Container>
          <Snackbar
            open={toast.open}
            autoHideDuration={5000}
            onClose={() => setToast({ ...toast, open: false })}
          >
            <Alert variant="filled" severity={toast.severity}>
              {toast.msg}
            </Alert>
          </Snackbar>
        </>
      ) : null}
    </>
  )
}

const mapStateToProps = state => ({
  siteIsReady: state.siteIsReady,
})

export default connect(mapStateToProps)(ContactPage)
