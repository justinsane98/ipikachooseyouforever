module.exports = {
    // if deploying to github pages add => pathPrefix: "/marketing-website",
    siteMetadata: {
      title: `ipkachooseyouforever`,
      description: `description`,
      author: `Justin & Molly Shearer`,
      siteUrl: `https://ipikachooseyouforever.com/`,
    },
    plugins: [
      `gatsby-plugin-image`,
      `gatsby-plugin-postcss`,
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
          name: `gatsby-starter-default`,
          short_name: `starter`,
          start_url: `/`,
          background_color: `#663399`,
          display: `minimal-ui`,
          icon: `src/images/logo.png`
        },
      },
    ],
  }
  