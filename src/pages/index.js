import React from "react"
import { Link } from "gatsby"
import SEO from "../components/seo"
import { Button } from "@material-ui/core"
import { Box, Container, Typography } from "@material-ui/core"
import { Information } from "mdi-material-ui"

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <Box
      width="100vw"
      height="100vh "
      display="flex"
      justifyContent="center"
      alignItems="center"
      align="center"
      position="fixed"
      top={0}
      left={0}
    >
      <Container maxWidth="sm">
        <Typography variant="h3" paragraph>
          Headline goes here
        </Typography>
        <Button
          startIcon={<Information />}
          component={Link}
          to="/about"
          variant="outlined"
        >
          More info
        </Button>
      </Container>
    </Box>
  </>
)

export default IndexPage
