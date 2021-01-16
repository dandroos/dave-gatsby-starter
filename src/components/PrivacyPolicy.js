import React from "react"
import { connect } from "react-redux"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@material-ui/core"
import { setShowPrivacyPolicy } from "../state/actions"

const PrivacyPolicy = ({ dispatch, isOpen }) => {
  const handleClose = () => {
    dispatch(setShowPrivacyPolicy(false))
  }
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Privacy policy</DialogTitle>
      <DialogContent>
        <Typography paragraph>
          Your privacy is important to us. It is Fuerte Nerd's policy to respect
          your privacy regarding any information we may collect from you across
          our website, http://fuertenerd.com, and other sites we own and
          operate.
        </Typography>
        <Typography paragraph>
          We only ask for personal information when we truly need it to provide
          a service to you. We collect it by fair and lawful means, with your
          knowledge and consent. We also let you know why we’re collecting it
          and how it will be used.
        </Typography>

        <Typography paragraph>
          We only retain collected information for as long as necessary to
          provide you with your requested service. What data we store, we’ll
          protect within commercially acceptable means to prevent loss and
          theft, as well as unauthorised access, disclosure, copying, use or
          modification.
        </Typography>

        <Typography paragraph>
          We don’t share any personally identifying information publicly or with
          third-parties, except when required to by law.
        </Typography>

        <Typography paragraph>
          Our website may link to external sites that are not operated by us.
          Please be aware that we have no control over the content and practices
          of these sites, and cannot accept responsibility or liability for
          their respective privacy policies.
        </Typography>

        <Typography paragraph>
          You are free to refuse our request for your personal information, with
          the understanding that we may be unable to provide you with some of
          your desired services.
        </Typography>

        <Typography paragraph>
          Your continued use of our website will be regarded as acceptance of
          our practices around privacy and personal information. If you have any
          questions about how we handle user data and personal information, feel
          free to contact us.
        </Typography>

        <Typography paragraph>
          This policy is effective as of 15 January 2021.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = state => ({
  isOpen: state.showPrivacyPolicy,
})

export default connect(mapStateToProps)(PrivacyPolicy)
