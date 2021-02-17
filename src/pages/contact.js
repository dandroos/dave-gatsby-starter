import React from "react"
import { connect } from "react-redux"
import { useStaticQuery, graphql } from "gatsby"
import { Toolbar, Container, Box, Typography } from "@material-ui/core"
import SEO from "../components/seo"
import ContactButtons from "../components/ContactButtons"
import ContactForm from "../components/ContactForm"

const ContactPage = ({ siteIsReady }) => {
  const data = useStaticQuery(graphql`
    {
      file(
        name: { eq: "contact_page" }
        sourceInstanceName: { eq: "content" }
      ) {
        childMarkdownRemark {
          frontmatter {
            contact_heading
          }
        }
      }
    }
  `)

  const { contact_heading } = data.file.childMarkdownRemark.frontmatter

  return (
    <>
      <SEO title="Contact" />
      <form
        action="#"
        hidden
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input name="name" />
        <input name="email" />
        <input name="phone" />
        <input name="message" />
      </form>
      {siteIsReady ? (
        <>
          <Toolbar />
          <Container>
            <Box py={2}>
              <Typography variant="h2" paragraph>
                {contact_heading}
              </Typography>
              <ContactButtons />
              <ContactForm />
            </Box>
          </Container>
        </>
      ) : null}
    </>
  )
}

const mapStateToProps = state => ({
  siteIsReady: state.siteIsReady,
})

export default connect(mapStateToProps)(ContactPage)
