import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Box, TextField, Button, Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { Mailbox } from "mdi-material-ui"

const MailChimpForm = ({ isMobile, status, message, onValidated }) => {
  const [email, setEmail] = useState("")

  const handleChange = e => {
    setEmail(e.currentTarget.value)
  }

  const submit = () => {
    return (
      email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
      })
    )
  }

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    severity: "success",
  })

  useEffect(() => {
    if (status === "sending") {
      setToast({ open: true, msg: "Submitting...", severity: "info" })
    } else if (status === "error") {
      setToast({
        open: true,
        msg: message,
        severity: "error",
      })
    } else if (status === "success") {
      setToast({
        open: true,
        msg: message,
        severity: "success",
      })
      setEmail("")
    }
    //eslint-disable-next-line
  }, [status])

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent={isMobile ? "center" : "flex-end"}
      >
        <TextField
          type="email"
          color="secondary"
          name="email"
          InputProps={{ style: { color: "white" } }}
          onChange={handleChange}
          value={email}
          size="small"
          placeholder="your@email.com"
        />
        <Button
          onClick={submit}
          startIcon={<Mailbox />}
          style={{ marginLeft: 5 }}
        >
          Join
        </Button>
      </Box>
      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert variant="filled" severity={toast.severity}>
          {toast.msg.replace(/<a.*<\/.*a>/gi, "")}
        </Alert>
      </Snackbar>
    </>
  )
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(MailChimpForm)
