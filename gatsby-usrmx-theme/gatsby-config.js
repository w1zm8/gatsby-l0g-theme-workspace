const { CONTENT_NAMES, CONTENT_PATHS } = require("./options");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: "static",
        name: "static",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: CONTENT_PATHS.images,
        name: CONTENT_NAMES.images,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: CONTENT_PATHS.blog,
        name: CONTENT_NAMES.blog,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: CONTENT_PATHS.posts,
        name: CONTENT_NAMES.posts,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: CONTENT_PATHS.site,
        name: CONTENT_NAMES.site,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: CONTENT_PATHS.notes,
        name: CONTENT_NAMES.notes,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 600,
            },
          },
          {
            resolve: "gatsby-remark-double-brackets-link",
            options: {
              titleToURLPath: `${__dirname}/utils/resolve-url.js`,
              stripBrackets: false,
            },
          },
          "gatsby-remark-double-parenthesis-link",
        ],
      },
    },
    "gatsby-plugin-sitemap",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-react-helmet",
    // {
    //   resolve: `gatsby-plugin-feed`,
    //   options: {
    //     query: `
    //       {
    //         site {
    //           siteMetadata {
    //             title
    //             description
    //             url
    //             site_url: url
    //           }
    //         }
    //       }
    //     `,
    //     feeds: [
    //       {
    //         serialize: ({ query: { site, allMarkdownRemark } }) => {
    //           return allMarkdownRemark.edges.map((edge) => {
    //             return Object.assign({}, edge.node.frontmatter, {
    //               description: edge.node.excerpt,
    //               date: edge.node.frontmatter.date,
    //               url: site.siteMetadata.siteUrl + edge.node.fields.slug,
    //               guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
    //               custom_elements: [{ "content:encoded": edge.node.html }],
    //             });
    //           });
    //         },
    //         query: `
    //           {
    //             allMarkdownRemark(
    //               sort: { order: DESC, fields: [frontmatter___date] },
    //             ) {
    //               edges {
    //                 node {
    //                   excerpt
    //                   html
    //                   fields { slug }
    //                   frontmatter {
    //                     title
    //                     date
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         `,
    //         output: "/rss.xml",
    //         title: "Your Site's RSS Feed",
    //         // optional configuration to insert feed reference in pages:
    //         // if `string` is used, it will be used to create RegExp and then test if pathname of
    //         // current page satisfied this regular expression;
    //         // if not provided or `undefined`, all pages will have feed reference inserted
    //         match: "^/blog/",
    //         // optional configuration to specify external rss feed, such as feedburner
    //         link: "https://feeds.feedburner.com/gatsby/blog",
    //       },
    //     ],
    //   },
    // },
  ],
};
