import React, { useEffect, useState } from "react"
import { Box, TextField, Button, Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"

const MailChimpForm = ({ status, message, onValidated }) => {
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
  }, [status])

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <TextField
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
          size="small"
        />
        <Button onClick={submit} style={{ marginLeft: 5 }}>
          Submit
        </Button>
      </Box>
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

export default MailChimpForm
