import React from "react"
import { Typography } from "@material-ui/core"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <Typography variant="h2">404: Not Found</Typography>
    <Typography>
      You just hit a route that doesn&#39;t exist... the sadness.
    </Typography>
  </>
)

export default NotFoundPage
