import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { Box, Container, Typography, Button } from "@material-ui/core"

const AboutPage = () => {
  const data = useStaticQuery(graphql`
    {
      file(name: { eq: "biog" }, sourceInstanceName: { eq: "images" }) {
        childImageSharp {
          fluid(maxWidth: 500, maxHeight: 500, quality: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <>
      <SEO title="About" />
      <Box>
        <Container maxWidth="md">
          <Typography variant="h3" align="center" paragraph>
            About
          </Typography>
          <Img
            fluid={data.file.childImageSharp.fluid}
            style={{
              borderRadius: "50%",
              maxWidth: 500,
              width: "80%",
              margin: "auto",
              marginBottom: 20,
            }}
          />
          <Typography paragraph>
            Sit accusantium repudiandae et itaque voluptas. Sint repellat rerum
            repellendus inventore quo! Culpa error culpa optio nulla nam
            Repellat laborum nisi laborum ab iusto Praesentium laboriosam
            reprehenderit officia deserunt iste est distinctio totam iste harum
            nihil odio Unde ex accusamus itaque dolorum officiis Ut amet
            accusamus velit itaque tempora? Blanditiis dolorem eaque libero
            dolorum facere? Libero iusto vitae ea architecto impedit nemo libero
            Sit aliquam numquam expedita quaerat laborum ipsam dolore quidem.
            Aut tempore dolores quibusdam iure dignissimos in quas. Placeat quia
            ad est maiores illo. Molestiae natus repudiandae dolore quia
            temporibus. Quo unde tempora enim inventore quod maiores commodi
            explicabo esse. Libero harum veniam a voluptas sapiente sed, quia?
            Ipsa nostrum esse aut tempore eveniet. Nihil ratione quos
            reprehenderit nam corporis? Doloremque repudiandae laborum
            reprehenderit dignissimos laudantium Reprehenderit ex ex vitae sunt
            alias. Eum sequi ad cumque id dolore. Cumque aperiam necessitatibus
            nostrum molestias molestiae Ipsum id enim voluptatem expedita
            eligendi vel. Nulla voluptates dolorem aliquid beatae expedita
            Deleniti voluptates voluptatum rem nam cumque! Nisi fugit dicta
            necessitatibus sit repellendus! Voluptates saepe sapiente ducimus
            amet laborum Praesentium asperiores eos dolorum earum maxime Tenetur
            at maxime quod reprehenderit quaerat Nisi dignissimos eveniet
            voluptate quod perferendis? Eius ad magnam officia voluptatem
          </Typography>
          <Box align="center">
            <Button component={Link} to="/contact">
              Link to contact
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  )
}
export default AboutPage
