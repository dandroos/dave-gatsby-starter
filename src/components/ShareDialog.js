import React, { useState } from "react"
import { connect } from "react-redux"
import { setSharerProps } from "../state/actions"
import {
  Hidden,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Snackbar,
} from "@material-ui/core"

import {
  Facebook,
  Twitter,
  Whatsapp,
  Email,
  Link,
  FacebookMessenger,
} from "mdi-material-ui"

const ShareDialog = ({ dispatch, sharerProps }) => {
  const [toastIsOpen, setToastIsOpen] = useState(false)

  const handleClick = e => {
    switch (e.currentTarget.id) {
      case "facebook":
        return window.open(
          `https://www.facebook.com/sharer.php?u=${sharerProps.href}`,
          "_blank"
        )
      case "messenger":
        let messengerEncodedText = encodeURIComponent(sharerProps.href)
        return window.open(
          `fb-messenger://share?link=${messengerEncodedText}`,
          "_blank"
        )
      case "twitter":
        return window.open(
          `https://twitter.com/intent/tweet?url=${sharerProps.href}`,
          "_blank"
        )
      case "whatsapp":
        let whatsappUrlEncodedText = encodeURIComponent(
          `${sharerProps.href} ${sharerProps.title}`
        )
        return window.open(
          `https://api.whatsapp.com/send?text=${whatsappUrlEncodedText}`,
          "_blank"
        )
      case "email":
        let emailUrlEncodedText = encodeURIComponent(sharerProps.title)
        return window.open(
          `mailto:?subject=${emailUrlEncodedText}&body=${sharerProps.href}`
        )
      case "copy":
        navigator.clipboard.writeText(sharerProps.href)
        return setToastIsOpen(true)

      case "close":
        return dispatch(setSharerProps({ visible: false, href: "", title: "" }))
      default:
        return
    }
  }

  const handleClose = () => {
    dispatch(setSharerProps({ visible: false, href: "", title: "" }))
  }

  const handleToastClose = (e, r) => {
    return r === "clickaway" ? null : setToastIsOpen(false)
  }

  return (
    <Dialog open={sharerProps.visible} onClose={handleClose}>
      <Snackbar
        open={toastIsOpen}
        autoHideDuration={5000}
        onClose={handleToastClose}
        message="URL copied successfully"
        action={
          <Button color="secondary" onClick={handleToastClose}>
            Close
          </Button>
        }
      />
      <DialogTitle>Share via...</DialogTitle>
      <DialogContent dividers>
        <List>
          <ListItem onClick={handleClick} id="facebook" button>
            <ListItemIcon>
              <Facebook />
            </ListItemIcon>
            <ListItemText primary="Facebook" />
          </ListItem>
          <Hidden smUp>
            <ListItem onClick={handleClick} id="messenger" button>
              <ListItemIcon>
                <FacebookMessenger />
              </ListItemIcon>
              <ListItemText primary="Messenger" />
            </ListItem>
          </Hidden>
          <ListItem button onClick={handleClick} id="twitter">
            <ListItemIcon>
              <Twitter />
            </ListItemIcon>
            <ListItemText primary="Twitter" />
          </ListItem>
          <ListItem button onClick={handleClick} id="whatsapp">
            <ListItemIcon>
              <Whatsapp />
            </ListItemIcon>
            <ListItemText primary="WhatsApp" />
          </ListItem>
          <ListItem button onClick={handleClick} id="email">
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText primary="Email" />
          </ListItem>
          <ListItem button onClick={handleClick} id="copy">
            <ListItemIcon>
              <Link />
            </ListItemIcon>
            <ListItemText primary="Copy URL to clipboard" />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} id="close">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = state => ({
  sharerProps: state.sharerProps,
})

export default connect(mapStateToProps)(ShareDialog)
