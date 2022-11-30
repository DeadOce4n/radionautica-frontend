import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    url: 'https://radionautica.net',
    title: 'Radionautica: Navegamos en un Océano Musical',
    siteUrl: 'https://radionautica.net',
    author: 'ThyDevourer',
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Radionautica',
        short_name: 'Radionautica',
        start_url: '/',
        background_color: '#010328',
        theme_color: '#73e8af',
        display: 'standalone',
        icon: 'src/images/favicon.png',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
}

export default config
