import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'

const Avatar = ({ userName }) => {
  const query = graphql`
  {
    image: file(relativePath: { regex: "/${userName}/" }) {
      childImageSharp {
        gatsbyImageData(
          quality: 80
          width: 96
          placeholder: TRA
        )
      }
    }
  }
  `
  console.log(userName)
  return <GatsbyImage image={getImage(query)} alt={userName} />
}

export default Avatar
