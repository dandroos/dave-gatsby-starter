import React from "react"
import { connect } from "react-redux"
import { Box, Grid, Container } from "@material-ui/core"
import FooterSection from "./FooterSection"
import FooterNavigation from "./FooterNavigation"
import FooterContact from "./FooterContact"
import FooterMailingList from "./FooterMailingList"
import FooterLegal from "./FooterLegal"

const Footer = ({ isMobile }) => {
  return (
    <Box mt={12}>
      {isMobile ? (
        <>
          <Box align="center">
            <FooterSection title="Mailing List">
              <FooterMailingList />
            </FooterSection>
          </Box>
          <Box mt={3}>
            <FooterSection title="Navigation">
              <FooterNavigation />
            </FooterSection>
          </Box>
          <Box mt={3}>
            <FooterSection title="Contact">
              <FooterContact />
            </FooterSection>
          </Box>
          <Box mt={3}>
            <FooterSection title="Legal">
              <FooterLegal />
            </FooterSection>
          </Box>
        </>
      ) : (
        <Container>
          <Grid container style={{ textAlign: "center" }}>
            <Grid item xs={4}>
              <FooterSection title="Contact" align="left">
                <FooterContact />
              </FooterSection>
            </Grid>
            <Grid item xs={4}>
              <FooterSection title="Navigation" align="center">
                <FooterNavigation />
              </FooterSection>
            </Grid>
            <Grid item xs={4}>
              <FooterSection title="Mailing list" align="right">
                <FooterMailingList />
              </FooterSection>
              <Box my={2} />
              <FooterSection title="Legal" align="right">
                <FooterLegal />
              </FooterSection>
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  )
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(Footer)
