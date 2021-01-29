import React from "react"
import { connect } from "react-redux"
import { useStaticQuery, graphql } from "gatsby"
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core"
import { Phone, Whatsapp, FacebookMessenger } from "mdi-material-ui"

const BottomMobileMenu = ({ isMobile }) => {
  const data = useStaticQuery(graphql`
    {
      file(
        name: { eq: "contact-and-social" }
        sourceInstanceName: { eq: "content" }
      ) {
        childMarkdownRemark {
          frontmatter {
            facebook
            phone
          }
        }
      }
    }
  `)

  const { facebook, phone } = data.file.childMarkdownRemark.frontmatter

  return typeof isMobile !== "object"
    ? isMobile && (
        <BottomNavigation
          showLabels
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          <BottomNavigationAction
            icon={<Phone />}
            label="Call"
            onClick={() =>
              window.open(`tel:${phone.replace(/ /g, "")}`, "_blank")
            }
          />
          <BottomNavigationAction
            icon={<Whatsapp />}
            label="WhatsApp"
            onClick={() =>
              window.open(`https://wa.me/${phone.replace(/ /g, "")}`, "_blank")
            }
          />
          <BottomNavigationAction
            icon={<FacebookMessenger />}
            label="Messenger"
            onClick={() => window.open(`https:/m.me/${facebook}`, "_blank")}
          />
        </BottomNavigation>
      )
    : null
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(BottomMobileMenu)
