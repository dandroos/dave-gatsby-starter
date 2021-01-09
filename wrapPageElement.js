import React from "react"
import Layout from "./src/components/layout"

const WrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

export default WrapPageElement
