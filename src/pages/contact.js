import React, { useState } from "react"
import {
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
import { contact } from "../navigation-config"

const useStyles = makeStyles(theme => ({
  iconButtonLabel: {
    display: "flex",
    flexDirection: "column",
  },
}))

const ContactPage = () => {
  const classes = useStyles()
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
          msg: "Thank you. Your message was sent successfully.",
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
          msg:
            "Sorry. There was a problem sending your message. Please try again in a few moments or use an alternative contact method.",
          severity: "error",
        })
      )
  }

  return (
    <>
      <Container>
        <Typography>You can contact me via the following methods...</Typography>
        <Box my={2}>
          <Grid container spacing={1}>
            {contact.map(i => (
              <Grid item xs={4}>
                <Button
                  classes={{ label: classes.iconButtonLabel }}
                  style={{ padding: 30 }}
                  fullWidth
                >
                  <i.icon style={{ fontSize: 50 }} />
                  <Typography variant="caption">{i.label}</Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Typography paragraph>
          You can also send me a message using the form below.
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
            <Button fullWidth>Send</Button>
          </Box>
        </form>
      </Container>
      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast({ open: false, msg: "", severity: "success" })}
      >
        <Alert variant="filled" severity={toast.severity}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ContactPage
