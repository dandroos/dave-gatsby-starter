import React from "react"
import { Link } from "gatsby"
import SEO from "../components/seo"
import { Button } from "@material-ui/core"

import { Box, Container, Typography } from "@material-ui/core"

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
    >
      <Container maxWidth="sm">
        <Typography variant="h3" paragraph>
          Home
        </Typography>
        <Button component={Link} to="/about" variant="outlined">
          About page
        </Button>
      </Container>
    </Box>
  </>
)

export default IndexPage
