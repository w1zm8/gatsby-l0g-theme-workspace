require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    logoTitle: "/usr/max",
    title: "usrmx.com 🦉",
    titleTemplate: "%s | usrmx.com 🦉",
    description:
      "Elit dolore enim exercitation aliquip commodo ex sit do aliquip incididunt adipisicing velit amet.",
    keywords: ["programming", "software development", "grokking"],
    siteUrl: process.env.SITE_URL,
    image: "images/default-image.png",
    twitterUsername: "usrmx",
    githubUsername: "usrmx",
    nav: [
      { path: "/", name: "Home" },
      { path: "/blog", name: "Blog" },
      { path: "/notes/home", name: "Notes" },
      { path: "/about", name: "About" },
    ],
    copyright: "© usrmx.com 2021",
    footerNav: [
      { path: "/blog", name: "Blog" },
      { path: "/about", name: "About" },
      { path: "https://twitter.com/usrmx", name: "Twitter" },
      { path: "https://github.com/usrmx", name: "GitHub" },
    ],
    avatarSrc: "./static/images/avatar.jpg",
    socials: [
      {
        name: "Twitter",
        url: "https://twitter.com/intent/follow?screen_name=usrmx",
        icon: "twitter",
      },
      {
        name: "GitHub",
        url: "https://github.com/usrmx",
        icon: "github",
      },
      {
        name: "Patreon",
        url: "https://www.patreon.com/usrmx",
        icon: "patreon",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `usrmx.com`,
        short_name: `usrmx.com`,
        start_url: `/`,
        icon: "./static/images/favicon.png",
        display: `standalone`,
      },
    },
    "gatsby-plugin-ts-config",
    "gatsby-usrmx-theme",
    "gatsby-plugin-robots-txt",
  ],
};
