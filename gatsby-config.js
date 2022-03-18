const path = require('path')
module.exports = {
  siteMetadata: {
    url: 'https://radionautica.net',
    siteUrl: 'https://radionautica.net',
    title: 'Radionautica: Navegamos en un Océano Musical',
    titleTemplate: '%s | Radionautica: Navegamos en un Océano Musical',
    description: 'Somos una radio online independiente para gente de todo el mundo, chatea y escucha música gratis y sin registro, píde tus canciones favoritas a nuestros DJs y conoce personas con tus mismos gustos.',
    author: 'Dead_Ocean',
    image: '/radionautica.jpg'
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp', 'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
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
        icon: 'src/images/favicon.png'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: path.join(__dirname, 'src', 'images')
      },
      __key: 'images'
    }
  ]
}
