import React from "react"
import { connect } from "react-redux"
import { useStaticQuery, Link } from "gatsby"
import { Phone, Mail, Email } from "mdi-material-ui"
import {
  Box,
  Typography,
  Button,
  Link as MLink,
  Grid,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@material-ui/core"
import { setShowPrivacyPolicy } from "../state/actions"
import { internal, external } from "../navigation-config"
import MailchimpSubscribe from "react-mailchimp-subscribe"
import MailChimpForm from "./MailChimpForm"
import FooterSection from "./FooterSection"

const Footer = ({ dispatch, isMobile }) => {
  const checkYear = () => {
    const now = new Date()
    if (now.getFullYear() !== 2020) {
      return `2020-${now.getFullYear()}`
    }
    return "2020"
  }

  const url =
    "https://gmail.us7.list-manage.com/subscribe/post?u=cb06ce25799fea5633f564d9e&amp;id=04e4eeba1a"

  return isMobile ? null : (
    <Box mt={15}>
      <Container>
        <Grid container spacing={5} style={{ textAlign: "center" }}>
          <Grid item xs={4}>
            <FooterSection title="Contact us" align="left">
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Phone />
                  </ListItemIcon>
                  <ListItemText primary="123 456 789" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Mail />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <>
                        <Typography variant="body2">
                          1 John Thomas Street
                        </Typography>
                        <Typography variant="body2">Camden Town</Typography>
                        <Typography variant="body2">London</Typography>
                        <Typography variant="body2">N4 6LJ</Typography>
                      </>
                    }
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => window.open("mailto:fuertenerd@gmail.com")}
                >
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText primary="fuertenerd@gmail.com" />
                </ListItem>
              </List>
            </FooterSection>
          </Grid>
          <Grid item xs={4}>
            <FooterSection title="Navigation" align="center">
              <>
                {internal.map(i => (
                  <Typography
                    variant="button"
                    style={{ cursor: "pointer" }}
                    paragraph
                  >
                    <MLink component={Link} to={i.link} color="inherit">
                      {i.label}
                    </MLink>
                  </Typography>
                ))}
                <Box>
                  {external.map(i => (
                    <IconButton onClick={() => window.open(i.link, "_blank")}>
                      <i.icon />
                    </IconButton>
                  ))}
                </Box>
              </>
            </FooterSection>
          </Grid>
          <Grid item xs={4}>
            <FooterSection title="Mailing list" align="right">
              <Typography>
                Sign up to our mailing list to receive updates.
              </Typography>
              <MailchimpSubscribe
                url={url}
                render={({ subscribe, status, message }) => (
                  <MailChimpForm
                    status={status}
                    message={message}
                    onValidated={formData => subscribe(formData)}
                  />
                )}
              />
            </FooterSection>
            <Box my={2} />
            <FooterSection title="Legal" align="right">
              <Typography variant="caption">
                View our{" "}
                <MLink
                  component="button"
                  onClick={() => dispatch(setShowPrivacyPolicy(true))}
                >
                  privacy policy
                </MLink>
                .
              </Typography>
              <Typography display="block" variant="caption">
                All content &copy; {checkYear()} David Andrews
              </Typography>
            </FooterSection>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
  {
    /*
      <Box bgcolor="secondary" p={4} align="center">
        {isMobile ? (
          internal.map((i, ind) => (
            <>
              <Button variant="text" component={Link} to={i.link}>
                {i.label}
              </Button>
              <Typography display="inline">
                {ind + 1 !== internal.length ? "|" : null}
              </Typography>
            </>
          ))
        ) : (
        )}

      </Box>
    </>
    
  )*/
  }
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(Footer)
