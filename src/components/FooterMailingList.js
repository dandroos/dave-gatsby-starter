import React from "react"
import MailchimpSubscribe from "react-mailchimp-subscribe"
import { Box, Typography } from "@material-ui/core"
import MailChimpForm from "./MailChimpForm"

const FooterMailingList = () => {
  const url =
    "https://gmail.us7.list-manage.com/subscribe/post?u=cb06ce25799fea5633f564d9e&amp;id=04e4eeba1a"
  return (
    <Box>
      <Typography>Sign up to our mailing list to receive updates.</Typography>
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
    </Box>
  )
}

export default FooterMailingList
