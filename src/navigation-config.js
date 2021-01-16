import {
  Facebook,
  Twitter,
  Instagram,
  Phone,
  FacebookMessenger,
  Whatsapp,
} from "mdi-material-ui"

export const internal = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "About",
    link: "/about",
  },
  {
    label: "Blog",
    link: "/blog",
  },
  {
    label: "Contact",
    link: "/contact",
  },
]

export const external = [
  {
    label: "Facebook",
    link: "https://facebook.com",
    icon: Facebook,
  },
  {
    label: "Twitter",
    link: "https://twitter.com",
    icon: Twitter,
  },
  {
    label: "Instagram",
    link: "https://instagram.com",
    icon: Instagram,
  },
]

export const contact = [
  {
    label: "Call",
    link: "tel:123456789",
    icon: Phone,
  },
  {
    label: "WhatsApp",
    link: "https://wa.me/123456789",
    icon: Whatsapp,
  },
  {
    label: "Messenger",
    link: "https:/m.me/temp",
    icon: FacebookMessenger,
  },
]
