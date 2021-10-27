require("dotenv").config()


module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `http://localhost:1337`,
        queryLimit: 1000, // Defaults to 100
        collectionTypes: [`product`, `category`, `variant`],
      },
    },


    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Philosopher:700:latin',
            'Montserrat:600,500,400,300:latin']
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,



    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `VAR_X`,
        short_name: `VAR_X`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,      // This path is relative to the root of the site.
      },
    },


    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
