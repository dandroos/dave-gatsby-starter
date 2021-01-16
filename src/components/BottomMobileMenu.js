import React from "react"
import { connect } from "react-redux"
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core"
import { Phone, Whatsapp, FacebookMessenger } from "mdi-material-ui"

const BottomMobileMenu = ({ isMobile }) => {
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
            onClick={() => console.log("clicked")}
          />
          <BottomNavigationAction
            icon={<Whatsapp />}
            label="WhatsApp"
            onClick={() => console.log("clicked")}
          />
          <BottomNavigationAction
            icon={<FacebookMessenger />}
            label="Messenger"
            onClick={() => console.log("clicked")}
          />
        </BottomNavigation>
      )
    : null
}

const mapStateToProps = state => ({
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(BottomMobileMenu)
