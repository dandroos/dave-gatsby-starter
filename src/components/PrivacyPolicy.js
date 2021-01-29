import React from "react"
import { connect } from "react-redux"
import { useStaticQuery, graphql } from "gatsby"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@material-ui/core"
import { setShowPrivacyPolicy } from "../state/actions"
import ReactMarkdown from "react-markdown"

const PrivacyPolicy = ({ dispatch, isOpen }) => {
  const data = useStaticQuery(graphql`
    {
      file(
        name: { eq: "privacy-policy" }
        sourceInstanceName: { eq: "content" }
      ) {
        childMarkdownRemark {
          rawMarkdownBody
        }
      }
    }
  `)

  const body = data.file.childMarkdownRemark.rawMarkdownBody

  const handleClose = () => {
    dispatch(setShowPrivacyPolicy(false))
  }

  const renderers = {
    paragraph: ({ node }) => {
      const { value } = node.children[0]
      return <Typography paragraph>{value}</Typography>
    },
  }
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Privacy policy</DialogTitle>
      <DialogContent>
        <ReactMarkdown renderers={renderers}>{body}</ReactMarkdown>
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
