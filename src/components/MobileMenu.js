import React from "react"
import { Link } from "gatsby"
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
} from "@material-ui/core"
import { Close } from "mdi-material-ui"
import { internal, external } from "../navigation-config"
import { setShowMobileMenu } from "../state/actions"

const MobileMenu = ({ dispatch, isOpen }) => {
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
        <List>
          {internal.map(i => (
            <ListItem component={Link} to={i.link} button onClick={handleClose}>
              <ListItemText
                primary={i.label}
                primaryTypographyProps={{ align: "center" }}
              />
            </ListItem>
          ))}
        </List>
        <Box mt={2}>
          {external.map(i => (
            <IconButton onClick={() => window.open(i.link, "_blank")}>
              <i.icon />
            </IconButton>
          ))}
        </Box>
      </Box>
    </Dialog>
  )
}

const mapStateToProps = state => ({
  isOpen: state.showMobileMenu,
})

export default connect(mapStateToProps)(MobileMenu)
