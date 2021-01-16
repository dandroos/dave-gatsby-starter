import React from "react"
import { connect } from "react-redux"
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core"
import { Phone, Mail, Email } from "mdi-material-ui"

const FooterContact = ({ isMobile }) => {
  return (
    <List dense disablePadding>
      <ListItem style={isMobile ? { flexDirection: "column" } : undefined}>
        <ListItemIcon style={isMobile ? { minWidth: "auto" } : undefined}>
          <Mail />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <>
              <Typography
                variant="body2"
                align={isMobile ? "center" : undefined}
              >
                1 John Thomas Street
              </Typography>
              <Typography
                variant="body2"
                align={isMobile ? "center" : undefined}
              >
                Camden Town
              </Typography>
              <Typography
                variant="body2"
                align={isMobile ? "center" : undefined}
              >
                London
              </Typography>
              <Typography
                variant="body2"
                align={isMobile ? "center" : undefined}
              >
                N4 6LJ
              </Typography>
            </>
          }
        />
      </ListItem>
      <ListItem style={isMobile ? { flexDirection: "column" } : undefined}>
        <ListItemIcon style={isMobile ? { minWidth: "auto" } : undefined}>
          <Phone />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={isMobile ? { align: "center" } : undefined}
          primary="123 456 789"
        />
      </ListItem>
      <ListItem
        button
        onClick={() => window.open("mailto:fuertenerd@gmail.com")}
        style={isMobile ? { flexDirection: "column" } : undefined}
      >
        <ListItemIcon style={isMobile ? { minWidth: "auto" } : undefined}>
          <Email />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ align: isMobile ? "center" : undefined }}
          primary="fuertenerd@gmail.com"
        />
      </ListItem>
    </List>
  )
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(FooterContact)
